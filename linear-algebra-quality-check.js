const { MongoClient } = require("mongodb");

const MONGO_URI = "mongodb://127.0.0.1:27017";
const DB_NAME = "question_paper_generator";
const COLLECTION_NAME = "questions";

const SUBJECT = "Linear Algebra";
const SUBJECT_CODE = "BCA101";

const EXPECTED_TOTAL = 100;

const EXPECTED_TYPES = {
    MCQ: 25,
    Short: 25,
    Long: 20,
    Numerical: 15,
    Programming: 10,
    "Case Study": 5
};

const EXPECTED_DIFFICULTY = {
    Easy: 30,
    Medium: 40,
    Hard: 30
};

const MIN_ANSWER_LENGTH = {
    MCQ: 30,
    Short: 100,
    Long: 300,
    Numerical: 200,
    Programming: 250,
    "Case Study": 400
};

function line() {
    console.log("----------------------------------------------");
}

function checkAnswerLength(question) {
    const answer = String(question.answer || "").trim();
    const type = question.questionType;
    const minimum = MIN_ANSWER_LENGTH[type] || 1;

    return answer.length >= minimum;
}

async function main() {
    const client = new MongoClient(MONGO_URI);

    try {
        await client.connect();

        console.log("MongoDB Connected Successfully!");
        console.log("");
        console.log("################################################");
        console.log("# LINEAR ALGEBRA QUALITY CHECK");
        console.log("################################################");
        console.log("");

        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTION_NAME);

        const questions = await collection.find({
            subject: SUBJECT,
            subjectCode: SUBJECT_CODE
        }).toArray();

        console.log(`Subject       : ${SUBJECT}`);
        console.log(`Subject Code  : ${SUBJECT_CODE}`);
        console.log(`Questions     : ${questions.length}`);
        console.log(`Target        : ${EXPECTED_TOTAL}`);
        console.log("");

        // ------------------------------------------------
        // 1. TOTAL CHECK
        // ------------------------------------------------

        console.log("1. TOTAL QUESTION CHECK");
        line();

        if (questions.length === EXPECTED_TOTAL) {
            console.log(`PASS: Exactly ${EXPECTED_TOTAL} Linear Algebra questions found.`);
        } else {
            console.log(
                `WARNING: Expected ${EXPECTED_TOTAL} but found ${questions.length}.`
            );
        }

        console.log("");

        // ------------------------------------------------
        // 2. QUESTION TYPE CHECK
        // ------------------------------------------------

        console.log("2. QUESTION TYPE DISTRIBUTION");
        line();

        const typeCounts = {
            MCQ: 0,
            Short: 0,
            Long: 0,
            Numerical: 0,
            Programming: 0,
            "Case Study": 0
        };

        questions.forEach(q => {
            if (typeCounts[q.questionType] !== undefined) {
                typeCounts[q.questionType]++;
            }
        });

        let typePass = true;

        Object.keys(EXPECTED_TYPES).forEach(type => {
            const actual = typeCounts[type];
            const expected = EXPECTED_TYPES[type];

            if (actual === expected) {
                console.log(`PASS     | ${type.padEnd(13)} | ${actual}`);
            } else {
                console.log(
                    `WARNING  | ${type.padEnd(13)} | Expected ${expected}, Found ${actual}`
                );
                typePass = false;
            }
        });

        console.log("");

        // ------------------------------------------------
        // 3. DIFFICULTY CHECK
        // ------------------------------------------------

        console.log("3. DIFFICULTY DISTRIBUTION");
        line();

        const difficultyCounts = {
            Easy: 0,
            Medium: 0,
            Hard: 0
        };

        questions.forEach(q => {
            if (difficultyCounts[q.difficulty] !== undefined) {
                difficultyCounts[q.difficulty]++;
            }
        });

        let difficultyPass = true;

        Object.keys(EXPECTED_DIFFICULTY).forEach(level => {
            const actual = difficultyCounts[level];
            const expected = EXPECTED_DIFFICULTY[level];

            if (actual === expected) {
                console.log(`PASS     | ${level.padEnd(8)} | ${actual}`);
            } else {
                console.log(
                    `WARNING  | ${level.padEnd(8)} | Expected ${expected}, Found ${actual}`
                );
                difficultyPass = false;
            }
        });

        console.log("");

        // ------------------------------------------------
        // 4. REQUIRED FIELD CHECK
        // ------------------------------------------------

        console.log("4. REQUIRED FIELD CHECK");
        line();

        const requiredFields = [
            "semester",
            "subject",
            "subjectCode",
            "unit",
            "topic",
            "questionType",
            "difficulty",
            "marks",
            "question",
            "answer"
        ];

        let missingFields = 0;

        questions.forEach((q, index) => {
            requiredFields.forEach(field => {
                if (
                    q[field] === undefined ||
                    q[field] === null ||
                    String(q[field]).trim() === ""
                ) {
                    missingFields++;

                    console.log(
                        `Missing | Question ${index + 1} | Field: ${field}`
                    );
                }
            });
        });

        if (missingFields === 0) {
            console.log("PASS: No required fields are missing.");
        } else {
            console.log(`WARNING: ${missingFields} missing fields found.`);
        }

        console.log("");

        // ------------------------------------------------
        // 5. ANSWER LENGTH CHECK
        // ------------------------------------------------

        console.log("5. ANSWER QUALITY / LENGTH CHECK");
        line();

        const answerIssues = [];

        questions.forEach((q, index) => {
            if (!checkAnswerLength(q)) {
                answerIssues.push({
                    number: index + 1,
                    type: q.questionType,
                    length: String(q.answer || "").length,
                    minimum: MIN_ANSWER_LENGTH[q.questionType]
                });
            }
        });

        if (answerIssues.length === 0) {
            console.log("PASS: All answers meet the minimum length requirement.");
        } else {
            console.log(
                `WARNING: ${answerIssues.length} answers are shorter than the required minimum.`
            );

            answerIssues.slice(0, 20).forEach(item => {
                console.log(
                    `Question ${item.number} | ${item.type} | Length ${item.length} | Minimum ${item.minimum}`
                );
            });

            if (answerIssues.length > 20) {
                console.log(
                    `...and ${answerIssues.length - 20} more.`
                );
            }
        }

        console.log("");

        // ------------------------------------------------
        // 6. DUPLICATE CHECK
        // ------------------------------------------------

        console.log("6. DUPLICATE QUESTION CHECK");
        line();

        const seen = new Map();
        const duplicates = [];

        questions.forEach((q, index) => {
            const key = String(q.question)
                .trim()
                .toLowerCase()
                .replace(/\s+/g, " ");

            if (seen.has(key)) {
                duplicates.push({
                    current: index + 1,
                    previous: seen.get(key)
                });
            } else {
                seen.set(key, index + 1);
            }
        });

        if (duplicates.length === 0) {
            console.log("PASS: No duplicate questions found.");
        } else {
            console.log(
                `WARNING: ${duplicates.length} duplicate questions found.`
            );

            duplicates.slice(0, 20).forEach(d => {
                console.log(
                    `Duplicate: Question ${d.current} matches Question ${d.previous}`
                );
            });
        }

        console.log("");

        // ------------------------------------------------
        // 7. UNIT DISTRIBUTION
        // ------------------------------------------------

        console.log("7. UNIT DISTRIBUTION");
        line();

        const unitCounts = {};

        questions.forEach(q => {
            unitCounts[q.unit] = (unitCounts[q.unit] || 0) + 1;
        });

        Object.keys(unitCounts)
            .sort()
            .forEach(unit => {
                console.log(`${unit.padEnd(10)} : ${unitCounts[unit]}`);
            });

        console.log("");

        // ------------------------------------------------
        // 8. TOPIC COVERAGE
        // ------------------------------------------------

        console.log("8. TOPIC COVERAGE");
        line();

        const topicCounts = {};

        questions.forEach(q => {
            const key = `${q.unit} | ${q.topic}`;
            topicCounts[key] = (topicCounts[key] || 0) + 1;
        });

        console.log(`Unique Unit + Topic combinations: ${Object.keys(topicCounts).length}`);

        console.log("");

        // ------------------------------------------------
        // 9. SAMPLE QUESTIONS
        // ------------------------------------------------

        console.log("9. SAMPLE QUESTIONS");
        line();

        const sampleIndexes = [];

        const sampleTypes = [
            "MCQ",
            "Short",
            "Long",
            "Numerical",
            "Programming",
            "Case Study"
        ];

        sampleTypes.forEach(type => {
            const index = questions.findIndex(
                q => q.questionType === type
            );

            if (index !== -1) {
                sampleIndexes.push(index);
            }
        });

        sampleIndexes.forEach((index, i) => {
            const q = questions[index];

            console.log("");
            console.log(`Sample ${i + 1}`);
            console.log("----------------------------------------------");
            console.log(`Type       : ${q.questionType}`);
            console.log(`Difficulty : ${q.difficulty}`);
            console.log(`Unit       : ${q.unit}`);
            console.log(`Topic      : ${q.topic}`);
            console.log(`Marks      : ${q.marks}`);
            console.log(`Question   : ${q.question}`);
            console.log(`Answer Len : ${String(q.answer || "").length}`);
            console.log(`Answer     : ${q.answer}`);
        });

        console.log("");

        // ------------------------------------------------
        // FINAL SUMMARY
        // ------------------------------------------------

        console.log("################################################");
        console.log("# QUALITY CHECK SUMMARY");
        console.log("################################################");

        console.log("");
        console.log(`Total Questions       : ${questions.length}`);
        console.log(`Expected Questions    : ${EXPECTED_TOTAL}`);
        console.log(`Missing Fields        : ${missingFields}`);
        console.log(`Duplicate Questions   : ${duplicates.length}`);
        console.log(`Short Answers         : ${answerIssues.length}`);

        console.log("");
        console.log("Question Types:");

        Object.keys(typeCounts).forEach(type => {
            console.log(`  ${type.padEnd(13)} : ${typeCounts[type]}`);
        });

        console.log("");
        console.log("Difficulty:");

        Object.keys(difficultyCounts).forEach(level => {
            console.log(`  ${level.padEnd(8)} : ${difficultyCounts[level]}`);
        });

        console.log("");

        const totalPass =
            questions.length === EXPECTED_TOTAL &&
            typePass &&
            difficultyPass &&
            missingFields === 0 &&
            duplicates.length === 0 &&
            answerIssues.length === 0;

        if (totalPass) {
            console.log("==============================================");
            console.log("FINAL QUALITY STATUS: PASS");
            console.log("==============================================");
        } else {
            console.log("==============================================");
            console.log("FINAL QUALITY STATUS: REVIEW REQUIRED");
            console.log("==============================================");
        }

        console.log("");

    } catch (error) {
        console.error("ERROR:", error.message);
    } finally {
        await client.close();
        console.log("MongoDB connection closed.");
    }
}

main();