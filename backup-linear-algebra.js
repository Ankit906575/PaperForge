const { MongoClient } = require("mongodb");
const fs = require("fs");

const MONGO_URI = "mongodb://127.0.0.1:27017";
const DB_NAME = "question_paper_generator";
const COLLECTION_NAME = "questions";

async function main() {
    const client = new MongoClient(MONGO_URI);

    try {
        await client.connect();

        console.log("MongoDB Connected Successfully!");
        console.log("");

        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTION_NAME);

        const questions = await collection.find({
            subject: "Linear Algebra",
            subjectCode: "BCA101"
        }).sort({ _id: 1 }).toArray();

        const fileName = "linear-algebra-backup.json";

        fs.writeFileSync(
            fileName,
            JSON.stringify(questions, null, 2),
            "utf8"
        );

        console.log("==============================================");
        console.log("LINEAR ALGEBRA BACKUP CREATED");
        console.log("==============================================");
        console.log("");
        console.log(`Questions Backed Up : ${questions.length}`);
        console.log(`Backup File         : ${fileName}`);
        console.log("");
        console.log("Database was NOT changed.");
        console.log("Backup completed successfully.");
        console.log("");

    } catch (error) {
        console.error("ERROR:", error.message);
    } finally {
        await client.close();
        console.log("MongoDB connection closed.");
    }
}

main();