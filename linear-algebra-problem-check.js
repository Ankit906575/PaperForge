const { MongoClient } = require("mongodb");

const MONGO_URI = "mongodb://127.0.0.1:27017";
const DB_NAME = "question_paper_generator";
const COLLECTION_NAME = "questions";

const SUBJECT = "Linear Algebra";
const SUBJECT_CODE = "BCA101";

const GENERIC_PHRASES = [
    "write a program related to",
    "write a program to perform a computation related to",
    "the program should accept",
    "apply the appropriate mathematical operation",
    "the appropriate method related to",
    "a suitable example",
    "explain the concept",
    "explain the topic",
    "important topic",
    "the solution should",
    "the student should first identify",
    "the appropriate method should then be selected",
    "the method should be applied",
    "analyze the situation and explain",
    "the required input",
    "display the result"
];

function line() {
    console.log("----------------------------------------------");
}

async function main() {
    const client = new MongoClient(MONGO_URI);

    try {
        await client.connect();

        console.log("MongoDB Connected Successfully!");
        console.log("");
        console.log("################################################");
        console.log("# LINEAR ALGEBRA PROBLEM CHECK");
        console.log("################################################");
        console.log("");

        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTION_NAME);

        const questions = await collection.find({
            subject: SUBJECT,
            subjectCode: SUBJECT_CODE
        }).sort({ _id: 1 }).toArray();

        console.log(`Subject      : ${SUBJECT}`);
        console.log(`Subject Code : ${SUBJECT_CODE}`);
        console.log(`Total        : ${questions.length}`);
        console.log("");

        // ============================================
        // 1. DUPLICATE QUESTIONS
        // ============================================

        console.log("1. DUPLICATE QUESTIONS");
        line();

        const seen = new Map();
        const duplicateGroups = [];

        questions.forEach((q, index) => {
            const normalized = String(q.question || "")
                .toLowerCase()
                .replace(/\s+/g, " ")
                .trim();

            if (seen.has(normalized)) {
                const existing = seen.get(normalized);

                let group = duplicateGroups.find(
                    g => g.question === normalized
                );

                if (!group) {
                    group = {
                        question: normalized,
                        numbers: [existing]
                    };

                    duplicateGroups.push(group);
                }

                group.numbers.push(index + 1);
            } else {
                seen.set(normalized, index + 1);
            }
        });

        console.log(`Duplicate Groups: ${duplicateGroups.length}`);
        console.log("");

        duplicateGroups.forEach((group, index) => {
            console.log(`DUPLICATE GROUP ${index + 1}`);
            console.log(`Question Numbers: ${group.numbers.join(", ")}`);

            const q = questions[group.numbers[0] - 1];

            console.log(`Type           : ${q.questionType}`);
            console.log(`Difficulty     : ${q.difficulty}`);
            console.log(`Unit           : ${q.unit}`);
            console.log(`Topic          : ${q.topic}`);
            console.log(`Question       : ${q.question}`);
            console.log("");
        });

        // ============================================
        // 2. GENERIC QUESTIONS
        // ============================================

        console.log("2. GENERIC / TEMPLATE QUESTIONS");
        line();

        const genericQuestions = [];

        questions.forEach((q, index) => {
            const text = (
                String(q.question || "") +
                " " +
                String(q.answer || "")
            ).toLowerCase();

            const matched = GENERIC_PHRASES.filter(
                phrase => text.includes(phrase)
            );

            if (matched.length > 0) {
                genericQuestions.push({
                    number: index + 1,
                    question: q.question,
                    answer: q.answer,
                    type: q.questionType,
                    difficulty: q.difficulty,
                    unit: q.unit,
                    topic: q.topic,
                    matched
                });
            }
        });

        console.log(`Generic Questions: ${genericQuestions.length}`);
        console.log("");

        genericQuestions.forEach(item => {
            console.log(`QUESTION ${item.number}`);
            console.log(`Type       : ${item.type}`);
            console.log(`Difficulty : ${item.difficulty}`);
            console.log(`Unit       : ${item.unit}`);
            console.log(`Topic      : ${item.topic}`);
            console.log(`Matched    : ${item.matched.join(", ")}`);
            console.log(`Question   : ${item.question}`);
            console.log(`Answer     : ${item.answer}`);
            console.log("----------------------------------------------");
        });

        // ============================================
        // 3. PROGRAMMING QUALITY
        // ============================================

        console.log("");
        console.log("3. PROGRAMMING QUESTION CHECK");
        line();

        const programmingQuestions = questions.filter(
            q => q.questionType === "Programming"
        );

        console.log(`Programming Questions: ${programmingQuestions.length}`);
        console.log("");

        programmingQuestions.forEach((q, index) => {
            const answer = String(q.answer || "");

            const hasCode =
                answer.includes("#include") ||
                answer.includes("int main") ||
                answer.includes("void main") ||
                answer.includes("cout") ||
                answer.includes("cin") ||
                answer.includes("for (") ||
                answer.includes("while (");

            console.log(`Programming ${index + 1}`);
            console.log(`Topic      : ${q.topic}`);
            console.log(`Question   : ${q.question}`);
            console.log(`Has Code   : ${hasCode ? "YES" : "NO"}`);
            console.log(`Answer Len : ${answer.length}`);
            console.log("");
        });

        // ============================================
        // 4. NUMERICAL QUALITY
        // ============================================

        console.log("4. NUMERICAL QUESTION CHECK");
        line();

        const numericalQuestions = questions.filter(
            q => q.questionType === "Numerical"
        );

        console.log(`Numerical Questions: ${numericalQuestions.length}`);
        console.log("");

        numericalQuestions.forEach((q, index) => {
            const answer = String(q.answer || "");

            const hasSteps =
                answer.toLowerCase().includes("step") ||
                answer.toLowerCase().includes("therefore") ||
                answer.toLowerCase().includes("=");

            console.log(`Numerical ${index + 1}`);
            console.log(`Topic      : ${q.topic}`);
            console.log(`Question   : ${q.question}`);
            console.log(`Has Steps  : ${hasSteps ? "YES" : "NO"}`);
            console.log(`Answer Len : ${answer.length}`);
            console.log("");
        });

        // ============================================
        // 5. LONG ANSWER QUALITY
        // ============================================

        console.log("5. LONG ANSWER CHECK");
        line();

        const longQuestions = questions.filter(
            q => q.questionType === "Long"
        );

        console.log(`Long Questions: ${longQuestions.length}`);
        console.log("");

        longQuestions.forEach((q, index) => {
            const answer = String(q.answer || "");

            console.log(`Long ${index + 1}`);
            console.log(`Topic      : ${q.topic}`);
            console.log(`Question   : ${q.question}`);
            console.log(`Answer Len : ${answer.length}`);
            console.log(`Answer     : ${answer}`);
            console.log("----------------------------------------------");
        });

        // ============================================
        // 6. CASE STUDY QUALITY
        // ============================================

        console.log("");
        console.log("6. CASE STUDY CHECK");
        line();

        const caseStudies = questions.filter(
            q => q.questionType === "Case Study"
        );

        console.log(`Case Studies: ${caseStudies.length}`);
        console.log("");

        caseStudies.forEach((q, index) => {
            const answer = String(q.answer || "");

            console.log(`Case Study ${index + 1}`);
            console.log(`Topic      : ${q.topic}`);
            console.log(`Question   : ${q.question}`);
            console.log(`Answer Len : ${answer.length}`);
            console.log(`Answer     : ${answer}`);
            console.log("----------------------------------------------");
        });

        // ============================================
        // 7. SHORT ANSWER CHECK
        // ============================================

        console.log("");
        console.log("7. SHORT ANSWER CHECK");
        line();

        const shortQuestions = questions.filter(
            q => q.questionType === "Short"
        );

        console.log(`Short Questions: ${shortQuestions.length}`);
        console.log("");

        shortQuestions.forEach((q, index) => {
            const answer = String(q.answer || "");

            if (answer.length < 100) {
                console.log(`SHORT ANSWER ${index + 1}`);
                console.log(`Topic      : ${q.topic}`);
                console.log(`Question   : ${q.question}`);
                console.log(`Answer Len : ${answer.length}`);
                console.log(`Answer     : ${answer}`);
                console.log("----------------------------------------------");
            }
        });

        // ============================================
        // FINAL SUMMARY
        // ============================================

        console.log("");
        console.log("################################################");
        console.log("# PROBLEM CHECK SUMMARY");
        console.log("################################################");
        console.log("");

        console.log(`Total Questions       : ${questions.length}`);
        console.log(`Duplicate Groups      : ${duplicateGroups.length}`);
        console.log(`Generic Questions     : ${genericQuestions.length}`);
        console.log(`Programming Questions : ${programmingQuestions.length}`);
        console.log(`Numerical Questions   : ${numericalQuestions.length}`);
        console.log(`Long Questions        : ${longQuestions.length}`);
        console.log(`Case Studies          : ${caseStudies.length}`);
        console.log(`Short Questions       : ${shortQuestions.length}`);

        console.log("");
        console.log("NO DATABASE CHANGES WERE MADE.");
        console.log("This script only reads and reports problems.");
        console.log("");

    } catch (error) {
        console.error("ERROR:", error.message);
    } finally {
        await client.close();
        console.log("MongoDB connection closed.");
    }
}

main();