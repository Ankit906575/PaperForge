const { MongoClient } = require("mongodb");

const MONGO_URI = "mongodb://127.0.0.1:27017";
const DB_NAME = "question_paper_generator";
const COLLECTION = "questions";

async function main() {

    const client = new MongoClient(MONGO_URI);

    try {

        await client.connect();

        console.log("MongoDB Connected Successfully!");

        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTION);

        const question = {
            semester: 1,
            subject: "Web Design",
            subjectCode: "BCA102",
            unit: "Unit 4",
            topic: "HTML Forms",
            questionType: "Short",
            difficulty: "Easy",
            marks: 2,
            question: "What is the purpose of the HTML form element? Name two commonly used form controls.",
            answer: "The HTML form element is used to collect input from users and submit that data for processing. Common form controls include input fields, radio buttons, checkboxes, select lists and text areas. For example, an input field can collect a user's name while a checkbox can allow the user to select an option.",
            explanation: "HTML forms provide a structured way to collect and submit user input."
        };

        const duplicate = await collection.findOne({
            subject: question.subject,
            subjectCode: question.subjectCode,
            unit: question.unit,
            topic: question.topic,
            questionType: question.questionType,
            difficulty: question.difficulty,
            question: question.question
        });

        if (duplicate) {

            console.log("QUESTION ALREADY EXISTS.");
            return;
        }

        await collection.insertOne({
            ...question,
            usedInPapers: [],
            generatedBy: "Web Design Quality Test Generator",
            generatorMode: "QUALITY_TEST",
            createdAt: new Date(),
            updatedAt: new Date()
        });

        console.log("");
        console.log("==============================================");
        console.log("WEB DESIGN QUESTION ADDED");
        console.log("==============================================");
        console.log("Inserted : 1");
        console.log("==============================================");

    } catch (error) {

        console.error("ERROR:", error);

    } finally {

        await client.close();

        console.log("MongoDB connection closed.");
    }
}

main();