const { MongoClient } = require("mongodb");

const MONGO_URI = "mongodb://127.0.0.1:27017";
const DB_NAME = "question_paper_generator";
const COLLECTION_NAME = "questions";

const SUBJECT = "Linear Algebra";
const SUBJECT_CODE = "BCA101";
const SEMESTER = 1;

// ======================================================
// LINEAR ALGEBRA TOPICS
// ======================================================

const TOPICS = [
    {
        unit: "Unit 1",
        topic: "Matrices",
        concepts: [
            "types of matrices",
            "matrix addition and subtraction",
            "scalar multiplication",
            "transpose of a matrix",
            "symmetric and skew-symmetric matrices"
        ]
    },
    {
        unit: "Unit 2",
        topic: "Determinants",
        concepts: [
            "determinant of a matrix",
            "properties of determinants",
            "minor and cofactor",
            "adjoint of a matrix",
            "inverse of a matrix"
        ]
    },
    {
        unit: "Unit 3",
        topic: "Systems of Linear Equations",
        concepts: [
            "matrix representation of linear equations",
            "Gaussian elimination",
            "Gauss-Jordan elimination",
            "consistent and inconsistent systems",
            "solution of simultaneous equations"
        ]
    },
    {
        unit: "Unit 4",
        topic: "Vectors",
        concepts: [
            "vector addition",
            "scalar multiplication of vectors",
            "linear combination",
            "linear independence",
            "basis and dimension"
        ]
    },
    {
        unit: "Unit 5",
        topic: "Eigenvalues and Eigenvectors",
        concepts: [
            "eigenvalues",
            "eigenvectors",
            "characteristic equation",
            "calculation of eigenvalues",
            "diagonalization"
        ]
    }
];

// ======================================================
// MARKS
// ======================================================

function getMarks(type) {
    const marks = {
        MCQ: 1,
        Short: 2,
        Long: 5,
        Numerical: 5,
        Programming: 5,
        "Case Study": 10
    };

    return marks[type];
}

// ======================================================
// QUESTION BUILDERS
// ======================================================

function buildQuestion(topicData, concept, type, difficulty, index) {

    const unit = topicData.unit;
    const topic = topicData.topic;

    let question;
    let answer;
    let explanation = "";
    let options = [];
    let correctAnswer = "";

    // ==================================================
    // MCQ
    // ==================================================

    if (type === "MCQ") {

        const mcqs = [
            {
                question: "Which of the following best describes a square matrix?",
                options: [
                    "A matrix having equal number of rows and columns",
                    "A matrix having only one row",
                    "A matrix having only one column",
                    "A matrix having no elements"
                ],
                answer: "A matrix having equal number of rows and columns",
                explanation:
                    "A square matrix has the same number of rows and columns. " +
                    "For example, a 2 × 2 or 3 × 3 matrix is a square matrix."
            },
            {
                question: "What is the transpose of a matrix?",
                options: [
                    "Matrix obtained by interchanging rows and columns",
                    "Matrix obtained by multiplying all elements by zero",
                    "Matrix obtained by deleting the diagonal",
                    "Matrix obtained by adding all elements"
                ],
                answer: "Matrix obtained by interchanging rows and columns",
                explanation:
                    "The transpose of a matrix is obtained by converting its rows into columns " +
                    "and its columns into rows."
            },
            {
                question: "When does the inverse of a square matrix exist?",
                options: [
                    "When its determinant is non-zero",
                    "When its determinant is always zero",
                    "Only when all elements are zero",
                    "Only when the matrix has one row"
                ],
                answer: "When its determinant is non-zero",
                explanation:
                    "A square matrix has an inverse only when its determinant is non-zero. " +
                    "Such a matrix is called a non-singular matrix."
            },
            {
                question: "What is an eigenvalue of a matrix?",
                options: [
                    "A scalar satisfying the characteristic equation",
                    "The number of rows in a matrix",
                    "The number of columns in a matrix",
                    "The sum of all matrix elements"
                ],
                answer: "A scalar satisfying the characteristic equation",
                explanation:
                    "Eigenvalues are scalar values obtained by solving the characteristic equation " +
                    "|A - λI| = 0."
            }
        ];

        const data = mcqs[index % mcqs.length];

        question = data.question;
        options = data.options;
        correctAnswer = data.answer;
        answer = data.answer;
        explanation = data.explanation;
    }

    // ==================================================
    // SHORT ANSWER
    // ==================================================

    else if (type === "Short") {

        const shortQuestions = [
            {
                q: "Define a matrix and explain its order with a suitable example.",
                a:
                    "A matrix is a rectangular arrangement of numbers or elements " +
                    "organized into rows and columns. The order of a matrix is written as " +
                    "m × n, where m represents the number of rows and n represents the number " +
                    "of columns. For example, the matrix [[1,2,3],[4,5,6]] has 2 rows and 3 columns, " +
                    "so its order is 2 × 3."
            },
            {
                q: "What is a symmetric matrix? Give its condition and an example.",
                a:
                    "A square matrix A is called symmetric if its transpose is equal to the matrix itself, " +
                    "that is, Aᵀ = A. In a symmetric matrix, the element at position aᵢⱼ is equal to " +
                    "the element at position aⱼᵢ. For example, [[2,3],[3,5]] is symmetric because its " +
                    "transpose is the same matrix."
            },
            {
                q: "What is a singular matrix? State the condition for a matrix to be singular.",
                a:
                    "A square matrix is called singular when its determinant is equal to zero. " +
                    "Therefore, the condition for a matrix A to be singular is det(A) = 0. " +
                    "A singular matrix does not have a unique inverse because its determinant is zero."
            },
            {
                q: "Define linear independence of vectors.",
                a:
                    "A set of vectors is called linearly independent if the only solution of their " +
                    "linear combination equal to the zero vector is the trivial solution, where all " +
                    "scalar coefficients are zero. If a non-zero set of coefficients can produce the " +
                    "zero vector, the vectors are linearly dependent."
            }
        ];

        const data = shortQuestions[index % shortQuestions.length];

        question = data.q;
        answer = data.a;

        explanation =
            "The answer should clearly state the definition, mathematical condition " +
            "and a suitable example whenever applicable.";
    }

    // ==================================================
    // LONG ANSWER
    // ==================================================

    else if (type === "Long") {

        const longQuestions = [
            {
                q: "Explain the inverse of a matrix using the adjoint method. State the conditions and procedure with a suitable example.",
                a:
                    "The inverse of a square matrix A is a matrix A⁻¹ such that AA⁻¹ = A⁻¹A = I, " +
                    "where I is the identity matrix of the same order. The inverse exists only when " +
                    "the determinant of A is non-zero.\n\n" +

                    "For finding the inverse using the adjoint method, the following steps are used:\n\n" +

                    "1. Calculate the determinant |A| of the given square matrix.\n" +
                    "2. If |A| = 0, the matrix is singular and its inverse does not exist.\n" +
                    "3. Find the minor corresponding to every element of the matrix.\n" +
                    "4. Convert the minors into cofactors using the appropriate signs.\n" +
                    "5. Form the cofactor matrix.\n" +
                    "6. Take the transpose of the cofactor matrix to obtain adj(A), the adjoint of A.\n" +
                    "7. Use the formula:\n\n" +
                    "A⁻¹ = adj(A) / |A|\n\n" +

                    "For example, consider A = [[2,1],[1,1]]. Its determinant is " +
                    "(2×1) - (1×1) = 1, which is non-zero. Therefore, the inverse exists. " +
                    "The cofactor matrix is [[1,-1],[-1,2]], and since it is symmetric, its transpose " +
                    "is also [[1,-1],[-1,2]]. Hence,\n\n" +

                    "A⁻¹ = [[1,-1],[-1,2]] / 1\n\n" +

                    "Therefore, A⁻¹ = [[1,-1],[-1,2]]. This method provides a systematic way of " +
                    "finding the inverse of a square matrix and is particularly useful for small matrices."
            },
            {
                q: "Explain Gaussian elimination for solving a system of linear equations with a suitable example.",
                a:
                    "Gaussian elimination is a systematic method for solving simultaneous linear equations. " +
                    "The method converts the coefficient matrix into an upper triangular or row-echelon form " +
                    "using elementary row operations.\n\n" +

                    "The main steps are:\n\n" +

                    "1. Write the equations in augmented matrix form.\n" +
                    "2. Select a suitable pivot element.\n" +
                    "3. Use elementary row operations to make the entries below the pivot zero.\n" +
                    "4. Continue the process for the remaining rows and columns.\n" +
                    "5. Once the matrix is in upper triangular form, use back substitution to obtain the unknowns.\n\n" +

                    "Consider the equations:\n" +
                    "x + y = 5\n" +
                    "x - y = 1\n\n" +

                    "Their augmented matrix is [[1,1,5],[1,-1,1]].\n\n" +

                    "Apply R₂ → R₂ - R₁. The second row becomes [0,-2,-4]. " +
                    "Therefore, -2y = -4 and y = 2. Substituting y = 2 into x + y = 5 gives x = 3.\n\n" +

                    "Hence, the solution is x = 3 and y = 2. " +
                    "Gaussian elimination is useful because it provides a systematic procedure for solving " +
                    "systems containing several equations and unknowns."
            },
            {
                q: "Explain eigenvalues and eigenvectors and describe the procedure for finding them.",
                a:
                    "For a square matrix A, a non-zero vector X is called an eigenvector if it satisfies " +
                    "AX = λX, where λ is a scalar called the eigenvalue corresponding to X.\n\n" +

                    "To find eigenvalues, the equation AX = λX is rearranged as:\n\n" +

                    "(A - λI)X = 0\n\n" +

                    "For a non-zero solution X to exist, the determinant must be zero:\n\n" +

                    "|A - λI| = 0\n\n" +

                    "This equation is called the characteristic equation. Solving it gives the eigenvalues.\n\n" +

                    "After obtaining an eigenvalue λ, substitute it into (A - λI)X = 0 and solve the resulting " +
                    "system of equations to obtain the corresponding eigenvector.\n\n" +

                    "For example, for a diagonal matrix A = [[2,0],[0,3]], the characteristic equation is " +
                    "(2 - λ)(3 - λ) = 0. Therefore, the eigenvalues are λ = 2 and λ = 3. " +
                    "The corresponding eigenvectors are obtained by substituting each eigenvalue into the " +
                    "matrix equation. Eigenvalues and eigenvectors are important in diagonalization, " +
                    "differential equations, data analysis and many engineering applications."
            }
        ];

        const data = longQuestions[index % longQuestions.length];

        question = data.q;
        answer = data.a;

        explanation =
            "This is a 5-mark long-answer question. The answer includes the definition, " +
            "mathematical condition, procedure, example and conclusion.";
    }

    // ==================================================
    // NUMERICAL
    // ==================================================

    else if (type === "Numerical") {

        const numericalQuestions = [
            {
                q: "Find the determinant and inverse of A = [[2,1],[1,1]]. Show all steps.",
                a:
                    "Given:\n" +
                    "A = [[2,1],[1,1]]\n\n" +

                    "Step 1: Find the determinant.\n" +
                    "|A| = (2×1) - (1×1)\n" +
                    "|A| = 2 - 1\n" +
                    "|A| = 1\n\n" +

                    "Since |A| ≠ 0, the inverse exists.\n\n" +

                    "Step 2: For a 2×2 matrix [[a,b],[c,d]],\n" +
                    "A⁻¹ = 1/(ad-bc) × [[d,-b],[-c,a]]\n\n" +

                    "Therefore,\n" +
                    "A⁻¹ = 1/1 × [[1,-1],[-1,2]]\n\n" +

                    "Hence,\n" +
                    "A⁻¹ = [[1,-1],[-1,2]].\n\n" +

                    "Final Answer:\n" +
                    "Determinant = 1\n" +
                    "Inverse = [[1,-1],[-1,2]]"
            },
            {
                q: "Solve the simultaneous equations x + y = 5 and x - y = 1 using the elimination method.",
                a:
                    "Given equations:\n" +
                    "x + y = 5 ...(1)\n" +
                    "x - y = 1 ...(2)\n\n" +

                    "Add equations (1) and (2):\n" +
                    "(x + y) + (x - y) = 5 + 1\n" +
                    "2x = 6\n" +
                    "x = 3\n\n" +

                    "Substitute x = 3 into equation (1):\n" +
                    "3 + y = 5\n" +
                    "y = 2\n\n" +

                    "Therefore, the solution is:\n" +
                    "x = 3 and y = 2."
            },
            {
                q: "Find the eigenvalues of the diagonal matrix A = [[4,0],[0,7]].",
                a:
                    "For eigenvalues, solve:\n" +
                    "|A - λI| = 0\n\n" +

                    "Given:\n" +
                    "A = [[4,0],[0,7]]\n\n" +

                    "Therefore:\n" +
                    "A - λI = [[4-λ,0],[0,7-λ]]\n\n" +

                    "The determinant is:\n" +
                    "(4-λ)(7-λ) = 0\n\n" +

                    "Therefore:\n" +
                    "4 - λ = 0  or  7 - λ = 0\n\n" +

                    "Hence:\n" +
                    "λ₁ = 4\n" +
                    "λ₂ = 7\n\n" +

                    "Final Answer: The eigenvalues are 4 and 7."
            }
        ];

        const data = numericalQuestions[index % numericalQuestions.length];

        question = data.q;
        answer = data.a;

        explanation =
            "The complete calculation is shown from the given information " +
            "through the mathematical procedure to the final answer.";
    }

    // ==================================================
    // PROGRAMMING
    // ==================================================

    else if (type === "Programming") {

        question =
            "Write a C++ program to calculate the transpose of a matrix. " +
            "The program should accept the matrix from the user, display the original matrix, " +
            "and then display its transpose. Explain the algorithm and logic.";

        answer =
            "Algorithm:\n\n" +
            "1. Read the number of rows and columns.\n" +
            "2. Read all matrix elements.\n" +
            "3. Display the original matrix.\n" +
            "4. For every element at position [i][j], place it at [j][i] in the transpose.\n" +
            "5. Display the resulting transpose matrix.\n\n" +

            "C++ Program:\n\n" +
            "```cpp\n" +
            "#include <iostream>\n" +
            "using namespace std;\n\n" +
            "int main() {\n" +
            "    int a[10][10], rows, cols;\n\n" +
            "    cout << \"Enter rows and columns: \";\n" +
            "    cin >> rows >> cols;\n\n" +
            "    cout << \"Enter matrix elements:\\n\";\n" +
            "    for (int i = 0; i < rows; i++) {\n" +
            "        for (int j = 0; j < cols; j++) {\n" +
            "            cin >> a[i][j];\n" +
            "        }\n" +
            "    }\n\n" +
            "    cout << \"Transpose:\\n\";\n" +
            "    for (int j = 0; j < cols; j++) {\n" +
            "        for (int i = 0; i < rows; i++) {\n" +
            "            cout << a[i][j] << \" \";\n" +
            "        }\n" +
            "        cout << endl;\n" +
            "    }\n\n" +
            "    return 0;\n" +
            "}\n" +
            "```\n\n" +

            "Explanation:\n" +
            "The nested loops first read the matrix row by row. " +
            "To display the transpose, the column index is processed as the outer loop " +
            "and the row index as the inner loop. Therefore, rows become columns and " +
            "columns become rows.\n\n" +

            "For example, if the input matrix is:\n" +
            "1 2 3\n" +
            "4 5 6\n\n" +

            "the transpose is:\n" +
            "1 4\n" +
            "2 5\n" +
            "3 6."
    ;

        explanation =
            "The programming answer contains the algorithm, complete C++ code, " +
            "logic and an example of the expected result.";
    }

    // ==================================================
    // CASE STUDY
    // ==================================================

    else if (type === "Case Study") {

        question =
            "Case Study: A university examination system stores marks of students in a matrix. " +
            "The administration wants to calculate the average performance of students in different subjects " +
            "and compare the results. Explain how matrices can be used to represent the data and describe " +
            "a suitable mathematical approach for analyzing it.";

        answer =
            "Analysis:\n\n" +

            "The given problem involves organizing a large amount of numerical information. " +
            "A matrix is suitable because it can represent data systematically using rows and columns.\n\n" +

            "Representation:\n" +
            "Each row can represent one student, while each column can represent one subject. " +
            "For example, if there are three students and four subjects, the marks can be represented " +
            "using a 3 × 4 matrix.\n\n" +

            "Mathematical Processing:\n" +
            "The values in each row can be added to calculate the total marks obtained by a student. " +
            "Similarly, column-wise calculations can be performed to determine the total or average " +
            "marks obtained in each subject.\n\n" +

            "For example, consider:\n" +
            "A = [[80,70,75], [60,65,70], [90,85,88]]\n\n" +

            "The first row represents the marks of the first student in three subjects. " +
            "The total for the first student is 80 + 70 + 75 = 225. " +
            "The average is 225 / 3 = 75.\n\n" +

            "The same procedure can be applied to other rows. Column-wise analysis can also be used " +
            "to compare performance across subjects.\n\n" +

            "Conclusion:\n" +
            "Matrices provide an efficient mathematical structure for storing and processing tabular data. " +
            "They allow row-wise and column-wise operations and can therefore be used to analyze student " +
            "performance in an organized and systematic manner."
        ;

        explanation =
            "The case study requires application of the matrix concept to a realistic data-analysis situation. " +
            "The answer explains representation, calculation and conclusion.";
    }

    return {
        semester: SEMESTER,
        subject: SUBJECT,
        subjectCode: SUBJECT_CODE,
        unit,
        topic,
        questionType: type,
        difficulty,
        marks: getMarks(type),
        question,
        answer,
        options,
        correctAnswer,
        explanation,
        usedInPapers: [],
        generatedBy: "Linear Algebra Subject Specific Generator",
        generatorMode: "QUALITY_TEST",
        createdAt: new Date(),
        updatedAt: new Date()
    };
}

// ======================================================
// DUPLICATE KEY
// ======================================================

function makeDuplicateKey(q) {

    return [
        q.subject,
        q.subjectCode,
        q.unit,
        q.topic,
        q.questionType,
        q.difficulty,
        q.question
    ]
        .join("|")
        .toLowerCase();
}

// ======================================================
// TEST DISTRIBUTION
// ======================================================

const TEST_DISTRIBUTION = [
    { type: "MCQ", difficulty: "Easy", count: 10 },
    { type: "MCQ", difficulty: "Medium", count: 5 },

    { type: "Short", difficulty: "Easy", count: 5 },
    { type: "Short", difficulty: "Medium", count: 5 },

    { type: "Long", difficulty: "Medium", count: 5 },
    { type: "Long", difficulty: "Hard", count: 5 },

    { type: "Numerical", difficulty: "Medium", count: 3 },
    { type: "Numerical", difficulty: "Hard", count: 2 },

    { type: "Programming", difficulty: "Medium", count: 2 },
    { type: "Programming", difficulty: "Hard", count: 1 },

    { type: "Case Study", difficulty: "Hard", count: 2 }
];

// ======================================================
// MAIN
// ======================================================

async function main() {

    const client = new MongoClient(MONGO_URI);

    try {

        await client.connect();

        console.log("MongoDB Connected Successfully!");
        console.log("");

        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTION_NAME);

        console.log("==============================================");
        console.log("LINEAR ALGEBRA QUALITY TEST GENERATOR");
        console.log("==============================================");
        console.log("Subject      : Linear Algebra");
        console.log("Subject Code : BCA101");
        console.log("Semester     : 1");
        console.log("Target       : 50 questions");
        console.log("");

        const existingQuestions = await collection
            .find({
                subject: SUBJECT,
                subjectCode: SUBJECT_CODE
            })
            .toArray();

        const existingKeys = new Set(
            existingQuestions.map(makeDuplicateKey)
        );

        console.log(
            `Existing Questions : ${existingQuestions.length}`
        );

        let inserted = 0;
        let skipped = 0;
        let index = 0;

        for (const item of TEST_DISTRIBUTION) {

            for (let i = 0; i < item.count; i++) {

                const topicData =
                    TOPICS[index % TOPICS.length];

                const concept =
                    topicData.concepts[
                        index % topicData.concepts.length
                    ];

                const question = buildQuestion(
                    topicData,
                    concept,
                    item.type,
                    item.difficulty,
                    index
                );

                const key = makeDuplicateKey(question);

                if (existingKeys.has(key)) {

                    skipped++;
                    index++;

                    continue;
                }

                await collection.insertOne(question);

                existingKeys.add(key);

                inserted++;

                console.log(
                    `INSERTED ${String(inserted).padStart(2, "0")} | ` +
                    `${item.type.padEnd(12)} | ` +
                    `${item.difficulty.padEnd(6)} | ` +
                    `${topicData.topic}`
                );

                index++;
            }
        }

        const finalCount = await collection.countDocuments({
            subject: SUBJECT,
            subjectCode: SUBJECT_CODE
        });

        console.log("");
        console.log("==============================================");
        console.log("GENERATION COMPLETED");
        console.log("==============================================");
        console.log(`Target       : 50`);
        console.log(`Inserted     : ${inserted}`);
        console.log(`Duplicates   : ${skipped}`);
        console.log(`Total in DB  : ${finalCount}`);
        console.log("==============================================");

    } catch (error) {

        console.error("");
        console.error("ERROR:", error);

    } finally {

        await client.close();

        console.log("");
        console.log("MongoDB connection closed.");
    }
}

main();