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

        // Remove only these 2 extra quality-test questions.
        // All other Web Design questions remain untouched.

        const topicsToRemove = [
            "HTML Introduction",
            "CSS Basics"
        ];

        const result = await collection.deleteMany({
            subject: "Web Design",
            generatedBy: "Web Design Quality Test Generator",
            topic: { $in: topicsToRemove }
        });

        console.log("");
        console.log("==============================================");
        console.log("EXTRA WEB DESIGN CLEANUP");
        console.log("==============================================");
        console.log(`Deleted questions: ${result.deletedCount}`);
        console.log("==============================================");

    } catch (error) {

        console.error("ERROR:", error);

    } finally {

        await client.close();

        console.log("MongoDB connection closed.");
    }
}

main();