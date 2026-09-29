const { MongoClient } = require("mongodb");

const MONGO_URI = "mongodb://127.0.0.1:27017";
const DB_NAME = "question_paper_generator";
const COLLECTION = "questions";

const questions = [
    {
        semester: 1,
        subject: "Linear Algebra",
        subjectCode: "BCA101",
        unit: "Unit 1",
        topic: "Introduction to Matrices",
        questionType: "MCQ",
        difficulty: "Easy",
        marks: 1,
        question: "If A is a matrix having 2 rows and 3 columns, what is its order?",
        options: ["2 × 2", "2 × 3", "3 × 2", "3 × 3"],
        correctAnswer: "2 × 3",
        answer: "The order of a matrix is written as rows × columns. Therefore, a matrix with 2 rows and 3 columns has order 2 × 3.",
        explanation: "Matrix order = number of rows × number of columns."
    },

    {
        semester: 1,
        subject: "Linear Algebra",
        subjectCode: "BCA101",
        unit: "Unit 1",
        topic: "Matrix Addition and Subtraction",
        questionType: "Numerical",
        difficulty: "Easy",
        marks: 5,
        question: "Given A = [[2, 3], [4, 5]] and B = [[1, 2], [3, 4]], find A + B.",
        options: [],
        correctAnswer: "",
        answer: "A + B = [[2+1, 3+2], [4+3, 5+4]] = [[3, 5], [7, 9]].",
        explanation: "Corresponding elements of two matrices are added."
    },

    {
        semester: 1,
        subject: "Linear Algebra",
        subjectCode: "BCA101",
        unit: "Unit 1",
        topic: "Scalar Multiplication",
        questionType: "Short",
        difficulty: "Easy",
        marks: 2,
        question: "What is scalar multiplication of a matrix? Illustrate it with an example.",
        options: [],
        correctAnswer: "",
        answer: "Scalar multiplication means multiplying every element of a matrix by a constant scalar. For example, 3[[1,2],[3,4]] = [[3,6],[9,12]].",
        explanation: "Every matrix element is multiplied by the same scalar."
    },

    {
        semester: 1,
        subject: "Linear Algebra",
        subjectCode: "BCA101",
        unit: "Unit 1",
        topic: "Matrix Multiplication",
        questionType: "Numerical",
        difficulty: "Medium",
        marks: 5,
        question: "Multiply A = [[1, 2], [3, 4]] and B = [[2, 0], [1, 3]].",
        options: [],
        correctAnswer: "",
        answer: "AB = [[1×2 + 2×1, 1×0 + 2×3], [3×2 + 4×1, 3×0 + 4×3]] = [[4, 6], [10, 12]].",
        explanation: "Each element is obtained by multiplying a row of A by a column of B."
    },

    {
        semester: 1,
        subject: "Linear Algebra",
        subjectCode: "BCA101",
        unit: "Unit 1",
        topic: "Determinants",
        questionType: "Numerical",
        difficulty: "Medium",
        marks: 5,
        question: "Find the determinant of the matrix [[4, 2], [3, 5]].",
        options: [],
        correctAnswer: "",
        answer: "For [[a,b],[c,d]], determinant = ad − bc. Therefore, determinant = (4×5) − (2×3) = 20 − 6 = 14.",
        explanation: "For a 2×2 matrix, determinant = ad − bc."
    },

    {
        semester: 1,
        subject: "Linear Algebra",
        subjectCode: "BCA101",
        unit: "Unit 2",
        topic: "Inverse of a Matrix",
        questionType: "Long",
        difficulty: "Medium",
        marks: 5,
        question: "Find the inverse of A = [[2, 1], [1, 1]].",
        options: [],
        correctAnswer: "",
        answer: "det(A) = 2×1 − 1×1 = 1. For a 2×2 matrix, A⁻¹ = 1/det(A) [[d,-b],[-c,a]]. Therefore A⁻¹ = [[1,-1],[-1,2]].",
        explanation: "The inverse exists because the determinant is non-zero."
    },

    {
        semester: 1,
        subject: "Linear Algebra",
        subjectCode: "BCA101",
        unit: "Unit 2",
        topic: "Rank of a Matrix",
        questionType: "Short",
        difficulty: "Medium",
        marks: 2,
        question: "What is the rank of a matrix?",
        options: [],
        correctAnswer: "",
        answer: "The rank of a matrix is the maximum number of linearly independent rows or columns. It can be determined using row-reduction to echelon form.",
        explanation: "Rank represents the dimension of the row space or column space."
    },

    {
        semester: 1,
        subject: "Linear Algebra",
        subjectCode: "BCA101",
        unit: "Unit 3",
        topic: "Eigenvalues",
        questionType: "Numerical",
        difficulty: "Hard",
        marks: 5,
        question: "Find the eigenvalues of the matrix [[2, 0], [0, 3]].",
        options: [],
        correctAnswer: "",
        answer: "Solve det(A − λI) = 0. For the diagonal matrix, (2−λ)(3−λ)=0. Hence λ = 2 and λ = 3.",
        explanation: "The eigenvalues of a diagonal matrix are its diagonal elements."
    },

    {
        semester: 1,
        subject: "Linear Algebra",
        subjectCode: "BCA101",
        unit: "Unit 3",
        topic: "Vectors",
        questionType: "Short",
        difficulty: "Hard",
        marks: 2,
        question: "What is a vector? Explain the difference between a scalar and a vector.",
        options: [],
        correctAnswer: "",
        answer: "A vector is a quantity having both magnitude and direction. A scalar has magnitude only. For example, mass is scalar while velocity is a vector.",
        explanation: "Vectors contain magnitude and direction; scalars contain magnitude only."
    },

    {
        semester: 1,
        subject: "Linear Algebra",
        subjectCode: "BCA101",
        unit: "Unit 4",
        topic: "Linear Equations",
        questionType: "Numerical",
        difficulty: "Hard",
        marks: 5,
        question: "Solve the system x + y = 5 and x − y = 1 using the elimination method.",
        options: [],
        correctAnswer: "",
        answer: "Adding the two equations gives 2x = 6, so x = 3. Substituting x = 3 into x + y = 5 gives y = 2. Therefore, x = 3 and y = 2.",
        explanation: "The elimination method combines equations to eliminate one variable."
    }
];


async function main() {

    const client = new MongoClient(MONGO_URI);

    try {

        await client.connect();

        console.log("MongoDB Connected Successfully!");

        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTION);

        let inserted = 0;
        let skipped = 0;

        for (const q of questions) {

            const existing = await collection.findOne({
                subject: q.subject,
                subjectCode: q.subjectCode,
                unit: q.unit,
                topic: q.topic,
                questionType: q.questionType,
                question: q.question
            });

            if (existing) {

                console.log(`SKIPPED: ${q.topic}`);
                skipped++;
                continue;

            }

            const document = {
                ...q,
                usedInPapers: [],
                generatedBy: "Subject Specific Test Generator",
                generatorMode: "QUALITY_TEST",
                createdAt: new Date(),
                updatedAt: new Date()
            };

            await collection.insertOne(document);

            console.log(`INSERTED: ${q.topic}`);
            inserted++;
        }

        console.log("");
        console.log("==============================================");
        console.log("LINEAR ALGEBRA TEST COMPLETED");
        console.log("==============================================");
        console.log(`Inserted : ${inserted}`);
        console.log(`Skipped  : ${skipped}`);
        console.log(`Total Test Questions : ${questions.length}`);
        console.log("==============================================");

    } catch (error) {

        console.error("ERROR:", error);

    } finally {

        await client.close();

        console.log("MongoDB connection closed.");

    }
}

main();