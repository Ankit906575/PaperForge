/*
============================================================
QUESTION PAPER GENERATOR SYSTEM
QUALITY QUESTION BANK GENERATOR
============================================================

TEST MODE:
24 Subjects × 10 Questions = 240 Questions

FULL MODE:
24 Subjects × 1000 Questions = 24000 Questions

This version creates topic-aware questions instead of using
one generic question format for every subject.

============================================================
*/

const { MongoClient } = require("mongodb");

const {
    getAllSubjects,
    getSubject
} = require("./subject-topics");


// ============================================================
// MONGODB
// ============================================================

const MONGO_URI = "mongodb://127.0.0.1:27017";
const DATABASE_NAME = "question_paper_generator";
const COLLECTION_NAME = "questions";


// ============================================================
// MODE
// ============================================================

const GENERATOR_MODE = "TEST";

const QUESTIONS_PER_SUBJECT =
    GENERATOR_MODE === "FULL" ? 1000 : 10;


// ============================================================
// DISTRIBUTION
// ============================================================

const TEST_TYPES = {
    MCQ: 3,
    Short: 3,
    Long: 2,
    Numerical: 1,
    Programming: 1
};

const FULL_TYPES = {
    MCQ: 250,
    Short: 250,
    Long: 200,
    Numerical: 150,
    Programming: 100,
    "Case Study": 50
};

const TEST_DIFFICULTY = {
    Easy: 3,
    Medium: 4,
    Hard: 3
};

const FULL_DIFFICULTY = {
    Easy: 300,
    Medium: 400,
    Hard: 300
};

const TYPE_DISTRIBUTION =
    GENERATOR_MODE === "FULL"
        ? FULL_TYPES
        : TEST_TYPES;

const DIFFICULTY_DISTRIBUTION =
    GENERATOR_MODE === "FULL"
        ? FULL_DIFFICULTY
        : TEST_DIFFICULTY;


// ============================================================
// MARKS
// ============================================================

const MARKS = {
    MCQ: 1,
    Short: 2,
    Long: 5,
    Numerical: 5,
    Programming: 5,
    "Case Study": 10
};


// ============================================================
// HELPERS
// ============================================================

function normalize(text) {
    return String(text || "")
        .trim()
        .replace(/\s+/g, " ")
        .toLowerCase();
}


function shuffle(array) {

    const result = [...array];

    for (let i = result.length - 1; i > 0; i--) {

        const j =
            Math.floor(Math.random() * (i + 1));

        [result[i], result[j]] =
        [result[j], result[i]];

    }

    return result;
}


function createDistributionList(distribution) {

    const result = [];

    for (const key of Object.keys(distribution)) {

        for (
            let i = 0;
            i < distribution[key];
            i++
        ) {
            result.push(key);
        }

    }

    return shuffle(result);
}


function getAllTopicsForSubject(subjectName) {

    const subject = getSubject(subjectName);

    if (!subject) {
        return [];
    }

    const result = [];

    for (const unit of Object.keys(subject.units)) {

        for (const topic of subject.units[unit]) {

            result.push({
                unit,
                topic
            });

        }

    }

    return result;
}


// ============================================================
// SUBJECT CATEGORY DETECTION
// ============================================================

function getCategory(subjectName) {

    const subject = normalize(subjectName);

    if (
        subject.includes("linear algebra") ||
        subject.includes("probability") ||
        subject.includes("discrete mathematics")
    ) {
        return "mathematics";
    }

    if (
        subject.includes("data structure") ||
        subject.includes("algorithms")
    ) {
        return "algorithms";
    }

    if (
        subject.includes("programming") ||
        subject.includes("python") ||
        subject === "java" ||
        subject.includes("oops") ||
        subject.includes("full stack")
    ) {
        return "programming";
    }

    if (
        subject.includes("database")
    ) {
        return "database";
    }

    if (
        subject.includes("computer networks")
    ) {
        return "networking";
    }

    if (
        subject.includes("operating system")
    ) {
        return "operating-system";
    }

    if (
        subject.includes("machine learning") ||
        subject.includes("generative ai")
    ) {
        return "ai";
    }

    if (
        subject.includes("digital marketing") ||
        subject.includes("social media analytics")
    ) {
        return "digital";
    }

    if (
        subject.includes("software engineering")
    ) {
        return "software";
    }

    if (
        subject.includes("web design") ||
        subject.includes("mobile application")
    ) {
        return "web-mobile";
    }

    if (
        subject.includes("report writing") ||
        subject.includes("environmental literature")
    ) {
        return "theory";
    }

    if (
        subject.includes("first aid")
    ) {
        return "health";
    }

    if (
        subject.includes("computer system organisation")
    ) {
        return "computer-system";
    }

    return "general";
}


// ============================================================
// TOPIC KEYWORD DETECTION
// ============================================================

function getTopicKeywords(topic) {

    const value = normalize(topic);

    const keywords = [];

    const knownWords = [

        "matrix",
        "vector",
        "determinant",
        "eigen",
        "probability",
        "distribution",
        "mean",
        "variance",
        "stack",
        "queue",
        "linked list",
        "tree",
        "graph",
        "sorting",
        "searching",
        "sql",
        "normalization",
        "transaction",
        "index",
        "network",
        "routing",
        "protocol",
        "osi",
        "tcp",
        "ip",
        "subnet",
        "process",
        "thread",
        "deadlock",
        "memory",
        "scheduling",
        "class",
        "object",
        "inheritance",
        "polymorphism",
        "exception",
        "function",
        "array",
        "string",
        "recursion",
        "algorithm",
        "machine learning",
        "regression",
        "classification",
        "clustering",
        "neural",
        "prompt",
        "transformer",
        "marketing",
        "seo",
        "social media",
        "testing",
        "requirement",
        "agile",
        "mobile",
        "android",
        "html",
        "css",
        "javascript"

    ];

    for (const word of knownWords) {

        if (value.includes(word)) {
            keywords.push(word);
        }

    }

    return keywords;
}


// ============================================================
// QUESTION BUILDERS
// ============================================================

function buildMathematicsQuestion(
    subject,
    unit,
    topic,
    type,
    difficulty
) {

    if (type === "Numerical") {

        return {
            question:
                `Solve a numerical problem based on "${topic}". ` +
                `Show the formula, substitution, calculation and final result.`,
            answer:
                `A numerical solution based on "${topic}" should identify ` +
                `the given values, select the appropriate formula or method, ` +
                `substitute the values, perform the calculation step by step, ` +
                `and clearly state the final result.`
        };

    }

    if (type === "MCQ") {

        return {
            question:
                `Which statement correctly describes "${topic}" in ${subject}?`,
            answer:
                `"${topic}" is a concept studied in ${subject}. ` +
                `The correct option should represent its standard definition ` +
                `or mathematical property.`
        };

    }

    if (type === "Short") {

        return {
            question:
                `Define "${topic}" and explain its significance in ${subject}.`,
            answer:
                `"${topic}" should be explained using its mathematical definition, ` +
                `important properties and significance in ${subject}.`
        };

    }

    return {
        question:
            `Explain "${topic}" in detail. Include its mathematical concept, ` +
            `properties, method of application and a suitable example.`,
        answer:
            `A complete answer should define "${topic}", explain its mathematical ` +
            `principles and properties, describe how it is applied, and include ` +
            `a suitable mathematical example.`
    };

}


// ============================================================
// PROGRAMMING BUILDER
// ============================================================

function buildProgrammingQuestion(
    subject,
    topic,
    type
) {

    if (type === "Programming") {

        return {
            question:
                `Write a ${subject} program based on "${topic}". ` +
                `Explain the algorithm, logic and expected output.`,
            answer:
                `The program should implement the concept represented by ` +
                `"${topic}" using correct ${subject} syntax. ` +
                `The solution should include an algorithm, meaningful variables, ` +
                `appropriate control structures and expected output.`
        };

    }

    if (type === "MCQ") {

        return {
            question:
                `Which option correctly explains the role of "${topic}" ` +
                `in ${subject}?`,
            answer:
                `"${topic}" is used according to the programming principles ` +
                `of ${subject}. The correct option should describe its actual ` +
                `purpose and usage.`
        };

    }

    if (type === "Short") {

        return {
            question:
                `What is "${topic}" in ${subject}? Explain with a simple example.`,
            answer:
                `"${topic}" is an important programming concept. ` +
                `The answer should provide its definition, purpose and a ` +
                `simple relevant example.`
        };

    }

    return {
        question:
            `Explain "${topic}" in ${subject} with syntax, working, ` +
            `advantages and a suitable example.`,
        answer:
            `The answer should explain the concept of "${topic}", its syntax ` +
            `or implementation, working process, advantages and a suitable ` +
            `programming example.`
    };

}


// ============================================================
// DATABASE BUILDER
// ============================================================

function buildDatabaseQuestion(
    subject,
    topic,
    type
) {

    if (type === "Programming") {

        return {
            question:
                `Write suitable SQL queries or database operations related ` +
                `to "${topic}". Explain each operation.`,
            answer:
                `The solution should use appropriate SQL or database operations ` +
                `for "${topic}". Each query should be syntactically correct and ` +
                `its purpose should be explained.`
        };

    }

    if (type === "Numerical") {

        return {
            question:
                `Solve a suitable database problem related to "${topic}". ` +
                `Show all necessary steps and calculations.`,
            answer:
                `The solution should identify the given database information, ` +
                `apply the appropriate concept or calculation and clearly ` +
                `state the final result.`
        };

    }

    if (type === "MCQ") {

        return {
            question:
                `Which statement correctly describes "${topic}" in DBMS?`,
            answer:
                `"${topic}" is a database concept. The correct answer should ` +
                `represent its standard purpose, operation or property.`
        };

    }

    if (type === "Short") {

        return {
            question:
                `What is "${topic}" in DBMS? Explain its purpose and importance.`,
            answer:
                `"${topic}" should be explained with its definition, purpose, ` +
                `important characteristics and role in database management.`
        };

    }

    return {
        question:
            `Explain "${topic}" in DBMS in detail with a suitable example. ` +
            `Discuss its working, advantages and limitations.`,
        answer:
            `A complete answer should define "${topic}", explain its working, ` +
            `important characteristics, advantages, limitations and provide ` +
            `a suitable database example.`
    };

}


// ============================================================
// NETWORKING BUILDER
// ============================================================

function buildNetworkingQuestion(
    subject,
    topic,
    type
) {

    if (type === "Numerical") {

        return {
            question:
                `Solve a suitable networking numerical based on "${topic}". ` +
                `Show all formulas and calculation steps.`,
            answer:
                `The solution should identify the given networking parameters, ` +
                `select the correct formula, substitute values and show the ` +
                `final calculated result clearly.`
        };

    }

    if (type === "MCQ") {

        return {
            question:
                `Which statement correctly describes "${topic}" in computer networks?`,
            answer:
                `"${topic}" is a networking concept. The correct answer should ` +
                `describe its standard function or operation.`
        };

    }

    if (type === "Short") {

        return {
            question:
                `Explain "${topic}" in computer networks with its main function.`,
            answer:
                `"${topic}" should be explained through its definition, purpose, ` +
                `main function and a relevant networking example.`
        };

    }

    return {
        question:
            `Explain "${topic}" in detail. Discuss its working, components, ` +
            `advantages, limitations and practical networking applications.`,
        answer:
            `The answer should define "${topic}", explain its working and ` +
            `components, discuss advantages and limitations, and provide a ` +
            `practical networking example.`
    };

}


// ============================================================
// GENERAL BUILDER
// ============================================================

function buildGeneralQuestion(
    subject,
    unit,
    topic,
    type
) {

    if (type === "MCQ") {

        return {
            question:
                `Which statement correctly explains "${topic}" in ${subject}?`,
            answer:
                `"${topic}" is an important concept in ${subject}. ` +
                `The correct answer should represent its standard definition, ` +
                `purpose or application.`
        };

    }

    if (type === "Short") {

        return {
            question:
                `What is "${topic}"? Explain its importance in ${subject}.`,
            answer:
                `"${topic}" should be explained using its definition, ` +
                `main characteristics, importance and application.`
        };

    }

    if (type === "Programming") {

        return {
            question:
                `Describe how "${topic}" can be implemented or demonstrated ` +
                `in ${subject}. Give a suitable example.`,
            answer:
                `The answer should explain the implementation or demonstration ` +
                `of "${topic}" and provide a suitable example related to ${subject}.`
        };

    }

    if (type === "Numerical") {

        return {
            question:
                `Solve a suitable problem related to "${topic}" in ${subject}. ` +
                `Show all required steps.`,
            answer:
                `The solution should identify the given information, apply the ` +
                `appropriate method and show the solution step by step.`
        };

    }

    return {
        question:
            `Explain "${topic}" in detail in the context of ${subject}. ` +
            `Include its concept, working, important characteristics, ` +
            `advantages, limitations and suitable examples.`,
        answer:
            `"${topic}" should be explained with its definition, core concept, ` +
            `working, important characteristics, advantages, limitations and ` +
            `relevant examples.`
    };

}


// ============================================================
// BUILD QUESTION
// ============================================================

function buildQuestion(
    subject,
    unit,
    topic,
    type,
    difficulty,
    variant
) {

    const category =
        getCategory(subject);

    let result;


    if (category === "mathematics") {

        result =
            buildMathematicsQuestion(
                subject,
                unit,
                topic,
                type,
                difficulty
            );

    }

    else if (category === "programming") {

        result =
            buildProgrammingQuestion(
                subject,
                topic,
                type
            );

    }

    else if (category === "database") {

        result =
            buildDatabaseQuestion(
                subject,
                topic,
                type
            );

    }

    else if (category === "networking") {

        result =
            buildNetworkingQuestion(
                subject,
                topic,
                type
            );

    }

    else {

        result =
            buildGeneralQuestion(
                subject,
                unit,
                topic,
                type
            );

    }


    // --------------------------------------------------------
    // Difficulty adjustment
    // --------------------------------------------------------

    if (difficulty === "Medium") {

        result.question +=
            " Support your answer with reasoning or comparison.";

        result.answer +=
            " The answer should demonstrate understanding and " +
            "include appropriate reasoning or comparison.";

    }


    if (difficulty === "Hard") {

        result.question +=
            " Analyze the concept critically and justify your answer " +
            "with suitable reasoning or examples.";

        result.answer +=
            " A strong answer should connect this topic with related " +
            "concepts and provide logical justification.";

    }


    return {

        question:
            result.question,

        answer:
            result.answer

    };

}


// ============================================================
// DUPLICATE KEY
// ============================================================

function duplicateKey(question) {

    return [

        normalize(question.subject),

        normalize(question.subjectCode),

        normalize(question.unit),

        normalize(question.topic),

        normalize(question.questionType),

        normalize(question.difficulty),

        normalize(question.question)

    ].join("|");

}


// ============================================================
// GENERATE ONE SUBJECT
// ============================================================

async function generateSubject(
    collection,
    subjectName
) {

    const subject =
        getSubject(subjectName);

    const topics =
        getAllTopicsForSubject(
            subjectName
        );


    if (!subject || topics.length === 0) {

        return {
            inserted: 0,
            skipped: 0
        };

    }


    const existing =
        await collection
            .find(
                {
                    subject: subjectName
                }
            )
            .toArray();


    const existingKeys =
        new Set();


    for (const item of existing) {

        existingKeys.add(
            duplicateKey(item)
        );

    }


    const types =
        createDistributionList(
            TYPE_DISTRIBUTION
        );

    const difficulties =
        createDistributionList(
            DIFFICULTY_DISTRIBUTION
        );


    const generated = [];

    let skipped = 0;

    let attempts = 0;


    const maxAttempts =
        QUESTIONS_PER_SUBJECT * 50;


    while (
        generated.length <
            QUESTIONS_PER_SUBJECT &&
        attempts <
            maxAttempts
    ) {

        attempts++;


        const index =
            generated.length;


        const topicData =
            topics[
                index % topics.length
            ];


        const type =
            types[
                index % types.length
            ];


        const difficulty =
            difficulties[
                index % difficulties.length
            ];


        const built =
            buildQuestion(
                subjectName,
                topicData.unit,
                topicData.topic,
                type,
                difficulty,
                index
            );


        const question = {

            semester:
                subject.semester,

            subject:
                subjectName,

            subjectCode:
                subject.subjectCode,

            unit:
                topicData.unit,

            topic:
                topicData.topic,

            questionType:
                type,

            difficulty,

            marks:
                MARKS[type],

            question:
                built.question,

            answer:
                built.answer,

            options:
                [],

            correctAnswer:
                "",

            explanation:
                built.answer,

            usedInPapers:
                [],

            generatedBy:
                "Quality Question Bank Generator",

            generatorMode:
                GENERATOR_MODE,

            createdAt:
                new Date(),

            updatedAt:
                new Date()

        };


        const key =
            duplicateKey(question);


        if (
            existingKeys.has(key)
        ) {

            skipped++;

            continue;

        }


        existingKeys.add(key);

        generated.push(question);

    }


    let inserted = 0;


    if (generated.length > 0) {

        const result =
            await collection.insertMany(
                generated,
                {
                    ordered: false
                }
            );

        inserted =
            result.insertedCount;

    }


    return {

        inserted,

        skipped,

        topics:
            topics.length

    };

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
        "# QUALITY QUESTION BANK GENERATOR"
    );

    console.log(
        "################################################"
    );

    console.log("");

    console.log(
        `Mode                  : ${GENERATOR_MODE}`
    );

    console.log(
        `Questions / Subject   : ${QUESTIONS_PER_SUBJECT}`
    );

    console.log(
        `Total Subjects        : ${getAllSubjects().length}`
    );

    console.log(
        `Target This Run       : ` +
        `${getAllSubjects().length *
          QUESTIONS_PER_SUBJECT}`
    );


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


        let totalInserted = 0;

        let totalSkipped = 0;


        for (
            const subject
            of getAllSubjects()
        ) {

            const result =
                await generateSubject(
                    collection,
                    subject
                );


            console.log("");

            console.log(
                "----------------------------------------------"
            );

            console.log(
                `Subject : ${subject}`
            );

            console.log(
                `Topics  : ${result.topics}`
            );

            console.log(
                `Inserted: ${result.inserted}`
            );

            console.log(
                `Skipped : ${result.skipped}`
            );


            totalInserted +=
                result.inserted;

            totalSkipped +=
                result.skipped;

        }


        console.log("");

        console.log(
            "================================================"
        );

        console.log(
            "QUALITY GENERATION COMPLETED"
        );

        console.log(
            "================================================"
        );

        console.log("");

        console.log(
            `Total Inserted : ${totalInserted}`
        );

        console.log(
            `Total Skipped  : ${totalSkipped}`
        );

        console.log("");

    }

    catch (error) {

        console.error("");

        console.error(
            "GENERATION ERROR"
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