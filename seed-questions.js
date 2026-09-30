const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const { MongoClient } = require("mongodb");

// MONGODB CONFIGURATION
const MONGO_URI = "mongodb+srv://paperforge_user:anEBNxhTnYAQs3mZ@paperforge.c9txst2.mongodb.net/?appName=PaperForge";
const DATABASE_NAME = "PaperForge";

const client = new MongoClient(MONGO_URI, {
    tls: true
});

// ===============================
// QUESTION DATA
// ===============================

const questions = [

    // ===============================
    // UNIT 1 - MATRICES
    // ===============================

    {
        semester: "1",
        subject: "Linear Algebra",
        subjectCode: "BCA101",
        unit: "1",
        topic: "Matrices",
        questionType: "Short",
        difficulty: "Easy",
        marks: 2,
        question: "What is a matrix?",
        answer:
            "A matrix is a rectangular arrangement of numbers, symbols, or expressions organized into rows and columns. The size of a matrix is represented as m × n, where m is the number of rows and n is the number of columns. Matrices are widely used to represent data, solve systems of linear equations, and perform mathematical transformations."
    },

    {
        semester: "1",
        subject: "Linear Algebra",
        subjectCode: "BCA101",
        unit: "1",
        topic: "Types of Matrices",
        questionType: "Short",
        difficulty: "Easy",
        marks: 2,
        question: "What is a square matrix?",
        answer:
            "A square matrix is a matrix having the same number of rows and columns. For example, a matrix with 3 rows and 3 columns is called a 3 × 3 square matrix. Square matrices are important because concepts such as determinants, eigenvalues, and eigenvectors are mainly defined for square matrices."
    },

    {
        semester: "1",
        subject: "Linear Algebra",
        subjectCode: "BCA101",
        unit: "1",
        topic: "Matrix Multiplication",
        questionType: "Long",
        difficulty: "Medium",
        marks: 5,
        question: "Explain matrix multiplication with its condition.",
        answer:
            "Matrix multiplication is an operation in which two matrices are multiplied to produce another matrix. If matrix A has dimensions m × n and matrix B has dimensions n × p, then multiplication AB is possible and the resulting matrix has dimensions m × p. Each element of the resulting matrix is obtained by multiplying corresponding elements of a row of A with a column of B and adding the products. Matrix multiplication is generally not commutative, meaning AB is not necessarily equal to BA."
    },

    {
        semester: "1",
        subject: "Linear Algebra",
        subjectCode: "BCA101",
        unit: "1",
        topic: "Determinants",
        questionType: "Long",
        difficulty: "Medium",
        marks: 5,
        question: "Explain the determinant of a matrix and its importance.",
        answer:
            "The determinant is a scalar value associated with a square matrix. For a 2 × 2 matrix [[a,b],[c,d]], its determinant is calculated as ad − bc. Determinants are useful for finding whether a matrix has an inverse, solving systems of linear equations, and studying properties of linear transformations. If the determinant is zero, the matrix is singular and does not have an ordinary inverse."
    },

    // ===============================
    // UNIT 2 - LINEAR EQUATIONS
    // ===============================

    {
        semester: "1",
        subject: "Linear Algebra",
        subjectCode: "BCA101",
        unit: "2",
        topic: "Linear Equations",
        questionType: "Short",
        difficulty: "Easy",
        marks: 2,
        question: "What is a system of linear equations?",
        answer:
            "A system of linear equations is a collection of two or more linear equations involving the same variables. The equations are solved together to find values of the variables that satisfy all equations simultaneously. Such systems can be represented using matrices and solved using methods such as Gaussian elimination, Gauss-Jordan elimination, or matrix inverse."
    },

    {
        semester: "1",
        subject: "Linear Algebra",
        subjectCode: "BCA101",
        unit: "2",
        topic: "Gaussian Elimination",
        questionType: "Long",
        difficulty: "Medium",
        marks: 5,
        question: "Explain Gaussian elimination method.",
        answer:
            "Gaussian elimination is a systematic method for solving systems of linear equations. First, the equations are represented as an augmented matrix. Elementary row operations are then performed to transform the matrix into row echelon form. After obtaining the simplified form, the unknown variables are determined using back substitution. The method can also be used to determine the rank and consistency of a system."
    },

    {
        semester: "1",
        subject: "Linear Algebra",
        subjectCode: "BCA101",
        unit: "2",
        topic: "Cramer's Rule",
        questionType: "Numerical",
        difficulty: "Medium",
        marks: 5,
        question: "Explain how Cramer's Rule is used to solve two simultaneous linear equations.",
        answer:
            "Cramer's Rule uses determinants to solve a system of simultaneous linear equations. For equations ax + by = e and cx + dy = f, first calculate the determinant D = ad − bc. Then calculate Dx by replacing the x-column with the constants and Dy by replacing the y-column with the constants. The solutions are x = Dx/D and y = Dy/D, provided D is not zero."
    },

    {
        semester: "1",
        subject: "Linear Algebra",
        subjectCode: "BCA101",
        unit: "2",
        topic: "Rank of Matrix",
        questionType: "Short",
        difficulty: "Medium",
        marks: 3,
        question: "What is the rank of a matrix?",
        answer:
            "The rank of a matrix is the maximum number of linearly independent rows or columns in the matrix. It can be found by reducing the matrix to row echelon form and counting the number of non-zero rows. Rank is useful in determining the consistency of systems of linear equations and understanding the dimension of the row and column spaces."
    },

    // ===============================
    // UNIT 3 - VECTOR SPACES
    // ===============================

    {
        semester: "1",
        subject: "Linear Algebra",
        subjectCode: "BCA101",
        unit: "3",
        topic: "Vectors",
        questionType: "Short",
        difficulty: "Easy",
        marks: 2,
        question: "What is a vector?",
        answer:
            "A vector is a mathematical quantity that has magnitude and direction. Vectors can be represented using ordered components such as (x, y) in two dimensions or (x, y, z) in three dimensions. In linear algebra, vectors are fundamental objects used to represent points, directions, transformations, and elements of vector spaces."
    },

    {
        semester: "1",
        subject: "Linear Algebra",
        subjectCode: "BCA101",
        unit: "3",
        topic: "Linear Combination",
        questionType: "Short",
        difficulty: "Easy",
        marks: 2,
        question: "What is a linear combination of vectors?",
        answer:
            "A linear combination of vectors is an expression formed by multiplying vectors by scalar values and adding the results. For example, if v1 and v2 are vectors, then av1 + bv2 is a linear combination, where a and b are scalars. Linear combinations are used to determine whether vectors span a vector space and whether they are linearly dependent."
    },

    {
        semester: "1",
        subject: "Linear Algebra",
        subjectCode: "BCA101",
        unit: "3",
        topic: "Linear Independence",
        questionType: "Long",
        difficulty: "Medium",
        marks: 5,
        question: "Explain linear dependence and linear independence of vectors.",
        answer:
            "A set of vectors is linearly independent if the only solution of the equation c1v1 + c2v2 + ... + cnvn = 0 is c1 = c2 = ... = cn = 0. If there is a non-zero set of scalar values satisfying the equation, the vectors are linearly dependent. Linear independence is important for constructing bases and determining the dimension of a vector space."
    },

    {
        semester: "1",
        subject: "Linear Algebra",
        subjectCode: "BCA101",
        unit: "3",
        topic: "Basis",
        questionType: "Long",
        difficulty: "Hard",
        marks: 5,
        question: "Explain the concept of basis and dimension of a vector space.",
        answer:
            "A basis of a vector space is a set of vectors that is both linearly independent and spans the entire vector space. Every vector in the space can be represented as a unique linear combination of the basis vectors. The number of vectors in a basis is called the dimension of the vector space. For example, the standard basis of R² contains two vectors, so its dimension is 2."
    },

    // ===============================
    // UNIT 4 - LINEAR TRANSFORMATIONS
    // ===============================

    {
        semester: "1",
        subject: "Linear Algebra",
        subjectCode: "BCA101",
        unit: "4",
        topic: "Linear Transformation",
        questionType: "Short",
        difficulty: "Easy",
        marks: 2,
        question: "What is a linear transformation?",
        answer:
            "A linear transformation is a function between vector spaces that preserves vector addition and scalar multiplication. If T is a linear transformation, then T(u + v) = T(u) + T(v) and T(cu) = cT(u), where u and v are vectors and c is a scalar. Linear transformations are used to represent operations such as rotations, scaling, and projections."
    },

    {
        semester: "1",
        subject: "Linear Algebra",
        subjectCode: "BCA101",
        unit: "4",
        topic: "Kernel",
        questionType: "Short",
        difficulty: "Medium",
        marks: 3,
        question: "What is the kernel of a linear transformation?",
        answer:
            "The kernel of a linear transformation T consists of all vectors in the domain that are mapped to the zero vector in the codomain. Mathematically, the kernel is written as Ker(T) = {v : T(v) = 0}. The kernel provides important information about the transformation and is directly related to the rank-nullity theorem."
    },

    {
        semester: "1",
        subject: "Linear Algebra",
        subjectCode: "BCA101",
        unit: "4",
        topic: "Rank Nullity Theorem",
        questionType: "Long",
        difficulty: "Hard",
        marks: 5,
        question: "Explain the Rank-Nullity Theorem.",
        answer:
            "The Rank-Nullity Theorem states that for a linear transformation from a finite-dimensional vector space V to another vector space, the dimension of V is equal to the sum of the rank and nullity of the transformation. Rank represents the dimension of the image, while nullity represents the dimension of the kernel. Therefore, dim(V) = rank(T) + nullity(T)."
    },

    {
        semester: "1",
        subject: "Linear Algebra",
        subjectCode: "BCA101",
        unit: "4",
        topic: "Composition of Transformations",
        questionType: "Case Study",
        difficulty: "Hard",
        marks: 5,
        question: "A computer graphics application applies scaling followed by rotation to an object. Explain how composition of linear transformations can represent this process.",
        answer:
            "In computer graphics, scaling and rotation can be represented as linear transformations using matrices. If S represents the scaling transformation and R represents the rotation transformation, applying scaling first and rotation second can be represented by the composition R(S(v)). In matrix form, the combined transformation is represented by the product RS. This allows multiple geometric operations to be combined into a single matrix operation."
    },

    // ===============================
    // UNIT 5 - EIGENVALUES
    // ===============================

    {
        semester: "1",
        subject: "Linear Algebra",
        subjectCode: "BCA101",
        unit: "5",
        topic: "Eigenvalues",
        questionType: "Short",
        difficulty: "Easy",
        marks: 2,
        question: "What is an eigenvalue?",
        answer:
            "An eigenvalue is a scalar value associated with a square matrix for which there exists a non-zero vector that changes only by a scalar factor when the matrix operates on it. If Av = λv, then λ is called an eigenvalue and v is the corresponding eigenvector."
    },

    {
        semester: "1",
        subject: "Linear Algebra",
        subjectCode: "BCA101",
        unit: "5",
        topic: "Eigenvectors",
        questionType: "Short",
        difficulty: "Easy",
        marks: 2,
        question: "What is an eigenvector?",
        answer:
            "An eigenvector is a non-zero vector that changes only in magnitude, and possibly direction sign, when a matrix is applied to it. If A is a matrix and v is an eigenvector, then Av = λv, where λ is the corresponding eigenvalue. Eigenvectors are important in diagonalization, data analysis, and many mathematical applications."
    },

    {
        semester: "1",
        subject: "Linear Algebra",
        subjectCode: "BCA101",
        unit: "5",
        topic: "Characteristic Equation",
        questionType: "Long",
        difficulty: "Medium",
        marks: 5,
        question: "Explain the characteristic equation of a matrix.",
        answer:
            "The characteristic equation of a square matrix A is obtained by setting the determinant of A − λI equal to zero, where λ represents an unknown scalar and I is the identity matrix of the same order. The equation det(A − λI) = 0 is solved to find the eigenvalues of the matrix. Once the eigenvalues are known, corresponding eigenvectors can be calculated."
    },

    {
        semester: "1",
        subject: "Linear Algebra",
        subjectCode: "BCA101",
        unit: "5",
        topic: "Diagonalization",
        questionType: "Long",
        difficulty: "Hard",
        marks: 5,
        question: "Explain matrix diagonalization and its importance.",
        answer:
            "Matrix diagonalization is the process of expressing a square matrix A in the form A = PDP⁻¹, where D is a diagonal matrix and P contains eigenvectors of A as columns. A matrix can be diagonalized when it has a sufficient number of linearly independent eigenvectors. Diagonalization simplifies many matrix computations, including calculating powers of matrices, and has applications in differential equations, computer science, and data analysis."
    }

];

// ===============================
// REMOVE DUPLICATES
// ===============================

function createDuplicateKey(question) {
    return [
        question.subject,
        question.subjectCode,
        question.unit,
        question.topic,
        question.questionType,
        question.difficulty,
        question.question.trim().toLowerCase()
    ].join("|");
}

// ===============================
// MAIN FUNCTION
// ===============================

async function seedQuestions() {

    console.log("\n======================================");
    console.log(" QUESTION BANK SEEDER STARTED");
    console.log("======================================\n");

    try {

        await client.connect();

        console.log("MongoDB Connected Successfully!");

        const db = client.db(DATABASE_NAME);
        const collection = db.collection("questions");

        console.log("Database:", DATABASE_NAME);
        console.log("Collection: questions\n");

        // --------------------------------
        // Remove duplicate questions
        // --------------------------------

        const uniqueQuestions = [];
        const duplicateKeys = new Set();

        for (const question of questions) {

            const key = createDuplicateKey(question);

            if (!duplicateKeys.has(key)) {

                duplicateKeys.add(key);
                uniqueQuestions.push(question);

            }

        }

        console.log(
            "Questions received:",
            questions.length
        );

        console.log(
            "Unique questions:",
            uniqueQuestions.length
        );

        // --------------------------------
        // Check existing questions
        // --------------------------------

        let inserted = 0;
        let skipped = 0;

        for (const question of uniqueQuestions) {

            const existingQuestion = await collection.findOne({
                subject: question.subject,
                subjectCode: question.subjectCode,
                unit: question.unit,
                topic: question.topic,
                question: question.question
            });

            if (existingQuestion) {

                skipped++;

                console.log(
                    "SKIPPED DUPLICATE:",
                    question.question
                );

                continue;
            }

            await collection.insertOne({
                ...question,

                usedInPapers: [],

                createdAt: new Date(),
                updatedAt: new Date()
            });

            inserted++;

            console.log(
                "INSERTED:",
                question.question
            );
        }

        // --------------------------------
        // Final statistics
        // --------------------------------

        const totalQuestions = await collection.countDocuments();

        console.log("\n======================================");
        console.log(" IMPORT COMPLETED");
        console.log("======================================");

        console.log("Inserted :", inserted);
        console.log("Skipped  :", skipped);
        console.log("Total DB Questions :", totalQuestions);

        console.log("======================================\n");

    } catch (error) {

        console.error("\nERROR:", error);

    } finally {

        await client.close();

        console.log("MongoDB connection closed.");

    }
}

// ===============================
// RUN
// ===============================

seedQuestions();