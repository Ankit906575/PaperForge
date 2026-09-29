const { MongoClient } = require("mongodb");

const MONGO_URI = "mongodb://127.0.0.1:27017";
const DB_NAME = "question_paper_generator";

async function cleanDatabase() {
    const client = new MongoClient(MONGO_URI);

    try {
        await client.connect();

        console.log("MongoDB Connected Successfully!");
        console.log("");

        const db = client.db(DB_NAME);
        const collection = db.collection("questions");

        const totalBefore = await collection.countDocuments();

        console.log("==========================================");
        console.log(" DATABASE CLEANUP");
        console.log("==========================================");
        console.log(`Questions before cleanup: ${totalBefore}`);
        console.log("");

        // Show current questions
        const questions = await collection.find({}).toArray();

        console.log("Current question records:");
        console.log("------------------------------------------");

        questions.forEach((q, index) => {
            console.log(
                `${index + 1}. ${q.subject} | ${q.subjectCode} | ${q.semester} | ${q.questionType}`
            );
        });

        console.log("");
        console.log("==========================================");
        console.log("IMPORTANT");
        console.log("==========================================");
        console.log("This script will remove ALL current test questions.");
        console.log("After cleanup, the database will be ready");
        console.log("for the proper 24-subject question bank.");
        console.log("");

        // Delete all questions
        const result = await collection.deleteMany({});

        const totalAfter = await collection.countDocuments();

        console.log("==========================================");
        console.log(" CLEANUP COMPLETED");
        console.log("==========================================");
        console.log(`Deleted questions : ${result.deletedCount}`);
        console.log(`Remaining questions: ${totalAfter}`);
        console.log("==========================================");
        console.log("");

    } catch (error) {
        console.error("Cleanup Error:", error);
    } finally {
        await client.close();
        console.log("MongoDB connection closed.");
    }
}

cleanDatabase();