/*
============================================================
QUESTION PAPER GENERATOR SYSTEM
QUESTION VERIFICATION SCRIPT
============================================================

Purpose:
- MongoDB me saved questions verify karna
- Required fields check karna
- Subject-wise count check karna
- Question type check karna
- Difficulty check karna
- Duplicate check karna
- Missing answers check karna
- Final verification report dena

Current TEST TARGET:
24 Subjects × 10 Questions = 240 Questions

============================================================
*/

const { MongoClient } = require("mongodb");

const {
    getAllSubjects
} = require("./subject-topics");


// ============================================================
// MONGODB CONFIGURATION
// ============================================================

const MONGO_URI = "mongodb://127.0.0.1:27017";

const DATABASE_NAME =
    "question_paper_generator";

const COLLECTION_NAME =
    "questions";


// ============================================================
// EXPECTED VALUES
// ============================================================

const EXPECTED_SUBJECTS = 24;

const EXPECTED_QUESTIONS_PER_SUBJECT = 10;

const EXPECTED_TOTAL =
    EXPECTED_SUBJECTS *
    EXPECTED_QUESTIONS_PER_SUBJECT;


// ============================================================
// ALLOWED QUESTION TYPES
// ============================================================

const ALLOWED_TYPES = [

    "MCQ",

    "Short",

    "Long",

    "Numerical",

    "Programming",

    "Case Study"

];


// ============================================================
// ALLOWED DIFFICULTIES
// ============================================================

const ALLOWED_DIFFICULTIES = [

    "Easy",

    "Medium",

    "Hard"

];


// ============================================================
// REQUIRED FIELDS
// ============================================================

const REQUIRED_FIELDS = [

    "semester",

    "subject",

    "subjectCode",

    "unit",

    "topic",

    "questionType",

    "difficulty",

    "marks",

    "question",

    "answer",

    "createdAt"

];


// ============================================================
// HELPERS
// ============================================================

function isEmpty(value) {

    return (
        value === undefined ||
        value === null ||
        String(value).trim() === ""
    );

}


function normalizeText(value) {

    return String(value || "")
        .trim()
        .replace(/\s+/g, " ")
        .toLowerCase();

}


// ============================================================
// MAIN
// ============================================================

async function main() {

    console.log("");

    console.log(
        "################################################"
    );

    console.log(
        "# QUESTION BANK VERIFICATION"
    );

    console.log(
        "################################################"
    );

    console.log("");

    console.log(
        `Expected Subjects       : ${EXPECTED_SUBJECTS}`
    );

    console.log(
        `Expected Questions/Subj : ${EXPECTED_QUESTIONS_PER_SUBJECT}`
    );

    console.log(
        `Expected Total          : ${EXPECTED_TOTAL}`
    );


    // ========================================================
    // CONNECT MONGODB
    // ========================================================

    const client =
        new MongoClient(
            MONGO_URI
        );


    try {

        await client.connect();

        console.log("");

        console.log(
            "MongoDB Connected Successfully!"
        );


        const database =
            client.db(
                DATABASE_NAME
            );


        const collection =
            database.collection(
                COLLECTION_NAME
            );


        // ====================================================
        // LOAD QUESTIONS
        // ====================================================

        const questions =
            await collection
                .find({})
                .toArray();


        console.log("");

        console.log(
            "Questions Found: " +
            questions.length
        );


        // ====================================================
        // BASIC TOTAL CHECK
        // ====================================================

        console.log("");

        console.log(
            "=============================================="
        );

        console.log(
            "1. TOTAL QUESTION CHECK"
        );

        console.log(
            "=============================================="
        );


        if (
            questions.length ===
            EXPECTED_TOTAL
        ) {

            console.log(
                "PASS: Total questions = " +
                EXPECTED_TOTAL
            );

        } else {

            console.log(
                "WARNING: Expected " +
                EXPECTED_TOTAL +
                " but found " +
                questions.length
            );

        }


        // ====================================================
        // SUBJECT-WISE CHECK
        // ====================================================

        console.log("");

        console.log(
            "=============================================="
        );

        console.log(
            "2. SUBJECT-WISE QUESTION CHECK"
        );

        console.log(
            "=============================================="
        );


        const subjects =
            getAllSubjects();


        const subjectCounts = {};


        for (
            const subject
            of subjects
        ) {

            subjectCounts[subject] = 0;

        }


        for (
            const question
            of questions
        ) {

            if (
                subjectCounts[
                    question.subject
                ] === undefined
            ) {

                subjectCounts[
                    question.subject
                ] = 0;

            }


            subjectCounts[
                question.subject
            ]++;

        }


        for (
            const subject
            of subjects
        ) {

            const count =
                subjectCounts[
                    subject
                ] || 0;


            const status =
                count ===
                EXPECTED_QUESTIONS_PER_SUBJECT
                    ? "PASS"
                    : "WARNING";


            console.log(
                `${status.padEnd(8)} | ` +
                `${subject} | ` +
                `${count} questions`
            );

        }


        // ====================================================
        // REQUIRED FIELD CHECK
        // ====================================================

        console.log("");

        console.log(
            "=============================================="
        );

        console.log(
            "3. REQUIRED FIELD CHECK"
        );

        console.log(
            "=============================================="
        );


        let missingFieldCount = 0;


        for (
            const question
            of questions
        ) {

            for (
                const field
                of REQUIRED_FIELDS
            ) {

                if (
                    isEmpty(
                        question[field]
                    )
                ) {

                    missingFieldCount++;

                    console.log(
                        `MISSING: ` +
                        `${field} | ` +
                        `${question._id}`
                    );

                }

            }

        }


        if (
            missingFieldCount === 0
        ) {

            console.log(
                "PASS: No required fields are missing."
            );

        } else {

            console.log(
                `WARNING: ${missingFieldCount} ` +
                `missing fields found.`
            );

        }


        // ====================================================
        // QUESTION TYPE CHECK
        // ====================================================

        console.log("");

        console.log(
            "=============================================="
        );

        console.log(
            "4. QUESTION TYPE CHECK"
        );

        console.log(
            "=============================================="
        );


        const typeCounts = {};


        for (
            const type
            of ALLOWED_TYPES
        ) {

            typeCounts[type] = 0;

        }


        let invalidTypeCount = 0;


        for (
            const question
            of questions
        ) {

            const type =
                question.questionType;


            if (
                ALLOWED_TYPES.includes(
                    type
                )
            ) {

                typeCounts[type]++;

            } else {

                invalidTypeCount++;

                console.log(
                    `INVALID TYPE: ${type}`
                );

            }

        }


        for (
            const type
            of ALLOWED_TYPES
        ) {

            console.log(
                `${type.padEnd(15)} : ` +
                `${typeCounts[type]}`
            );

        }


        if (
            invalidTypeCount === 0
        ) {

            console.log(
                "PASS: All question types are valid."
            );

        } else {

            console.log(
                `WARNING: ${invalidTypeCount} ` +
                `invalid question types found.`
            );

        }


        // ====================================================
        // DIFFICULTY CHECK
        // ====================================================

        console.log("");

        console.log(
            "=============================================="
        );

        console.log(
            "5. DIFFICULTY CHECK"
        );

        console.log(
            "=============================================="
        );


        const difficultyCounts = {};


        for (
            const difficulty
            of ALLOWED_DIFFICULTIES
        ) {

            difficultyCounts[
                difficulty
            ] = 0;

        }


        let invalidDifficultyCount = 0;


        for (
            const question
            of questions
        ) {

            const difficulty =
                question.difficulty;


            if (
                ALLOWED_DIFFICULTIES.includes(
                    difficulty
                )
            ) {

                difficultyCounts[
                    difficulty
                ]++;

            } else {

                invalidDifficultyCount++;

                console.log(
                    `INVALID DIFFICULTY: ` +
                    `${difficulty}`
                );

            }

        }


        for (
            const difficulty
            of ALLOWED_DIFFICULTIES
        ) {

            console.log(
                `${difficulty.padEnd(10)} : ` +
                `${difficultyCounts[difficulty]}`
            );

        }


        if (
            invalidDifficultyCount === 0
        ) {

            console.log(
                "PASS: All difficulty values are valid."
            );

        } else {

            console.log(
                `WARNING: ${invalidDifficultyCount} ` +
                `invalid difficulty values found.`
            );

        }


        // ====================================================
        // DUPLICATE CHECK
        // ====================================================

        console.log("");

        console.log(
            "=============================================="
        );

        console.log(
            "6. DUPLICATE QUESTION CHECK"
        );

        console.log(
            "=============================================="
        );


        const duplicateKeys =
            new Map();


        let duplicateCount = 0;


        for (
            const question
            of questions
        ) {

            const key = [

                normalizeText(
                    question.subject
                ),

                normalizeText(
                    question.subjectCode
                ),

                normalizeText(
                    question.unit
                ),

                normalizeText(
                    question.topic
                ),

                normalizeText(
                    question.questionType
                ),

                normalizeText(
                    question.difficulty
                ),

                normalizeText(
                    question.question
                )

            ].join("|");


            if (
                duplicateKeys.has(key)
            ) {

                duplicateCount++;

                console.log(
                    `DUPLICATE: ` +
                    `${question.subject} | ` +
                    `${question.question}`
                );

            } else {

                duplicateKeys.set(
                    key,
                    question._id
                );

            }

        }


        if (
            duplicateCount === 0
        ) {

            console.log(
                "PASS: No duplicate questions found."
            );

        } else {

            console.log(
                `WARNING: ${duplicateCount} ` +
                `duplicate questions found.`
            );

        }


        // ====================================================
        // ANSWER CHECK
        // ====================================================

        console.log("");

        console.log(
            "=============================================="
        );

        console.log(
            "7. ANSWER CHECK"
        );

        console.log(
            "=============================================="
        );


        let missingAnswerCount = 0;


        for (
            const question
            of questions
        ) {

            if (
                isEmpty(
                    question.answer
                )
            ) {

                missingAnswerCount++;

            }

        }


        if (
            missingAnswerCount === 0
        ) {

            console.log(
                "PASS: All questions have answers."
            );

        } else {

            console.log(
                `WARNING: ${missingAnswerCount} ` +
                `questions have no answer.`
            );

        }


        // ====================================================
        // SAMPLE QUESTIONS
        // ====================================================

        console.log("");

        console.log(
            "=============================================="
        );

        console.log(
            "8. SAMPLE QUESTIONS"
        );

        console.log(
            "=============================================="
        );


        const samples =
            questions.slice(
                0,
                5
            );


        samples.forEach(
            (
                question,
                index
            ) => {

                console.log("");

                console.log(
                    `Sample ${index + 1}`
                );

                console.log(
                    "----------------------------------------------"
                );

                console.log(
                    `Subject       : ${question.subject}`
                );

                console.log(
                    `Code          : ${question.subjectCode}`
                );

                console.log(
                    `Unit          : ${question.unit}`
                );

                console.log(
                    `Topic         : ${question.topic}`
                );

                console.log(
                    `Type          : ${question.questionType}`
                );

                console.log(
                    `Difficulty    : ${question.difficulty}`
                );

                console.log(
                    `Marks         : ${question.marks}`
                );

                console.log(
                    `Question      : ${question.question}`
                );

                console.log(
                    `Answer        : ${question.answer}`
                );

            }
        );


        // ====================================================
        // FINAL REPORT
        // ====================================================

        console.log("");

        console.log(
            "################################################"
        );

        console.log(
            "# VERIFICATION SUMMARY"
        );

        console.log(
            "################################################"
        );

        console.log("");

        console.log(
            `Total Questions       : ${questions.length}`
        );

        console.log(
            `Subjects              : ${subjects.length}`
        );

        console.log(
            `Missing Fields        : ${missingFieldCount}`
        );

        console.log(
            `Invalid Types         : ${invalidTypeCount}`
        );

        console.log(
            `Invalid Difficulties  : ${invalidDifficultyCount}`
        );

        console.log(
            `Duplicate Questions   : ${duplicateCount}`
        );

        console.log(
            `Missing Answers       : ${missingAnswerCount}`
        );

        console.log("");

        if (
            missingFieldCount === 0 &&
            invalidTypeCount === 0 &&
            invalidDifficultyCount === 0 &&
            duplicateCount === 0 &&
            missingAnswerCount === 0
        ) {

            console.log(
                "=============================================="
            );

            console.log(
                "VERIFICATION STATUS: PASS"
            );

            console.log(
                "=============================================="
            );

        } else {

            console.log(
                "=============================================="
            );

            console.log(
                "VERIFICATION STATUS: REVIEW REQUIRED"
            );

            console.log(
                "=============================================="
            );

        }

        console.log("");

    }

    catch (error) {

        console.error("");

        console.error(
            "VERIFICATION ERROR"
        );

        console.error(
            "----------------------------------------------"
        );

        console.error(
            error
        );

    }

    finally {

        await client.close();

        console.log(
            "MongoDB connection closed."
        );

    }

}


// ============================================================
// START
// ============================================================

main();