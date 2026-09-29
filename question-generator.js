/*
========================================================
QUESTION PAPER GENERATOR SYSTEM
BCA QUESTION BANK IMPORT ENGINE
========================================================

Purpose:
1. 24 subjects manage karna
2. Har subject ka target = 1000 questions
3. Questions validate karna
4. Duplicate questions skip karna
5. MongoDB me bulk insert karna
6. Subject-wise statistics dikhana
========================================================
*/

const { MongoClient } = require("mongodb");


// ======================================================
// MONGODB CONFIGURATION
// ======================================================

const MONGO_URL = "mongodb://127.0.0.1:27017";

const DATABASE_NAME = "question_paper_generator";

const COLLECTION_NAME = "questions";


// ======================================================
// QUESTION BANK CONFIGURATION
// ======================================================

const QUESTIONS_PER_SUBJECT = 1000;

const ALLOWED_DIFFICULTIES = [
    "Easy",
    "Medium",
    "Hard"
];

const ALLOWED_QUESTION_TYPES = [
    "MCQ",
    "Short",
    "Long",
    "Numerical",
    "Programming",
    "Case Study"
];

const ALLOWED_MARKS = [
    1,
    2,
    3,
    4,
    5,
    6,
    10
];


// ======================================================
// 24 SUBJECTS
// ======================================================

const SUBJECTS = [

    // =========================
    // SEMESTER 1
    // =========================

    {
        semester: "1",
        subject: "Linear Algebra",
        subjectCode: "BCA101"
    },

    {
        semester: "1",
        subject: "Web Design",
        subjectCode: "BCA102"
    },

    {
        semester: "1",
        subject: "Computer System Organisation",
        subjectCode: "BCA103"
    },

    {
        semester: "1",
        subject: "Programming for Problem Solving",
        subjectCode: "BCA104"
    },

    {
        semester: "1",
        subject: "Report Writing",
        subjectCode: "BCA105"
    },


    // =========================
    // SEMESTER 2
    // =========================

    {
        semester: "2",
        subject: "Environmental Literature",
        subjectCode: "BCA201"
    },

    {
        semester: "2",
        subject: "Probability",
        subjectCode: "BCA202"
    },

    {
        semester: "2",
        subject: "Data Structure",
        subjectCode: "BCA203"
    },

    {
        semester: "2",
        subject: "OOPS using C++",
        subjectCode: "BCA204"
    },

    {
        semester: "2",
        subject: "Full Stack",
        subjectCode: "BCA205"
    },

    {
        semester: "2",
        subject: "Database Management System",
        subjectCode: "BCA206"
    },


    // =========================
    // SEMESTER 3
    // =========================

    {
        semester: "3",
        subject: "Discrete Mathematics",
        subjectCode: "BCA301"
    },

    {
        semester: "3",
        subject: "Python Programming",
        subjectCode: "BCA302"
    },

    {
        semester: "3",
        subject: "Digital Marketing",
        subjectCode: "BCA303"
    },

    {
        semester: "3",
        subject: "Operating System",
        subjectCode: "BCA304"
    },


    // =========================
    // SEMESTER 4
    // =========================

    {
        semester: "4",
        subject: "Machine Learning",
        subjectCode: "BCA401"
    },

    {
        semester: "4",
        subject: "Java",
        subjectCode: "BCA402"
    },

    {
        semester: "4",
        subject: "Mobile Application",
        subjectCode: "BCA403"
    },

    {
        semester: "4",
        subject: "First Aid and Health",
        subjectCode: "BCA404"
    },

    {
        semester: "4",
        subject: "Generative AI",
        subjectCode: "BCA405"
    },


    // =========================
    // SEMESTER 5
    // =========================

    {
        semester: "5",
        subject: "Computer Networks",
        subjectCode: "BCA501"
    },

    {
        semester: "5",
        subject: "Design and Analysis of Algorithms",
        subjectCode: "BCA502"
    },

    {
        semester: "5",
        subject: "Social Media Analytics",
        subjectCode: "BCA503"
    },

    {
        semester: "5",
        subject: "Software Engineering and Testing",
        subjectCode: "BCA504"
    }

];


// ======================================================
// QUESTION NORMALIZATION
// ======================================================

function normalizeText(value) {

    return String(value || "")
        .trim()
        .replace(/\s+/g, " ")
        .toLowerCase();

}


// ======================================================
// DUPLICATE KEY
// ======================================================

function createDuplicateKey(question) {

    return [

        normalizeText(question.subject),

        normalizeText(question.subjectCode),

        normalizeText(question.unit),

        normalizeText(question.topic),

        normalizeText(question.questionType),

        normalizeText(question.difficulty),

        normalizeText(question.question)

    ].join("|");

}


// ======================================================
// VALIDATE QUESTION
// ======================================================

function validateQuestion(question) {

    const errors = [];


    if (!question.semester) {
        errors.push("Semester missing");
    }

    if (!question.subject) {
        errors.push("Subject missing");
    }

    if (!question.subjectCode) {
        errors.push("Subject code missing");
    }

    if (!question.unit) {
        errors.push("Unit missing");
    }

    if (!question.topic) {
        errors.push("Topic missing");
    }

    if (!question.questionType) {
        errors.push("Question type missing");
    }

    if (!question.difficulty) {
        errors.push("Difficulty missing");
    }

    if (!question.question) {
        errors.push("Question text missing");
    }

    if (!question.answer) {
        errors.push("Answer missing");
    }


    if (
        question.difficulty &&
        !ALLOWED_DIFFICULTIES.includes(
            question.difficulty
        )
    ) {

        errors.push(
            `Invalid difficulty: ${question.difficulty}`
        );

    }


    if (
        question.questionType &&
        !ALLOWED_QUESTION_TYPES.includes(
            question.questionType
        )
    ) {

        errors.push(
            `Invalid question type: ${question.questionType}`
        );

    }


    const marks = Number(question.marks);

    if (!ALLOWED_MARKS.includes(marks)) {

        errors.push(
            `Invalid marks: ${question.marks}`
        );

    }


    return {

        valid: errors.length === 0,

        errors

    };

}


// ======================================================
// PREPARE QUESTION
// ======================================================

function prepareQuestion(question) {

    const now = new Date();

    return {

        semester: String(question.semester).trim(),

        subject: String(question.subject).trim(),

        subjectCode:
            String(question.subjectCode).trim(),

        unit:
            String(question.unit).trim(),

        topic:
            String(question.topic).trim(),

        questionType:
            String(question.questionType).trim(),

        difficulty:
            String(question.difficulty).trim(),

        marks:
            Number(question.marks),

        question:
            String(question.question).trim(),

        answer:
            String(question.answer).trim(),

        options:
            Array.isArray(question.options)
                ? question.options
                : [],

        correctAnswer:
            question.correctAnswer || "",

        explanation:
            question.explanation || "",

        usedInPapers: [],

        duplicateKey:
            createDuplicateKey(question),

        createdAt: now,

        updatedAt: now

    };

}


// ======================================================
// IMPORT QUESTIONS
// ======================================================

async function importQuestions(
    database,
    inputQuestions
) {

    const collection =
        database.collection(
            COLLECTION_NAME
        );


    console.log("");
    console.log(
        "=============================================="
    );

    console.log(
        "QUESTION BANK IMPORT ENGINE"
    );

    console.log(
        "=============================================="
    );

    console.log("");


    let validQuestions = [];

    let invalidQuestions = [];


    // ==================================================
    // VALIDATE
    // ==================================================

    for (const question of inputQuestions) {

        const validation =
            validateQuestion(question);


        if (validation.valid) {

            validQuestions.push(
                prepareQuestion(question)
            );

        } else {

            invalidQuestions.push({

                question,

                errors:
                    validation.errors

            });

        }

    }


    console.log(
        `Input questions: ${inputQuestions.length}`
    );

    console.log(
        `Valid questions: ${validQuestions.length}`
    );

    console.log(
        `Invalid questions: ${invalidQuestions.length}`
    );


    // ==================================================
    // REMOVE DUPLICATES FROM INPUT
    // ==================================================

    const uniqueQuestions = [];

    const seenKeys = new Set();


    for (const question of validQuestions) {

        if (
            seenKeys.has(
                question.duplicateKey
            )
        ) {

            continue;

        }


        seenKeys.add(
            question.duplicateKey
        );


        uniqueQuestions.push(
            question
        );

    }


    console.log(
        `Unique questions: ${uniqueQuestions.length}`
    );


    // ==================================================
    // INSERT QUESTIONS
    // ==================================================

    let inserted = 0;

    let skippedDuplicates = 0;


    for (
        const question
        of uniqueQuestions
    ) {

        const existing =
            await collection.findOne({

                duplicateKey:
                    question.duplicateKey

            });


        if (existing) {

            skippedDuplicates++;

            continue;

        }


        await collection.insertOne(
            question
        );

        inserted++;

    }


    console.log("");

    console.log(
        "IMPORT RESULT"
    );

    console.log(
        "----------------------------------------------"
    );

    console.log(
        `Inserted: ${inserted}`
    );

    console.log(
        `Skipped duplicates: ${skippedDuplicates}`
    );


    // ==================================================
    // DATABASE TOTAL
    // ==================================================

    const totalQuestions =
        await collection.countDocuments();


    console.log(
        `Total database questions: ${totalQuestions}`
    );


    return {

        inserted,

        skippedDuplicates,

        invalidQuestions,

        totalQuestions

    };

}


// ======================================================
// SUBJECT STATISTICS
// ======================================================

async function showStatistics(database) {

    const collection =
        database.collection(
            COLLECTION_NAME
        );


    console.log("");

    console.log(
        "=============================================="
    );

    console.log(
        "QUESTION BANK STATISTICS"
    );

    console.log(
        "=============================================="
    );

    console.log("");


    for (const subject of SUBJECTS) {

        const count =
            await collection.countDocuments({

                subject:
                    subject.subject

            });


        const remaining =
            Math.max(
                QUESTIONS_PER_SUBJECT - count,
                0
            );


        const percentage =
            Math.min(
                (count / QUESTIONS_PER_SUBJECT) * 100,
                100
            );


        console.log(
            `Semester ${subject.semester} | ` +
            `${subject.subject} | ` +
            `${subject.subjectCode}`
        );

        console.log(
            `Questions: ${count}/` +
            `${QUESTIONS_PER_SUBJECT} ` +
            `(${percentage.toFixed(1)}%)`
        );

        console.log(
            `Remaining: ${remaining}`
        );

        console.log(
            "----------------------------------------------"
        );

    }

}


// ======================================================
// MAIN FUNCTION
// ======================================================

async function main() {

    const client =
        new MongoClient(
            MONGO_URL
        );


    try {

        await client.connect();


        console.log(
            "MongoDB Connected Successfully!"
        );


        const database =
            client.db(
                DATABASE_NAME
            );


        /*
        ==================================================
        IMPORTANT

        Questions will be imported here.

        Example:

        const questions = [

            {
                semester: "1",
                subject: "Linear Algebra",
                subjectCode: "BCA101",
                unit: "Unit 1",
                topic: "Matrices",
                questionType: "MCQ",
                difficulty: "Easy",
                marks: 1,
                question: "What is a matrix?",
                answer: "A rectangular arrangement of numbers."
            }

        ];

        Then:

        await importQuestions(
            database,
            questions
        );

        ==================================================
        */

        const questions = [];


        if (questions.length > 0) {

            await importQuestions(
                database,
                questions
            );

        } else {

            console.log("");

            console.log(
                "No questions supplied for import."
            );

            console.log(
                "Question Bank engine is ready."
            );

        }


        await showStatistics(
            database
        );


    } catch (error) {

        console.error("");

        console.error(
            "QUESTION BANK ERROR:"
        );

        console.error(
            error
        );


    } finally {

        await client.close();

        console.log("");

        console.log(
            "MongoDB connection closed."
        );

    }

}


// ======================================================
// START
// ======================================================

main();