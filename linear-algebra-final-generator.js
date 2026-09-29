const { MongoClient } = require("mongodb");

/*
  LINEAR ALGEBRA FINAL QUALITY GENERATOR

  Target:
  MCQ         = 25
  Short       = 25
  Long        = 20
  Numerical   = 15
  Programming = 10
  Case Study  = 5

  Difficulty:
  Easy   = 30
  Medium = 40
  Hard   = 30

  IMPORTANT:
  First run SAFE MODE mein hoga.
  Existing database questions delete nahi honge.
*/

const MONGO_URI = "mongodb://127.0.0.1:27017";
const DB_NAME = "question_paper_generator";
const COLLECTION = "questions";

const SUBJECT = "Linear Algebra";
const SUBJECT_CODE = "MAT201";
const SEMESTER = "Semester 1";

const TARGET_TYPES = {
    MCQ: 25,
    Short: 25,
    Long: 20,
    Numerical: 15,
    Programming: 10,
    "Case Study": 5
};

const TARGET_DIFFICULTY = {
    Easy: 30,
    Medium: 40,
    Hard: 30
};

const topics = {
    1: [
        "Types of Matrices",
        "Matrix Algebra",
        "Matrix Operations"
    ],
    2: [
        "Determinants",
        "Inverse of a Matrix",
        "Rank of a Matrix"
    ],
    3: [
        "Systems of Linear Equations",
        "Gaussian Elimination",
        "Gauss-Jordan Method"
    ],
    4: [
        "Vector Spaces",
        "Linear Dependence and Independence",
        "Basis and Dimension"
    ],
    5: [
        "Eigenvalues and Eigenvectors",
        "Diagonalization",
        "Applications of Eigenvalues"
    ]
};

function createQuestion(
    type,
    difficulty,
    unit,
    topic,
    marks,
    question,
    answer,
    options = [],
    correctAnswer = "",
    explanation = ""
) {
    return {
        subject: SUBJECT,
        subjectCode: SUBJECT_CODE,
        semester: SEMESTER,
        unit: `Unit ${unit}`,
        topic,
        questionType: type,
        difficulty,
        marks,
        question,
        answer,
        options,
        correctAnswer,
        explanation,
        usedInPapers: [],
        createdAt: new Date(),
        updatedAt: new Date()
    };
}

const questions = [];

/* =========================================================
   MCQ - 25 QUESTIONS
   ========================================================= */

questions.push(
createQuestion(
"MCQ","Easy",1,"Types of Matrices",1,
"What is the order of a matrix having 3 rows and 4 columns?",
"The order of the matrix is 3 × 4.",
["3 × 4","4 × 3","3 + 4","12 × 1"],
"3 × 4",
"The order of a matrix is written as number of rows × number of columns."
));

questions.push(
createQuestion(
"MCQ","Easy",1,"Types of Matrices",1,
"Which matrix has all its elements equal to zero?",
"It is called a zero matrix or null matrix.",
["Identity matrix","Zero matrix","Scalar matrix","Diagonal matrix"],
"Zero matrix",
"A zero matrix contains zero at every position."
));

questions.push(
createQuestion(
"MCQ","Easy",1,"Matrix Algebra",1,
"When can two matrices be added?",
"Two matrices can be added when they have the same order.",
["Same order","Same determinant","Same rank","Both must be square"],
"Same order",
"Matrix addition is performed between corresponding elements, so both matrices must have equal dimensions."
));

questions.push(
createQuestion(
"MCQ","Easy",1,"Types of Matrices",1,
"Which matrix has 1s on the main diagonal and 0s elsewhere?",
"It is called an identity matrix.",
["Identity matrix","Zero matrix","Row matrix","Column matrix"],
"Identity matrix",
"The identity matrix contains 1 on the principal diagonal and 0 everywhere else."
));

questions.push(
createQuestion(
"MCQ","Easy",1,"Matrix Algebra",1,
"If A is a 2 × 3 matrix and B is a 3 × 4 matrix, what is the order of AB?",
"The order of AB is 2 × 4.",
["2 × 4","3 × 3","4 × 2","2 × 3"],
"2 × 4",
"The inner dimensions are equal, so multiplication is possible and the outer dimensions determine the result."
));

questions.push(
createQuestion(
"MCQ","Medium",1,"Matrix Algebra",1,
"Which property is generally not satisfied by matrix multiplication?",
"Matrix multiplication is generally not commutative.",
["Associative","Distributive","Commutative","Closure"],
"Commutative",
"In general AB is not equal to BA."
));

questions.push(
createQuestion(
"MCQ","Medium",1,"Types of Matrices",1,
"A square matrix A satisfying Aᵀ = A is called what?",
"It is called a symmetric matrix.",
["Symmetric","Skew-symmetric","Orthogonal","Singular"],
"Symmetric",
"A matrix is symmetric when it is equal to its transpose."
));

questions.push(
createQuestion(
"MCQ","Medium",1,"Types of Matrices",1,
"A square matrix satisfying Aᵀ = −A is called what?",
"It is called a skew-symmetric matrix.",
["Symmetric","Skew-symmetric","Identity","Scalar"],
"Skew-symmetric",
"A skew-symmetric matrix is equal to the negative of its transpose."
));

questions.push(
createQuestion(
"MCQ","Medium",1,"Matrix Algebra",1,
"If A is an identity matrix, what is A²?",
"A² = A = I.",
["0","I","2I","−I"],
"I",
"The identity matrix is unchanged when multiplied by itself."
));

questions.push(
createQuestion(
"MCQ","Medium",1,"Matrix Algebra",1,
"What is the result of A + 0 for a matrix A?",
"The result is A.",
["A","0","I","2A"],
"A",
"The zero matrix is the additive identity."
));

questions.push(
createQuestion(
"MCQ","Medium",2,"Determinants",1,
"For A = [[a,b],[c,d]], what is det(A)?",
"The determinant is ad − bc.",
["ad − bc","ac − bd","ab − cd","ad + bc"],
"ad − bc",
"The determinant of a 2 × 2 matrix is the product of the main diagonal minus the product of the other diagonal."
));

questions.push(
createQuestion(
"MCQ","Easy",2,"Determinants",1,
"If det(A) = 0, what type of matrix is A?",
"A is a singular matrix.",
["Singular","Identity","Orthogonal","Non-square"],
"Singular",
"A square matrix is singular when its determinant is zero."
));

questions.push(
createQuestion(
"MCQ","Medium",2,"Inverse of a Matrix",1,
"When does a square matrix have an inverse?",
"When its determinant is non-zero.",
["det(A)=0","det(A)≠0","rank(A)=0","A is rectangular"],
"det(A)≠0",
"A square matrix is invertible exactly when its determinant is non-zero."
));

questions.push(
createQuestion(
"MCQ","Medium",2,"Rank of a Matrix",1,
"What does the rank of a matrix represent?",
"It represents the maximum number of linearly independent rows or columns.",
["Dependent rows","Independent rows or columns","Zero rows","Equal rows"],
"Independent rows or columns",
"Rank measures the maximum number of linearly independent rows or columns."
));

questions.push(
createQuestion(
"MCQ","Hard",2,"Rank of a Matrix",1,
"What is the rank of a 3 × 3 identity matrix?",
"The rank is 3.",
["0","1","2","3"],
"3",
"All three rows of the identity matrix are linearly independent."
));

questions.push(
createQuestion(
"MCQ","Easy",3,"Systems of Linear Equations",1,
"What is the coefficient matrix of x + 2y = 5 and 3x + y = 7?",
"The coefficient matrix is [[1,2],[3,1]].",
["[[1,2],[3,1]]","[[5,7],[1,3]]","[[1,3],[2,1]]","[[x,y],[5,7]]"],
"[[1,2],[3,1]]",
"The coefficient matrix contains the coefficients of the variables."
));

questions.push(
createQuestion(
"MCQ","Easy",3,"Gaussian Elimination",1,
"Which operation is allowed in Gaussian elimination?",
"Adding a multiple of one row to another row is an elementary row operation.",
["Changing variable names","Adding a multiple of one row to another","Changing matrix order","Deleting a row"],
"Adding a multiple of one row to another",
"Elementary row operations preserve the solution information of a linear system."
));

questions.push(
createQuestion(
"MCQ","Medium",3,"Systems of Linear Equations",1,
"When is a system of linear equations called consistent?",
"When it has at least one solution.",
["When it has no solution","When it has at least one solution","Only when it has integer solutions","Only when it has one equation"],
"When it has at least one solution",
"A consistent system has one or more solutions."
));

questions.push(
createQuestion(
"MCQ","Hard",3,"Gaussian Elimination",1,
"If rank(A) = rank([A|B]) = number of unknowns, what type of solution exists?",
"The system has a unique solution.",
["No solution","Unique solution","Infinitely many solutions","No variables"],
"Unique solution",
"When both ranks equal the number of unknowns, every variable has a unique value."
));

questions.push(
createQuestion(
"MCQ","Easy",4,"Vector Spaces",1,
"Which operation is essential in a vector space besides vector addition?",
"Scalar multiplication.",
["Matrix inversion","Scalar multiplication","Determinant calculation","Differentiation"],
"Scalar multiplication",
"A vector space must be closed under vector addition and scalar multiplication."
));

questions.push(
createQuestion(
"MCQ","Medium",4,"Linear Dependence and Independence",1,
"When are vectors linearly dependent?",
"When a non-zero combination of them produces the zero vector.",
["When every vector is zero","When a non-zero combination gives zero","When they have different dimensions","When their determinants are positive"],
"When a non-zero combination gives zero",
"Linear dependence means there is at least one non-trivial relation among the vectors."
));

questions.push(
createQuestion(
"MCQ","Medium",4,"Basis and Dimension",1,
"What does the dimension of a finite-dimensional vector space represent?",
"The number of vectors in any basis of the space.",
["Number of matrices","Number of basis vectors","Number of equations","Number of determinants"],
"Number of basis vectors",
"Every basis of a finite-dimensional vector space has the same number of vectors."
));

questions.push(
createQuestion(
"MCQ","Easy",5,"Eigenvalues and Eigenvectors",1,
"For an eigenvector v of A with eigenvalue λ, which equation is true?",
"Av = λv.",
["Av=v+λ","Av=λv","Aλ=v","A+v=λ"],
"Av=λv",
"An eigenvector is transformed into a scalar multiple of itself."
));

questions.push(
createQuestion(
"MCQ","Medium",5,"Eigenvalues and Eigenvectors",1,
"Which equation is used to find eigenvalues?",
"The characteristic equation det(A − λI) = 0 is used.",
["det(A)=1","det(A−λI)=0","Aλ=I","det(A)+λ=0"],
"det(A−λI)=0",
"The roots of the characteristic equation are the eigenvalues."
));

/* =========================================================
   SHORT - 25 QUESTIONS
   ========================================================= */

questions.push(
createQuestion(
"Short","Easy",1,"Types of Matrices",2,
"Define a square matrix and give an example.",
"A square matrix has the same number of rows and columns. Therefore, its order is n × n for some positive integer n. For example, [[2,1],[4,3]] is a 2 × 2 square matrix. Square matrices are important because determinant, inverse and eigenvalue operations are normally defined for square matrices."
));

questions.push(
createQuestion(
"Short","Easy",1,"Matrix Algebra",2,
"Explain matrix addition with an example.",
"Matrix addition is performed by adding corresponding elements of two matrices having the same order. For example, if A=[[1,2],[3,4]] and B=[[5,6],[7,8]], then A+B=[[6,8],[10,12]]. The order of the resulting matrix remains the same as the two original matrices. Addition cannot be performed when the dimensions are different."
));

questions.push(
createQuestion(
"Short","Medium",1,"Matrix Algebra",2,
"Differentiate between scalar multiplication and matrix multiplication.",
"Scalar multiplication means multiplying every element of a matrix by the same scalar value. Matrix multiplication is different because rows of the first matrix are multiplied with columns of the second matrix and the products are added. Matrix multiplication also requires compatible dimensions. Unlike scalar multiplication, matrix multiplication is generally not commutative."
));

questions.push(
createQuestion(
"Short","Medium",1,"Types of Matrices",2,
"What is a diagonal matrix? Give an example.",
"A diagonal matrix is a square matrix in which all elements outside the principal diagonal are zero. For example, [[3,0,0],[0,5,0],[0,0,7]] is a diagonal matrix. The diagonal entries can be zero or non-zero. Diagonal matrices make many calculations such as determinant and matrix powers easier."
));

questions.push(
createQuestion(
"Short","Hard",1,"Matrix Algebra",2,
"Why is matrix multiplication generally not commutative?",
"Matrix multiplication is generally not commutative because AB and BA can produce different results. For example, let A=[[1,1],[0,1]] and B=[[1,0],[1,1]]. Then AB=[[2,1],[1,1]], whereas BA=[[1,1],[1,2]]. Since AB is not equal to BA, matrix multiplication does not generally satisfy the commutative property."
));

questions.push(
createQuestion(
"Short","Easy",2,"Determinants",2,
"Define the determinant of a 2 × 2 matrix.",
"For A=[[a,b],[c,d]], the determinant is det(A)=ad−bc. It is a scalar value associated with a square matrix. If the determinant is zero, the matrix is singular and has no ordinary inverse. If the determinant is non-zero, the matrix is non-singular and its inverse exists."
));

questions.push(
createQuestion(
"Short","Medium",2,"Determinants",2,
"State four important properties of determinants.",
"Four important properties are: interchanging two rows changes the sign of the determinant; if two rows are identical, the determinant is zero; multiplying a row by k multiplies the determinant by k; and adding a multiple of one row to another does not change the determinant. These properties help simplify determinant calculations."
));

questions.push(
createQuestion(
"Short","Medium",2,"Inverse of a Matrix",2,
"Explain when a square matrix is invertible.",
"A square matrix A is invertible if there exists a matrix A⁻¹ such that AA⁻¹=A⁻¹A=I. The necessary and sufficient condition is det(A)≠0. If det(A)=0, the matrix is singular and its inverse does not exist. The inverse can be used to solve matrix equations and systems of linear equations."
));

questions.push(
createQuestion(
"Short","Hard",2,"Rank of a Matrix",2,
"Explain the rank of a matrix using row-reduced form.",
"The rank of a matrix is the number of non-zero rows in its row-echelon or reduced row-echelon form. Elementary row operations do not change the rank. For example, if a 3 × 3 matrix is reduced to a form containing two non-zero rows and one zero row, its rank is 2. Rank represents the number of independent rows or columns."
));

questions.push(
createQuestion(
"Short","Easy",3,"Systems of Linear Equations",2,
"What is a system of linear equations?",
"A system of linear equations is a group of equations involving the same variables where each variable has degree one. For example, x+y=5 and 2x−y=1 form a system of two linear equations. A solution is a set of values that satisfies every equation simultaneously. Such systems can be solved using elimination, substitution or matrix methods."
));

questions.push(
createQuestion(
"Short","Medium",3,"Gaussian Elimination",2,
"What is Gaussian elimination?",
"Gaussian elimination is a method for solving systems of linear equations by applying elementary row operations to the augmented matrix. The objective is to convert the matrix into row-echelon form. After this conversion, the equations are solved using back substitution. The method is systematic and can also be used to determine rank and consistency."
));

questions.push(
createQuestion(
"Short","Medium",3,"Gauss-Jordan Method",2,
"How does Gauss-Jordan elimination differ from Gaussian elimination?",
"Gaussian elimination normally converts a matrix to row-echelon form and then uses back substitution. Gauss-Jordan elimination continues the process until reduced row-echelon form is obtained. Each pivot becomes 1 and all other entries in its column become zero. Therefore, Gauss-Jordan can give the solution directly without a separate back-substitution step."
));

questions.push(
createQuestion(
"Short","Hard",3,"Systems of Linear Equations",2,
"Explain the conditions for no solution and infinitely many solutions.",
"For AX=B, compare rank(A) with rank([A|B]). If rank(A)<rank([A|B]), the system is inconsistent and has no solution. If rank(A)=rank([A|B])<n, where n is the number of unknowns, the system has infinitely many solutions. If both ranks equal n, the system has a unique solution."
));

questions.push(
createQuestion(
"Short","Easy",4,"Vector Spaces",2,
"Define a vector space.",
"A vector space is a set of vectors together with vector addition and scalar multiplication satisfying specific algebraic rules. It contains the zero vector and additive inverses and is closed under both addition and scalar multiplication. Examples include R² and R³. Vector spaces provide a common mathematical framework for studying vectors, matrices and linear transformations."
));

questions.push(
createQuestion(
"Short","Medium",4,"Linear Dependence and Independence",2,
"Differentiate between linearly dependent and independent vectors.",
"Vectors are linearly independent if the equation c1v1+...+cnvn=0 has only the trivial solution where all coefficients are zero. They are dependent if a non-trivial combination produces the zero vector. A dependent vector can usually be represented using the other vectors, while an independent set contains no redundant vector."
));

questions.push(
createQuestion(
"Short","Medium",4,"Basis and Dimension",2,
"What is a basis of a vector space?",
"A basis is a set of vectors that is both linearly independent and spanning. Every vector in the space can be represented as a linear combination of the basis vectors. For R², the standard basis is {(1,0),(0,1)}. The number of vectors in a basis is called the dimension of the vector space."
));

questions.push(
createQuestion(
"Short","Hard",4,"Basis and Dimension",2,
"Explain the span of a set of vectors.",
"The span of vectors is the set of all possible linear combinations of those vectors. For example, span{(1,0),(0,1)} contains every vector (x,y) in R² because (x,y)=x(1,0)+y(0,1). Span is useful for determining whether vectors generate a space. A basis is a linearly independent set whose span is the complete vector space."
));

questions.push(
createQuestion(
"Short","Easy",5,"Eigenvalues and Eigenvectors",2,
"Define eigenvalue and eigenvector.",
"For a square matrix A, a non-zero vector v is called an eigenvector if Av=λv for some scalar λ. The scalar λ is called the corresponding eigenvalue. The matrix changes the eigenvector only by scaling it. Eigenvalues are normally found from the characteristic equation det(A−λI)=0."
));

questions.push(
createQuestion(
"Short","Medium",5,"Eigenvalues and Eigenvectors",2,
"Describe the characteristic equation.",
"The characteristic equation of an n × n matrix A is det(A−λI)=0. Here I is the identity matrix and λ is an unknown scalar. Expanding the determinant produces a polynomial in λ. The roots of this polynomial are the eigenvalues of the matrix. Each eigenvalue can then be used to calculate its eigenvectors."
));

questions.push(
createQuestion(
"Short","Medium",5,"Diagonalization",2,
"What is diagonalization of a matrix?",
"Diagonalization expresses a square matrix in the form A=PDP⁻¹, where D is diagonal and P contains linearly independent eigenvectors as columns. A matrix is diagonalizable when it has enough independent eigenvectors. Diagonalization is useful because powers of A can then be calculated using the simpler diagonal matrix D."
));

questions.push(
createQuestion(
"Short","Hard",5,"Eigenvalues and Eigenvectors",2,
"What is the relationship between eigenvalues and determinant?",
"The determinant of a square matrix equals the product of its eigenvalues, including multiplicity. Therefore, if zero is an eigenvalue, the determinant is zero and the matrix is singular. Conversely, if the determinant is non-zero, zero cannot be an eigenvalue. This relationship follows from the characteristic polynomial."
));

questions.push(
createQuestion(
"Short","Hard",2,"Inverse of a Matrix",2,
"Explain the adjoint method for finding the inverse.",
"For a non-singular square matrix, A⁻¹=adj(A)/det(A). First calculate the determinant, then find the minors and cofactors of all elements. Arrange the cofactors into the cofactor matrix and transpose it to obtain adj(A). Finally divide every element of the adjoint by det(A). The method is valid only when the determinant is non-zero."
));

questions.push(
createQuestion(
"Short","Hard",3,"Systems of Linear Equations",2,
"Explain the matrix form of a system of linear equations.",
"A system can be represented as AX=B, where A is the coefficient matrix, X is the column matrix containing unknowns and B is the constant matrix. For example, 2x+y=5 and x−y=1 can be written using a 2×2 coefficient matrix. This representation allows methods such as Gaussian elimination, inverse method and rank analysis to be applied systematically."
));
/* =========================================================
   PART 2 - COMPLETE REMAINING QUESTIONS
   ========================================================= */

/* =========================================================
   SHORT - FINAL 1 QUESTION
   ========================================================= */

questions.push(
createQuestion(
"Short","Hard",2,"Determinants",2,
"Explain how elementary row operations affect a determinant.",
"Interchanging two rows changes the sign of the determinant. Multiplying a row by a non-zero scalar k multiplies the determinant by k. Adding a multiple of one row to another row does not change the determinant. These rules are useful because they allow a complicated determinant to be simplified before calculation. Care must be taken to account for row swaps and row scaling when calculating the final value."
));

/* =========================================================
   LONG - 20 QUESTIONS
   ========================================================= */

questions.push(
createQuestion(
"Long","Easy",1,"Types of Matrices",5,
"Explain the different important types of matrices with suitable examples.",
"An important classification of matrices is based on their order and the arrangement of their elements. A row matrix has only one row, while a column matrix has only one column. A square matrix has the same number of rows and columns. A rectangular matrix has unequal numbers of rows and columns. A zero matrix contains only zeros. A diagonal matrix is a square matrix in which all elements outside the principal diagonal are zero. An identity matrix has 1s on the principal diagonal and zeros elsewhere. A symmetric matrix satisfies Aᵀ=A, while a skew-symmetric matrix satisfies Aᵀ=−A. These classifications are useful because different matrix operations and properties depend on the structure of the matrix."
));

questions.push(
createQuestion(
"Long","Easy",1,"Matrix Algebra",5,
"Explain matrix addition, subtraction and scalar multiplication with examples.",
"Matrix addition, subtraction and scalar multiplication are fundamental operations of matrix algebra. These operations are used in solving systems of equations, computer graphics, engineering calculations and many other applications.\n\n1. Matrix Addition:\nMatrix addition is performed by adding the corresponding elements of two matrices. Addition is possible only when both matrices have the same order. If A and B are matrices of the same order, then each element of A is added to the corresponding element of B.\n\nFor example, let A = [[1,2],[3,4]] and B = [[5,6],[7,8]]. Then:\nA + B = [[1+5, 2+6],[3+7, 4+8]]\n= [[6,8],[10,12]].\n\n2. Matrix Subtraction:\nMatrix subtraction is also performed element by element. The matrices must have the same order. Using the same matrices A and B:\nA − B = [[1−5, 2−6],[3−7, 4−8]]\n= [[−4,−4],[−4,−4]].\n\n3. Scalar Multiplication:\nIn scalar multiplication, every element of a matrix is multiplied by the same scalar value. If A = [[1,2],[3,4]] and the scalar is 3, then:\n3A = [[3×1, 3×2],[3×3, 3×4]]\n= [[3,6],[9,12]].\n\nImportant properties include commutativity of addition, meaning A+B = B+A, and associativity, meaning (A+B)+C = A+(B+C). Scalar multiplication also distributes over matrix addition, so k(A+B) = kA+kB.\n\nTherefore, matrix addition, subtraction and scalar multiplication provide the basic operations required for more advanced matrix calculations."
)); 


questions.push(
createQuestion(
"Long","Hard",1,"Matrix Algebra",5,
"Explain matrix multiplication and the condition required for multiplication.",
"Matrix multiplication is an important operation in matrix algebra. It is different from ordinary element-by-element multiplication because each element of the resulting matrix is obtained by taking the dot product of a row of the first matrix with a column of the second matrix.\n\nCondition for Matrix Multiplication:\nSuppose matrix A has order m×n and matrix B has order n×p. The multiplication AB is possible only when the number of columns of A is equal to the number of rows of B. In other words, the inner dimensions must be equal. The resulting matrix AB will have order m×p.\n\nFor example, let:\nA = [[1,2],[3,4]]\nB = [[5,6],[7,8]]\n\nBoth matrices are of order 2×2, so multiplication is possible.\n\nAB = [[(1×5)+(2×7), (1×6)+(2×8)], [(3×5)+(4×7), (3×6)+(4×8)]]\n\nTherefore:\nAB = [[19,22],[43,50]].\n\nThe first element is calculated by multiplying the first row of A with the first column of B: (1×5)+(2×7) = 19. The same row-column process is repeated for every element of the resulting matrix.\n\nImportant Properties:\n1. Matrix multiplication is associative: (AB)C = A(BC).\n2. It is distributive over addition: A(B+C) = AB+AC.\n3. In general, matrix multiplication is not commutative, so AB is not necessarily equal to BA.\n4. It is possible for AB to exist while BA does not exist because the required dimensions may be different.\n\nApplications:\nMatrix multiplication is widely used in solving systems of linear equations, computer graphics, geometric transformations, engineering calculations and machine learning.\n\nThus, matrix multiplication depends on the row-column rule and can be performed only when the dimensions of the two matrices satisfy the required condition."
));


questions.push(
createQuestion(
"Long","Medium",1,"Types of Matrices",5,
"Explain symmetric and skew-symmetric matrices and derive their basic properties.",
"A square matrix A is called a symmetric matrix if its transpose is equal to the original matrix, that is, Aᵀ = A. Therefore, every element on one side of the principal diagonal must be equal to the corresponding element on the other side.\n\nFor example:\nA = [[2,3],[3,5]]\n\nThe transpose is:\nAᵀ = [[2,3],[3,5]]\n\nSince Aᵀ = A, the matrix is symmetric.\n\nImportant properties of a symmetric matrix:\n1. A symmetric matrix must always be a square matrix.\n2. Its elements satisfy aᵢⱼ = aⱼᵢ.\n3. The transpose of a symmetric matrix is the matrix itself.\n4. The sum of two symmetric matrices of the same order is also symmetric.\n\nA square matrix A is called a skew-symmetric matrix if its transpose is equal to the negative of the original matrix. Therefore:\nAᵀ = −A.\n\nFor example:\nA = [[0,4],[-4,0]]\n\nIts transpose is:\nAᵀ = [[0,-4],[4,0]]\n\nTherefore:\n−A = [[0,-4],[4,0]]\n\nHence Aᵀ = −A, so A is skew-symmetric.\n\nDiagonal Elements of a Skew-Symmetric Matrix:\nFor a diagonal element aᵢᵢ, the condition becomes:\naᵢᵢ = −aᵢᵢ.\n\nAdding aᵢᵢ to both sides gives:\n2aᵢᵢ = 0.\n\nTherefore:\naᵢᵢ = 0.\n\nThus, all diagonal elements of a skew-symmetric matrix must be zero.\n\nImportant properties of a skew-symmetric matrix:\n1. It must be a square matrix.\n2. The diagonal elements are always zero.\n3. The elements satisfy aᵢⱼ = −aⱼᵢ.\n4. The transpose of a skew-symmetric matrix is its negative.\n\nMatrix Decomposition:\nEvery square matrix A can be uniquely expressed as the sum of a symmetric matrix and a skew-symmetric matrix. The symmetric part is obtained using (A + Aᵀ)/2, while the skew-symmetric part is obtained using (A − Aᵀ)/2.\n\nTherefore, symmetric and skew-symmetric matrices are important concepts in linear algebra because they help in matrix decomposition, mathematical modelling, numerical methods and many engineering applications."
)); 


questions.push(
createQuestion(
"Long","Hard",1,"Matrix Algebra",5,
"Explain important properties of matrix multiplication and illustrate them with examples.",
"Matrix multiplication has several important properties that are useful for simplifying matrix expressions and solving mathematical problems. However, these properties apply only when the dimensions of the matrices are compatible for multiplication.\n\n1. Closure Property:\nIf A and B are matrices for which AB is defined, then the product AB is also a matrix. For example, the product of two 2×2 matrices produces another 2×2 matrix.\n\n2. Associative Property:\nMatrix multiplication is associative. Therefore:\n(AB)C = A(BC).\nThis means that when three compatible matrices are multiplied, changing the grouping does not change the final result.\n\n3. Distributive Property:\nMatrix multiplication is distributive over matrix addition. There are two forms:\nA(B+C) = AB+AC\nand\n(A+B)C = AC+BC.\nThis property allows matrix expressions to be expanded and simplified.\n\n4. Non-Commutative Property:\nUnlike ordinary numbers, matrix multiplication is generally not commutative. Therefore:\nAB ≠ BA.\n\nFor example, let:\nA = [[1,1],[0,1]]\nB = [[1,0],[1,1]].\n\nThen:\nAB = [[2,1],[1,1]]\nwhile:\nBA = [[1,1],[1,2]].\n\nTherefore AB and BA are different, showing that matrix multiplication is not generally commutative.\n\n5. Identity Property:\nFor a square matrix A, the identity matrix I acts as the multiplicative identity. Therefore:\nAI = IA = A.\nFor a 2×2 matrix, the identity matrix is I = [[1,0],[0,1]].\n\n6. Zero Matrix Property:\nIf O is a zero matrix of compatible order, then:\nAO = O\nand\nOA = O.\n\n7. Compatibility of Dimensions:\nIf A has order m×n and B has order n×p, then AB is defined and the resulting matrix has order m×p. The number of columns of the first matrix must equal the number of rows of the second matrix.\n\nThese properties are important in linear algebra, computer graphics, engineering, mathematical modelling and solving systems of linear equations. Understanding them helps in correctly simplifying and evaluating complex matrix expressions."
)); 


questions.push(
createQuestion(
"Long","Easy",2,"Determinants",5,
"Explain the determinant of a matrix and discuss its significance.",
"The determinant is a scalar value associated with a square matrix. For a 2×2 matrix A=[[a,b],[c,d]], det(A)=ad−bc. For larger matrices, the determinant can be calculated using expansion by cofactors or suitable row operations. The determinant helps determine whether a matrix is singular or non-singular. If det(A)=0, the matrix is singular and its inverse does not exist. If det(A)≠0, the matrix is non-singular and an inverse exists. Determinants are also used to study systems of equations, area and volume transformations, eigenvalues and matrix invertibility. Therefore, the determinant provides important structural information about a square matrix."
));

questions.push(
createQuestion(
"Long","Medium",2,"Determinants",5,
"Explain the methods for evaluating determinants of higher-order matrices.",
"A determinant of a higher-order matrix can be evaluated using cofactor expansion or row reduction. In cofactor expansion, a row or column is selected and each element is multiplied by its corresponding cofactor. The cofactors contain a sign pattern and a minor determinant. Row reduction can often be faster because triangular matrices have determinants equal to the product of their diagonal elements. During row operations, row interchange changes the sign and multiplying a row changes the determinant by the same factor. Adding a multiple of one row to another does not change the determinant. Correctly tracking these changes gives the determinant of the original matrix."
));

questions.push(
createQuestion(
"Long","Medium",2,"Inverse of a Matrix",5,
"Explain the adjoint method for finding the inverse of a square matrix.",
"The adjoint method is an important method for finding the inverse of a square matrix. The inverse of a square matrix A exists only when its determinant is non-zero, that is, det(A) ≠ 0.\n\nThe complete procedure is as follows:\n\nStep 1: Find the determinant.\nFirst calculate det(A). If det(A) = 0, then A is a singular matrix and its inverse does not exist. If det(A) ≠ 0, the inverse can be calculated using the adjoint method.\n\nStep 2: Find the minors.\nFor every element of the matrix, calculate its minor by deleting the row and column containing that element and finding the determinant of the remaining matrix.\n\nStep 3: Find the cofactors.\nConvert the minors into cofactors by applying the sign pattern:\n+  −  +\n−  +  −\n+  −  +\n\nThe cofactor is calculated using:\nCᵢⱼ = (−1)ⁱ⁺ʲ Mᵢⱼ.\n\nStep 4: Form the cofactor matrix.\nAfter calculating all the cofactors, arrange them in their original positions to obtain the cofactor matrix.\n\nStep 5: Find the adjoint.\nThe adjoint of A is obtained by taking the transpose of the cofactor matrix:\nadj(A) = (Cofactor Matrix)ᵀ.\n\nStep 6: Calculate the inverse.\nThe inverse is calculated using the formula:\nA⁻¹ = adj(A) / det(A).\n\nFor a 2×2 matrix:\nA = [[a,b],[c,d]],\n\nits determinant is:\ndet(A) = ad − bc.\n\nThe inverse is:\nA⁻¹ = 1/(ad−bc) [[d,−b],[-c,a]],\nprovided that ad−bc ≠ 0.\n\nVerification:\nAfter calculating A⁻¹, the result can be verified by multiplying the original matrix by its inverse. The result should be the identity matrix:\nAA⁻¹ = A⁻¹A = I.\n\nThus, the adjoint method provides a systematic procedure for finding the inverse of a square matrix using the determinant, minors, cofactors and transpose of the cofactor matrix."
)); 


questions.push(
createQuestion(
"Long","Medium",2,"Rank of a Matrix",5,
"Explain how the rank of a matrix is determined using row-reduction.",
"The rank of a matrix is the maximum number of linearly independent rows or columns in the matrix. It is an important concept in linear algebra and is used to determine the consistency and number of solutions of a system of linear equations. The rank can be conveniently determined by converting the matrix into row-echelon form using elementary row operations.\n\nProcedure for finding rank using row-reduction:\n\nStep 1: Write the given matrix.\nStart with the matrix A whose rank is required.\n\nStep 2: Apply elementary row operations.\nUse operations such as interchanging two rows, multiplying a row by a non-zero constant, or adding a multiple of one row to another row. These operations do not change the rank of the matrix.\n\nStep 3: Convert the matrix into row-echelon form.\nUse Gaussian elimination to make the elements below each leading non-zero element equal to zero. Continue this process until the matrix reaches row-echelon form.\n\nStep 4: Count the non-zero rows.\nOnce the matrix is in row-echelon form, count the number of rows that contain at least one non-zero element. This number is the rank of the matrix.\n\nFor example, consider:\nA = [[1,2,3],[2,4,6],[1,1,1]].\n\nApply R₂ → R₂ − 2R₁:\nA = [[1,2,3],[0,0,0],[1,1,1]].\n\nThen apply R₃ → R₃ − R₁:\nA = [[1,2,3],[0,0,0],[0,−1,−2]].\n\nAfter arranging the non-zero rows in echelon form, there are two non-zero rows. Therefore:\nRank(A) = 2.\n\nImportant points:\n1. Elementary row operations do not change the rank.\n2. The number of non-zero rows in row-echelon form gives the rank.\n3. A zero matrix has rank 0.\n4. For an n×n non-singular matrix, the rank is n.\n5. Rank is useful for checking the consistency of systems of linear equations.\n\nThus, row-reduction provides a systematic and efficient method for finding the rank of a matrix by transforming it into row-echelon form and counting its non-zero rows."
)); 


questions.push(
createQuestion(
"Long","Medium",3,"Gaussian Elimination",5,
"Explain Gaussian elimination step by step for solving a system of linear equations.",
"Gaussian elimination converts a system of linear equations into an equivalent upper triangular or row-echelon form. First write the coefficient and constant values as an augmented matrix. Select a suitable pivot in the first column and use elementary row operations to make the entries below it zero. Move to the next column and repeat the process until the matrix reaches row-echelon form. The resulting equations are then solved using back substitution, starting with the last equation. Gaussian elimination can also identify inconsistent systems and systems with infinitely many solutions. It is systematic and suitable for both small and large systems."
));

questions.push(
createQuestion(
"Long","Medium",3,"Gauss-Jordan Method",5,
"Explain the Gauss-Jordan method and compare it with Gaussian elimination.",
"Gauss-Jordan elimination is a systematic method used to solve systems of linear equations by transforming an augmented matrix into reduced row-echelon form (RREF). It is an extension of Gaussian elimination because it continues the row-reduction process beyond ordinary row-echelon form.\n\nProcedure of Gauss-Jordan Method:\n\nStep 1: Form the augmented matrix.\nRepresent the system of linear equations in the form [A|B], where A contains the coefficients of the variables and B contains the constant terms.\n\nStep 2: Select a pivot.\nChoose a suitable non-zero element as the pivot. If necessary, interchange rows so that a non-zero element is available in the required position.\n\nStep 3: Make the pivot equal to 1.\nDivide the entire pivot row by the pivot value so that the pivot becomes 1.\n\nStep 4: Make other elements in the pivot column zero.\nUse elementary row operations to make every other element above and below the pivot equal to zero.\n\nStep 5: Repeat the process.\nMove to the next column and repeat the same procedure until the augmented matrix reaches reduced row-echelon form.\n\nFor example, consider the system:\nx + y = 5\nx − y = 1\n\nIts augmented matrix is:\n[[1,1,5],[1,−1,1]].\n\nApply R₂ → R₂ − R₁:\n[[1,1,5],[0,−2,−4]].\n\nDivide the second row by −2:\n[[1,1,5],[0,1,2]].\n\nNow eliminate the value above the second pivot using R₁ → R₁ − R₂:\n[[1,0,3],[0,1,2]].\n\nTherefore:\nx = 3 and y = 2.\n\nComparison with Gaussian Elimination:\n1. Gaussian elimination converts the matrix into row-echelon form, while Gauss-Jordan elimination converts it into reduced row-echelon form.\n2. Gaussian elimination normally requires a separate back-substitution step to obtain the variables. Gauss-Jordan elimination gives the variable values directly from the final matrix.\n3. Gaussian elimination makes the entries below each pivot zero, whereas Gauss-Jordan makes the entries both above and below each pivot zero.\n4. Gauss-Jordan generally requires more row operations than Gaussian elimination.\n5. Gauss-Jordan elimination can also be used to find the inverse of a matrix by reducing [A|I] to [I|A⁻¹].\n\nThus, Gauss-Jordan elimination provides a direct and systematic method for solving linear systems and finding matrix inverses, while Gaussian elimination is often more efficient when only the solution of a system is required."
)); 


questions.push(
createQuestion(
"Long","Hard",3,"Systems of Linear Equations",5,
"Explain the rank method for determining the consistency of a system of linear equations.",
"Consider a system AX=B and compare rank(A) with rank([A|B]), where [A|B] is the augmented matrix. If rank(A)=rank([A|B])=n, where n is the number of unknowns, the system has a unique solution. If rank(A)=rank([A|B])<n, the system has infinitely many solutions because at least one variable is free. If rank(A) is different from rank([A|B]), the system is inconsistent and has no solution. This method provides a systematic way to classify a linear system without solving every variable explicitly."
));

questions.push(
createQuestion(
"Long","Easy",4,"Vector Spaces",5,
"Define a vector space and explain its important properties.",
"A vector space is a set of vectors over a field of scalars that is closed under vector addition and scalar multiplication and satisfies the vector-space axioms. Important properties include the existence of a zero vector, existence of additive inverses, closure under addition, closure under scalar multiplication, associativity of addition and distributive properties. Examples include R², R³ and sets of polynomials of bounded degree. Vector spaces provide a general mathematical framework for studying vectors, matrices, functions and linear transformations."
));

questions.push(
createQuestion(
"Long","Medium",4,"Linear Dependence and Independence",5,
"Explain linear dependence and linear independence with a suitable example.",
"A set of vectors v1,v2,...,vn is linearly independent if c1v1+c2v2+...+cnvn=0 implies that all coefficients are zero. If there is a non-zero set of coefficients satisfying the equation, the vectors are linearly dependent. For example, vectors (1,2) and (2,4) are dependent because the second vector is twice the first. In contrast, (1,0) and (0,1) are independent because neither can be expressed as a scalar multiple of the other. Independence is important when constructing bases and determining dimension."
));

questions.push(
createQuestion(
"Long","Hard",4,"Basis and Dimension",5,
"Explain basis and dimension of a vector space in detail.",
"A basis of a vector space is a set of vectors that spans the entire space and is linearly independent. The spanning condition means every vector in the space can be expressed as a linear combination of the basis vectors. Independence means no vector in the basis is redundant. The number of vectors in any basis is called the dimension of the vector space. For R², {(1,0),(0,1)} is a standard basis and the dimension is 2. Basis and dimension are important because they provide a compact way of representing vectors and determining the number of independent directions in a space."
));

questions.push(
createQuestion(
"Long","Hard",5,"Eigenvalues and Eigenvectors",5,
"Explain the complete procedure for finding eigenvalues and eigenvectors.",
"For a square matrix A, eigenvalues are found from the equation det(A−λI)=0. First form A−λI by subtracting λ from every diagonal element. Then calculate its determinant and set the result equal to zero. Solving the resulting characteristic polynomial gives the eigenvalues. For each eigenvalue λ, substitute it into (A−λI)v=0 and solve the resulting homogeneous system to obtain the corresponding non-zero eigenvectors. The eigenvector is defined only up to a non-zero scalar multiple. This procedure is fundamental in diagonalization, differential equations and many applications of linear algebra."
));

questions.push(
createQuestion(
"Long","Hard",5,"Diagonalization",5,
"Explain diagonalization of a matrix and state the condition under which it is possible.",
"A square matrix A is diagonalizable if there exists an invertible matrix P and a diagonal matrix D such that A=PDP⁻¹. The columns of P are linearly independent eigenvectors of A, while the diagonal entries of D are the corresponding eigenvalues. A matrix of order n is diagonalizable when it has n linearly independent eigenvectors. Diagonalization simplifies matrix powers because A^k=PD^kP⁻¹, and calculating powers of a diagonal matrix is straightforward. The technique is useful in systems of differential equations, recurrence relations and mathematical modelling."
));

questions.push(
createQuestion(
"Long","Hard",5,"Eigenvalues and Eigenvectors",5,
"Explain the relationship between eigenvalues, determinant, trace and characteristic polynomial.",
"The eigenvalues of a square matrix are the roots of its characteristic polynomial det(A−λI)=0. The determinant of A equals the product of its eigenvalues, counting algebraic multiplicity. The trace of A equals the sum of its eigenvalues. Therefore, eigenvalues provide important information about the matrix without directly examining every matrix operation. If zero is an eigenvalue, the determinant is zero and the matrix is singular. These relationships are useful for checking calculations and understanding matrix properties."
));

/* =========================================================
   NUMERICAL - 15 QUESTIONS
   ========================================================= */

questions.push(
createQuestion(
"Numerical","Easy",1,"Matrix Algebra",5,
"Given A=[[2,3],[4,5]] and B=[[1,2],[3,4]], calculate A+B.",
"Given A=[[2,3],[4,5]] and B=[[1,2],[3,4]]. Add corresponding elements: A+B=[[2+1,3+2],[4+3,5+4]]. Therefore A+B=[[3,5],[7,9]]. Final Answer: [[3,5],[7,9]].",
[], "", ""
));

questions.push(
createQuestion(
"Numerical","Easy",1,"Matrix Algebra",5,
"Multiply the matrix A=[[1,2],[3,4]] by the scalar 3.",
"Given A=[[1,2],[3,4]]. Multiply every element by 3: 3A=[[3×1,3×2],[3×3,3×4]]. Therefore 3A=[[3,6],[9,12]]. Final Answer: [[3,6],[9,12]].",
[], "", ""
));

questions.push(
createQuestion(
"Numerical","Medium",1,"Matrix Algebra",5,
"Calculate AB for A=[[1,2],[3,4]] and B=[[2,0],[1,3]].",
"Multiply rows of A with columns of B. First element =1×2+2×1=4. Second element =1×0+2×3=6. Third element =3×2+4×1=10. Fourth element =3×0+4×3=12. Therefore AB=[[4,6],[10,12]].",
[], "", ""
));

questions.push(
createQuestion(
"Numerical","Medium",2,"Determinants",5,
"Find the determinant of A=[[5,2],[3,4]].",
"For a 2×2 matrix [[a,b],[c,d]], det(A)=ad−bc. Here a=5,b=2,c=3,d=4. Therefore det(A)=5×4−2×3=20−6=14. Final Answer: det(A)=14. Since the determinant is non-zero, the matrix is non-singular.",
[], "", ""
));

questions.push(
createQuestion(
"Numerical","Medium",2,"Determinants",5,
"Find the determinant of [[1,2,3],[0,4,5],[1,0,6]].",
"Expand along the first row. det(A)=1(4×6−5×0)−2(0×6−5×1)+3(0×0−4×1). This gives 24−2(−5)+3(−4)=24+10−12=22. Final Answer: det(A)=22.",
[], "", ""
));

questions.push(
createQuestion(
"Numerical","Hard",2,"Inverse of a Matrix",5,
"Find the inverse of A=[[2,1],[1,1]].",
"First calculate det(A)=2×1−1×1=1. Since the determinant is non-zero, the inverse exists. For [[a,b],[c,d]], A⁻¹=1/(ad−bc)[[d,−b],[-c,a]]. Therefore A⁻¹=[[1,−1],[-1,2]]. Multiplying A by this matrix gives the identity matrix, confirming the result.",
[], "", ""
));

questions.push(
createQuestion(
"Numerical","Hard",2,"Rank of a Matrix",5,
"Find the rank of [[1,2,3],[2,4,6],[1,1,1]].",
"Start with A=[[1,2,3],[2,4,6],[1,1,1]]. Apply R2→R2−2R1, giving R2=[0,0,0]. Apply R3→R3−R1, giving R3=[0,−1,−2]. There are two non-zero rows in echelon form. Therefore rank(A)=2.",
[], "", ""
));

questions.push(
createQuestion(
"Numerical","Medium",3,"Gaussian Elimination",5,
"Solve x+y=5 and x−y=1 using elimination.",
"Add the equations: (x+y)+(x−y)=5+1, giving 2x=6. Therefore x=3. Substitute x=3 into x+y=5: 3+y=5, so y=2. Final Answer: x=3 and y=2. Substitution into both original equations confirms the solution.",
[], "", ""
));

questions.push(
createQuestion(
"Numerical","Hard",3,"Gaussian Elimination",5,
"Solve 2x+y=7 and x−y=2 using elimination.",
"Equations are 2x+y=7 and x−y=2. Add the equations after multiplying the second equation by 1: 3x=9, so x=3. Substitute x=3 into x−y=2: 3−y=2, therefore y=1. Final Answer: x=3,y=1. Both values satisfy the original equations.",
[], "", ""
));

questions.push(
createQuestion(
"Numerical","Hard",3,"Systems of Linear Equations",5,
"Determine whether x+y=2 and 2x+2y=5 have a solution.",
"The first equation is x+y=2. Multiplying it by 2 gives 2x+2y=4. However, the second equation requires 2x+2y=5. This produces the contradiction 4=5. Therefore the system is inconsistent and has no solution.",
[], "", ""
));

questions.push(
createQuestion(
"Numerical","Easy",4,"Vector Spaces",5,
"Find the magnitude of vector v=(3,4).",
"The magnitude of a vector (x,y) is √(x²+y²). Therefore |v|=√(3²+4²)=√(9+16)=√25=5. Final Answer: |v|=5. The vector therefore has length 5 units.",
[], "", ""
));

questions.push(
createQuestion(
"Numerical","Medium",4,"Linear Dependence and Independence",5,
"Determine whether (1,2) and (2,4) are linearly independent.",
"Let c1(1,2)+c2(2,4)=(0,0). Since (2,4)=2(1,2), choose c1=−2 and c2=1. These coefficients are not both zero and produce the zero vector. Therefore the vectors are linearly dependent.",
[], "", ""
));

questions.push(
createQuestion(
"Numerical","Hard",4,"Basis and Dimension",5,
"Determine whether (1,0),(0,1) form a basis for R².",
"The vectors span R² because any vector (x,y) can be written as x(1,0)+y(0,1). They are also linearly independent because c1(1,0)+c2(0,1)=(0,0) gives c1=0 and c2=0. Therefore they form a basis of R² and the dimension is 2.",
[], "", ""
));

questions.push(
createQuestion(
"Numerical","Medium",5,"Eigenvalues and Eigenvectors",5,
"Find the eigenvalues of A=[[2,0],[0,3]].",
"Form A−λI=[[2−λ,0],[0,3−λ]]. The characteristic equation is (2−λ)(3−λ)=0. Therefore λ=2 or λ=3. Final Answer: the eigenvalues are 2 and 3.",
[], "", ""
));

questions.push(
createQuestion(
"Numerical","Hard",5,"Eigenvalues and Eigenvectors",5,
"Find the eigenvalues of A=[[4,1],[2,3]].",
"Form A−λI=[[4−λ,1],[2,3−λ]]. The determinant is (4−λ)(3−λ)−2 = 12−7λ+λ²−2 = λ²−7λ+10. Factorizing gives (λ−5)(λ−2)=0. Therefore the eigenvalues are λ=5 and λ=2.",
[], "", ""
));

/* =========================================================
   PROGRAMMING - 10 QUESTIONS
   ========================================================= */

questions.push(
createQuestion(
"Programming","Easy",1,"Matrix Algebra",5,
"Write a C++ program to add two 2×2 matrices.",
"Problem: Add corresponding elements of two matrices.\n\nAlgorithm:\n1. Read two 2×2 matrices.\n2. Add corresponding elements.\n3. Store the result.\n4. Display the result.\n\nC++ Code:\n#include <iostream>\nusing namespace std;\nint main(){int A[2][2]={{1,2},{3,4}},B[2][2]={{5,6},{7,8}};for(int i=0;i<2;i++){for(int j=0;j<2;j++)cout<<A[i][j]+B[i][j]<<\" \";cout<<endl;}return 0;}\n\nExpected Output:\n6 8\n10 12\n\nThe program adds corresponding matrix elements using nested loops."
));

questions.push(
createQuestion(
"Programming","Easy",1,"Matrix Algebra",5,
"Write a C++ program to find the transpose of a 3×3 matrix.",
"Problem: Interchange rows and columns of a matrix.\n\nAlgorithm:\n1. Store the matrix.\n2. Use nested loops.\n3. Print A[j][i] instead of A[i][j].\n\nC++ Code:\n#include <iostream>\nusing namespace std;\nint main(){int A[3][3]={{1,2,3},{4,5,6},{7,8,9}};for(int i=0;i<3;i++){for(int j=0;j<3;j++)cout<<A[j][i]<<\" \";cout<<endl;}return 0;}\n\nExpected Output:\n1 4 7\n2 5 8\n3 6 9\n\nThe program obtains the transpose by exchanging row and column indices."
));

questions.push(
createQuestion(
"Programming","Medium",1,"Matrix Algebra",5,
"Write a C++ program to multiply two 2×2 matrices.",
"Problem: Perform matrix multiplication using rows and columns.\n\nAlgorithm:\n1. Store matrices A and B.\n2. Initialize result elements to zero.\n3. Use three nested loops.\n4. Add A[i][k]*B[k][j].\n\nC++ Code:\n#include <iostream>\nusing namespace std;\nint main(){int A[2][2]={{1,2},{3,4}},B[2][2]={{5,6},{7,8}},C[2][2]={{0,0},{0,0}};for(int i=0;i<2;i++)for(int j=0;j<2;j++)for(int k=0;k<2;k++)C[i][j]+=A[i][k]*B[k][j];for(int i=0;i<2;i++){for(int j=0;j<2;j++)cout<<C[i][j]<<\" \";cout<<endl;}return 0;}\n\nExpected Output:\n19 22\n43 50\n\nThe innermost loop calculates the dot product of a row and a column."
));

questions.push(
createQuestion(
"Programming","Medium",2,"Determinants",5,
"Write a C++ program to calculate the determinant of a 2×2 matrix.",
"Problem: Calculate ad−bc.\n\nAlgorithm:\n1. Read a,b,c,d.\n2. Calculate a*d-b*c.\n3. Display the determinant.\n\nC++ Code:\n#include <iostream>\nusing namespace std;\nint main(){int a=5,b=2,c=3,d=4;int det=a*d-b*c;cout<<\"Determinant = \"<<det;return 0;}\n\nExpected Output:\nDeterminant = 14\n\nThe formula directly follows the determinant definition for a 2×2 matrix."
));

questions.push(
createQuestion(
"Programming","Medium",2,"Rank of a Matrix",5,
"Write a C++ program to count non-zero rows of a simple row-echelon matrix.",
"Problem: Count non-zero rows in a matrix already represented in row-echelon form.\n\nAlgorithm:\n1. Store the matrix.\n2. Check every row.\n3. If at least one element is non-zero, count that row.\n4. Print the count.\n\nC++ Code:\n#include <iostream>\nusing namespace std;\nint main(){int A[3][3]={{1,2,3},{0,1,4},{0,0,0}};int rank=0;for(int i=0;i<3;i++){bool nonzero=false;for(int j=0;j<3;j++)if(A[i][j]!=0)nonzero=true;if(nonzero)rank++;}cout<<\"Rank = \"<<rank;return 0;}\n\nExpected Output:\nRank = 2\n\nFor a row-echelon matrix, the number of non-zero rows gives its rank."
));

questions.push(
createQuestion(
"Programming","Hard",2,"Inverse of a Matrix",5,
"Write a C++ program to find the inverse of a 2×2 matrix when its determinant is non-zero.",
"Problem: Use the 2×2 inverse formula.\n\nAlgorithm:\n1. Read a,b,c,d.\n2. Calculate det=ad−bc.\n3. Check whether det is zero.\n4. If non-zero, calculate [[d,-b],[-c,a]]/det.\n\nC++ Code:\n#include <iostream>\nusing namespace std;\nint main(){double a=2,b=1,c=1,d=1;double det=a*d-b*c;if(det==0){cout<<\"Inverse does not exist\";}else{cout<<d/det<<\" \"<<-b/det<<endl;cout<<-c/det<<\" \"<<a/det;}return 0;}\n\nExpected Output:\n1 -1\n-1 2\n\nThe determinant condition ensures that division by zero does not occur."
));

questions.push(
createQuestion(
"Programming","Hard",3,"Gaussian Elimination",5,
"Write a C++ program to solve two linear equations using the determinant method.",
"Problem: Solve ax+by=e and cx+dy=f.\n\nAlgorithm:\n1. Calculate D=ad−bc.\n2. Calculate Dx=ed−bf.\n3. Calculate Dy=af−ec.\n4. If D is non-zero, x=Dx/D and y=Dy/D.\n\nC++ Code:\n#include <iostream>\nusing namespace std;\nint main(){double a=2,b=1,e=5,c=1,d=-1,f=1;double D=a*d-b*c;double Dx=e*d-b*f;double Dy=a*f-e*c;cout<<\"x = \"<<Dx/D<<endl;cout<<\"y = \"<<Dy/D;return 0;}\n\nExpected Output:\nx = 2\ny = 1\n\nThe program applies Cramer's rule to the two-equation system."
));

questions.push(
createQuestion(
"Programming","Hard",4,"Vector Spaces",5,
"Write a C++ program to calculate the dot product of two vectors.",
"Problem: Calculate v·w by multiplying corresponding components and adding them.\n\nAlgorithm:\n1. Store two vectors.\n2. Initialize sum to zero.\n3. Multiply corresponding elements.\n4. Add the products.\n\nC++ Code:\n#include <iostream>\nusing namespace std;\nint main(){int a[3]={1,2,3},b[3]={4,5,6},sum=0;for(int i=0;i<3;i++)sum+=a[i]*b[i];cout<<\"Dot Product = \"<<sum;return 0;}\n\nExpected Output:\nDot Product = 32\n\nThe dot product is 1×4+2×5+3×6=32."
));

questions.push(
createQuestion(
"Programming","Hard",5,"Eigenvalues and Eigenvectors",5,
"Write a C++ program to calculate the trace of a square matrix.",
"Problem: The trace is the sum of the main diagonal elements.\n\nAlgorithm:\n1. Store the square matrix.\n2. Traverse diagonal positions where row index equals column index.\n3. Add those values.\n4. Display the trace.\n\nC++ Code:\n#include <iostream>\nusing namespace std;\nint main(){int A[3][3]={{2,1,0},{0,3,4},{1,0,5}},trace=0;for(int i=0;i<3;i++)trace+=A[i][i];cout<<\"Trace = \"<<trace;return 0;}\n\nExpected Output:\nTrace = 10\n\nThe trace is related to the sum of the eigenvalues of a square matrix."
));

questions.push(
createQuestion(
"Programming","Hard",5,"Diagonalization",5,
"Write a C++ program to verify that the trace of a matrix is the sum of its diagonal elements.",
"Problem: Calculate the diagonal sum of a square matrix.\n\nAlgorithm:\n1. Store the matrix.\n2. Start sum at zero.\n3. Add A[i][i] for every diagonal position.\n4. Display the result.\n\nC++ Code:\n#include <iostream>\nusing namespace std;\nint main(){int A[2][2]={{4,1},{2,3}};int sum=0;for(int i=0;i<2;i++)sum+=A[i][i];cout<<\"Diagonal Sum = \"<<sum;return 0;}\n\nExpected Output:\nDiagonal Sum = 7\n\nFor this matrix the diagonal entries are 4 and 3, so their sum is 7."
));

/* =========================================================
   CASE STUDY - 5 QUESTIONS
   ========================================================= */

questions.push(
createQuestion(
"Case Study","Easy",1,"Matrix Algebra",10,
"A university stores marks of students in matrix form. Explain how matrix operations can be used to combine marks from two tests and obtain a final marks matrix.",
"Situation Analysis: Student marks can be represented using matrices where rows represent students and columns represent subjects or tests.\n\nSolution: If A contains the marks of Test 1 and B contains the marks of Test 2, corresponding elements can be added using A+B. If different tests have different weights, scalar multiplication can be used. For example, if Test 1 has 40% weight and Test 2 has 60% weight, the final matrix can be represented as 0.4A+0.6B.\n\nJustification: Matrix operations allow the same calculation to be performed for many students simultaneously.\n\nConclusion: Matrices provide an efficient representation for large collections of academic data and make weighted calculations systematic."
));

questions.push(
createQuestion(
"Case Study","Medium",2,"Determinants",10,
"A software system uses a 2×2 transformation matrix. Explain how the determinant can be used to determine whether the transformation is reversible.",
"Situation Analysis: A transformation represented by a square matrix can be reversed only when the matrix has an inverse.\n\nSolution: Calculate det(A). For A=[[a,b],[c,d]], det(A)=ad−bc. If det(A)=0, the matrix is singular and no inverse exists. Therefore the transformation cannot be uniquely reversed. If det(A) is non-zero, A has an inverse and the transformation is reversible.\n\nJustification: Matrix invertibility is directly connected to the determinant.\n\nConclusion: Checking the determinant provides a quick mathematical test for reversibility without calculating the complete inverse first."
));

questions.push(
createQuestion(
"Case Study","Medium",3,"Systems of Linear Equations",10,
"A company has two products whose production quantities must satisfy resource constraints represented by two linear equations. Explain how Gaussian elimination can be used to determine the production quantities.",
"Situation Analysis: Let x and y represent quantities of the two products. The resource constraints can be written as two linear equations.\n\nSolution: Convert the equations into an augmented matrix. Select a pivot and use elementary row operations to eliminate one variable from the second equation. Continue until row-echelon form is obtained. Then use back substitution to determine x and y.\n\nJustification: Gaussian elimination systematically transforms the original system into an equivalent and easier system.\n\nConclusion: The method provides an efficient procedure for determining whether the production plan has a unique solution, infinitely many solutions or no feasible solution."
));

questions.push(
createQuestion(
"Case Study","Hard",4,"Basis and Dimension",10,
"A graphics application represents 2D positions using vectors. The development team wants to remove redundant direction vectors. Explain how linear independence and basis can solve this problem.",
"Situation Analysis: A set of direction vectors may contain redundant vectors if one vector can be represented as a combination of the others.\n\nSolution: Check whether a non-trivial linear combination of the vectors produces the zero vector. If such a combination exists, the vectors are linearly dependent. Remove redundant vectors until the remaining vectors are independent and still span the required space. The resulting independent spanning set forms a basis.\n\nJustification: A basis gives a minimal set of independent directions capable of representing every vector in the space.\n\nConclusion: Using a basis reduces unnecessary data while preserving the ability to represent all required 2D positions."
));

questions.push(
createQuestion(
"Case Study","Hard",5,"Eigenvalues and Eigenvectors",10,
"A data-analysis application repeatedly applies the same square matrix transformation to a dataset. Explain how eigenvalues and diagonalization can make repeated matrix operations easier.",
"Situation Analysis: Repeatedly calculating A, A², A³ and higher powers directly can require many matrix multiplications.\n\nSolution: First find the eigenvalues using det(A−λI)=0. Then find enough linearly independent eigenvectors to form P. If A is diagonalizable, write A=PDP⁻¹, where D contains eigenvalues on its diagonal. Then A^k=PD^kP⁻¹. Since D is diagonal, calculating D^k only requires raising each diagonal eigenvalue to the kth power.\n\nJustification: Diagonalization converts repeated multiplication into simpler scalar operations.\n\nConclusion: Eigenvalues and diagonalization can significantly simplify repeated matrix transformations and are useful in computational applications."
));
/* =========================================================
   ADD 4 MISSING FINAL QUESTIONS
   ========================================================= */

questions.push(
createQuestion(
"MCQ","Easy",3,"Vector Spaces",1,
"Which of the following is the zero vector in R²?",
"The correct answer is (0,0). The zero vector is the additive identity because adding it to any vector leaves the vector unchanged.",
["(1,0)","(0,1)","(0,0)","(1,1)"],
"(0,0)"
));

questions.push(
createQuestion(
"Short","Easy",4,"Basis and Dimension",2,
"What is the dimension of a vector space?",
"The dimension of a vector space is the number of vectors in any basis of that vector space. A basis must span the complete vector space and must also be linearly independent. For example, the standard basis of R² is {(1,0),(0,1)}, which contains two independent vectors and spans R². Therefore, the dimension of R² is 2. Dimension tells us the number of independent directions required to represent every vector in the space."
));

questions.push(
createQuestion(
"Long","Easy",1,"Matrix Algebra",5,
"Explain the transpose of a matrix and discuss its important properties with an example.",
"The transpose of a matrix is obtained by changing its rows into columns and its columns into rows. If A is a matrix, its transpose is represented by Aᵀ. For example, if A=[[1,2,3],[4,5,6]], then Aᵀ=[[1,4],[2,5],[3,6]]. Therefore, a 2×3 matrix becomes a 3×2 matrix after transposition. Important properties include (Aᵀ)ᵀ=A, (A+B)ᵀ=Aᵀ+Bᵀ, and (kA)ᵀ=kAᵀ. For matrix multiplication, (AB)ᵀ=BᵀAᵀ. A matrix is symmetric when Aᵀ=A and skew-symmetric when Aᵀ=−A. Transpose is widely used in matrix calculations, linear algebra, statistics and computer applications."
));

questions.push(
createQuestion(
"Long","Easy",2,"Determinants",5,
"Explain the minor and cofactor of an element of a matrix with a suitable example.",
"The minor of an element is obtained by deleting the row and column containing that element and calculating the determinant of the remaining matrix. For example, consider A=[[1,2],[3,4]]. The minor of element 1 is the determinant of the remaining matrix [4], so its minor is 4. A cofactor is obtained by multiplying the minor by the sign (-1)^(i+j), where i and j represent the row and column positions. Therefore, the cofactor of element 1 at position (1,1) is +4. The signs of cofactors follow the pattern +,−,+ / −,+,− / +,−,+. Minors and cofactors are important for calculating determinants of higher-order matrices and for finding the adjoint and inverse of a matrix."
));

/* =========================================================
   FINAL QUALITY ANSWER FIX
   ========================================================= */

const detailedAnswers = {

"Define a square matrix and give an example.": `
A square matrix is a matrix in which the number of rows is equal to the number of columns. If a matrix has n rows and n columns, it is called an n × n square matrix.

For example:
A = [[2, 3],
     [4, 5]]

This matrix has 2 rows and 2 columns, so it is a square matrix of order 2 × 2.

Square matrices are important because operations such as determinant, inverse, eigenvalues and diagonalization are defined mainly for square matrices. A square matrix may also be classified as an identity, diagonal, symmetric or triangular matrix depending on the arrangement of its elements.
`,

"What is a diagonal matrix? Give an example.": `
A diagonal matrix is a square matrix in which every element outside the principal diagonal is zero.

For example:
A = [[4, 0, 0],
     [0, 7, 0],
     [0, 0, 9]]

Here the diagonal elements are 4, 7 and 9, while all other elements are zero. Therefore, A is a diagonal matrix.

An identity matrix is a special type of diagonal matrix in which every diagonal element is 1.

Diagonal matrices are useful because matrix multiplication, determinant calculation and inverse calculation become simpler. The determinant of a diagonal matrix is equal to the product of its diagonal elements.
`,

"Define the determinant of a 2 × 2 matrix.": `
The determinant is a scalar value associated with a square matrix. It provides important information about the matrix, such as whether the matrix is invertible.

For a 2 × 2 matrix:

A = [[a, b],
     [c, d]]

the determinant is calculated as:

det(A) = ad − bc.

For example, consider:

A = [[2, 3],
     [4, 5]]

Then:

det(A) = (2 × 5) − (3 × 4)
       = 10 − 12
       = −2.

Since the determinant is non-zero, the matrix is non-singular and its inverse exists.

If det(A) = 0, the matrix is singular and does not have an ordinary inverse.
`,

"Explain when a square matrix is invertible.": `
A square matrix is invertible if there exists another matrix A⁻¹ such that:

AA⁻¹ = A⁻¹A = I,

where I is the identity matrix.

The main condition for a square matrix to be invertible is:

det(A) ≠ 0.

If det(A) = 0, the matrix is singular and its inverse does not exist.

For example, consider:

A = [[2, 3],
     [1, 2]]

det(A) = (2 × 2) − (3 × 1)
       = 4 − 3
       = 1.

Since det(A) ≠ 0, matrix A is invertible.

An invertible matrix is also called a non-singular matrix. Inverse matrices are useful for solving systems of linear equations and many mathematical and engineering problems.
`,

"Explain the conditions for no solution and infinitely many solutions.": `
For a system of linear equations, the rank of the coefficient matrix and the augmented matrix can be used to determine the nature of the solutions.

Let A be the coefficient matrix and [A|B] be the augmented matrix.

1. No Solution:
If rank(A) is not equal to rank([A|B]), the system is inconsistent and has no solution.

For example, an equation such as:
x + y = 2
x + y = 5

cannot be satisfied simultaneously. Therefore, there is no solution.

2. Infinitely Many Solutions:
If rank(A) = rank([A|B]) but this common rank is less than the number of unknown variables, the system has infinitely many solutions.

For example, if a system contains three variables but the rank of both matrices is 2, then one variable can be chosen freely and infinitely many solutions are possible.

Thus, comparing the two ranks provides a systematic way to determine whether a system has a unique solution, no solution or infinitely many solutions.
`,

"What is a basis of a vector space?": `
A basis of a vector space is a set of vectors that satisfies two conditions: the vectors are linearly independent and they span the entire vector space.

For example, the standard basis of R² is:

{(1,0), (0,1)}.

Any vector (x,y) in R² can be written as:

(x,y) = x(1,0) + y(0,1).

The two basis vectors are linearly independent because neither can be expressed as a scalar multiple of the other.

The number of vectors in a basis is called the dimension of the vector space. Therefore, the dimension of R² is 2.

A basis is important because it provides the minimum set of independent vectors required to represent every vector in the space.
`,

"Define eigenvalue and eigenvector.": `
Let A be a square matrix. A non-zero vector X is called an eigenvector of A if multiplication of A by X produces a scalar multiple of X.

The relationship is:

AX = λX,

where λ is called the eigenvalue corresponding to the eigenvector X.

To find eigenvalues, we solve the characteristic equation:

det(A − λI) = 0.

For example, for:

A = [[2,0],
     [0,3]],

the eigenvalues are 2 and 3.

For λ = 2, an eigenvector is (1,0), and for λ = 3, an eigenvector is (0,1).

Eigenvalues and eigenvectors are important in diagonalization, differential equations, computer graphics, physics, engineering and many applications of linear algebra.
`,

"Explain the rank method for determining the consistency of a system of linear equations.": `
The rank method provides a systematic way to determine whether a system of linear equations is consistent and how many solutions it has.

Let A be the coefficient matrix and [A|B] be the augmented matrix. Let n represent the number of unknown variables.

The following conditions are used:

1. Unique Solution:
If rank(A) = rank([A|B]) = n, the system has a unique solution.

2. Infinitely Many Solutions:
If rank(A) = rank([A|B]) < n, the system has infinitely many solutions.

3. No Solution:
If rank(A) ≠ rank([A|B]), the system is inconsistent and has no solution.

The ranks can be calculated by converting the matrices into row-echelon form and counting their non-zero rows.

Therefore, the rank method is useful for classifying systems before actually calculating their solutions.
`,

"Explain diagonalization of a matrix and state the condition under which it is possible.": `
Diagonalization is the process of expressing a square matrix A in the form:

A = PDP⁻¹,

where D is a diagonal matrix and P is a matrix whose columns are eigenvectors of A.

The diagonal entries of D are the corresponding eigenvalues of A.

The main condition for diagonalization is that the matrix must have enough linearly independent eigenvectors. For an n × n matrix, n linearly independent eigenvectors are required.

The procedure is:

1. Find the eigenvalues by solving det(A − λI) = 0.
2. Find an eigenvector corresponding to each eigenvalue.
3. Check that the eigenvectors are linearly independent.
4. Form P using the eigenvectors as columns.
5. Form D using the corresponding eigenvalues on the diagonal.
6. Then A = PDP⁻¹.

Diagonalization simplifies many calculations involving powers of matrices and is useful in differential equations, systems modelling and numerical analysis.
`,

"Explain the relationship between eigenvalues, determinant, trace and characteristic": `
Eigenvalues of a square matrix are closely related to its determinant and trace.

The eigenvalues are obtained from the characteristic equation:

det(A − λI) = 0.

For an n × n matrix, if the eigenvalues are λ₁, λ₂, ..., λₙ, then the determinant of A is equal to their product:

det(A) = λ₁λ₂...λₙ.

The trace of A, which is the sum of its principal diagonal elements, is equal to the sum of its eigenvalues:

tr(A) = λ₁ + λ₂ + ... + λₙ.

For example, if a 2 × 2 matrix has eigenvalues 2 and 3, then:

det(A) = 2 × 3 = 6

and:

tr(A) = 2 + 3 = 5.

These relationships provide useful checks when calculating eigenvalues and are important in matrix theory, differential equations and mathematical modelling.
`,

"Find the magnitude of vector v=(3,4).": `
Given:

v = (3,4)

Formula for magnitude of a two-dimensional vector:

|v| = √(x² + y²)

Substitute x = 3 and y = 4:

|v| = √(3² + 4²)

= √(9 + 16)

= √25

= 5.

Therefore, the magnitude of vector v is 5.
`,

"Find the eigenvalues of A=[[2,0],[0,3]].": `
Given:

A = [[2,0],
     [0,3]]

To find the eigenvalues, use the characteristic equation:

det(A − λI) = 0.

Therefore:

A − λI = [[2−λ,0],
           [0,3−λ]]

Taking the determinant:

(2−λ)(3−λ) = 0.

Therefore:

λ = 2 or λ = 3.

Hence, the eigenvalues of A are:

λ₁ = 2
λ₂ = 3.

Since the matrix is diagonal, its diagonal elements are directly its eigenvalues.
`,

"Find the eigenvalues of A=[[4,1],[2,3]].": `
Given:

A = [[4,1],
     [2,3]]

The characteristic equation is:

det(A − λI) = 0.

Therefore:

A − λI = [[4−λ,1],
           [2,3−λ]]

Taking the determinant:

(4−λ)(3−λ) − (1×2) = 0.

Expanding:

12 − 7λ + λ² − 2 = 0

λ² − 7λ + 10 = 0

Factorizing:

(λ−5)(λ−2) = 0.

Therefore:

λ = 5 or λ = 2.

Hence, the eigenvalues of the matrix are 5 and 2.
`,

"Given A=[[2,3],[4,5]] and B=[[1,2],[3,4]], calculate A+B.": `
Given:

A = [[2,3],
     [4,5]]

B = [[1,2],
     [3,4]]

Method:
Matrix addition is performed by adding corresponding elements.

A + B = [[2+1, 3+2],
          [4+3, 5+4]]

= [[3,5],
   [7,9]].

Therefore, the final answer is:

A + B = [[3,5],[7,9]].
`,

"Multiply the matrix A=[[1,2],[3,4]] by the scalar 3.": `
Given:

A = [[1,2],
     [3,4]]

Scalar = 3.

Method:
Multiply every element of the matrix by 3.

3A = [[3×1,3×2],
      [3×3,3×4]]

= [[3,6],
   [9,12]].

Therefore:

3A = [[3,6],[9,12]].
`,

"Calculate AB for A=[[1,2],[3,4]] and B=[[2,0],[1,3]].": `
Given:

A = [[1,2],
     [3,4]]

B = [[2,0],
     [1,3]]

Method:
Multiply each row of A by each column of B.

AB = [[(1×2)+(2×1), (1×0)+(2×3)],
      [(3×2)+(4×1), (3×0)+(4×3)]]

= [[4,6],
   [10,12]].

Therefore:

AB = [[4,6],[10,12]].
`,

"Find the determinant of [[1,2,3],[0,4,5],[1,0,6]].": `
Given:

A = [[1,2,3],
     [0,4,5],
     [1,0,6]]

Using expansion along the first row:

det(A) = 1(4×6 − 5×0)
         − 2(0×6 − 5×1)
         + 3(0×0 − 4×1)

= 1(24) − 2(−5) + 3(−4)

= 24 + 10 − 12

= 22.

Therefore:

det(A) = 22.

Since the determinant is non-zero, the matrix is non-singular and its inverse exists.
`,

"Find the rank of [[1,2,3],[2,4,6],[1,1,1]].": `
Given:

A = [[1,2,3],
     [2,4,6],
     [1,1,1]]

Apply elementary row operations.

R₂ → R₂ − 2R₁:

[[1,2,3],
 [0,0,0],
 [1,1,1]]

Now:

R₃ → R₃ − R₁:

[[1,2,3],
 [0,0,0],
 [0,−1,−2]]

Rearranging the non-zero rows gives row-echelon form with two non-zero rows.

Therefore:

Rank(A) = 2.

Hence, the matrix has two linearly independent rows.
`,

"Find the eigenvalues of A=[[4,1],[2,3]].": `
Given:

A = [[4,1],
     [2,3]]

Characteristic equation:

det(A − λI) = 0

(4−λ)(3−λ) − 2 = 0

12 − 7λ + λ² − 2 = 0

λ² − 7λ + 10 = 0

(λ−5)(λ−2) = 0

Therefore:

λ₁ = 5
λ₂ = 2.

Hence, the eigenvalues are 5 and 2.
`,

"Find the eigenvalues of A=[[2,0],[0,3]].": `
Given:

A = [[2,0],
     [0,3]]

Characteristic equation:

det(A − λI) = 0

(2−λ)(3−λ) = 0.

Therefore:

λ₁ = 2
λ₂ = 3.

Hence, the eigenvalues of the diagonal matrix are 2 and 3.
`,

"A software system uses a 2×2 transformation matrix. Explain how the determinant": `
A determinant can be used to understand important properties of a two-dimensional transformation represented by a 2×2 matrix.

Consider a transformation matrix:

A = [[a,b],
     [c,d]]

Its determinant is:

det(A) = ad − bc.

The absolute value of the determinant represents the factor by which areas are scaled by the transformation. For example, if |det(A)| = 2, an area is doubled after transformation.

If det(A) = 0, the transformation is singular. In this case, the transformation compresses the plane into a lower-dimensional form and an inverse transformation does not exist.

If the determinant is negative, the transformation also reverses orientation.

Therefore, the determinant helps determine whether a transformation is invertible and how it changes area.
`
};

/* Apply detailed answers without changing questions,
   question types, marks or difficulty distribution. */

for (const q of questions) {
    if (detailedAnswers[q.question]) {
        q.answer = detailedAnswers[q.question].trim();
    }
}

/* Improve remaining short answers that were flagged as brief. */
for (const q of questions) {

    if (q.question === "Define a square matrix and give an example.") {
        q.answer = detailedAnswers["Define a square matrix and give an example."].trim();
    }

    if (q.question === "What is a diagonal matrix? Give an example.") {
        q.answer = detailedAnswers["What is a diagonal matrix? Give an example."].trim();
    }

    if (q.question === "Define the determinant of a 2 × 2 matrix.") {
        q.answer = detailedAnswers["Define the determinant of a 2 × 2 matrix."].trim();
    }

    if (q.question === "Explain when a square matrix is invertible.") {
        q.answer = detailedAnswers["Explain when a square matrix is invertible."].trim();
    }

    if (q.question === "Explain the conditions for no solution and infinitely many solutions.") {
        q.answer = detailedAnswers["Explain the conditions for no solution and infinitely many solutions."].trim();
    }

    if (q.question === "What is a basis of a vector space?") {
        q.answer = detailedAnswers["What is a basis of a vector space?"].trim();
    }

    if (q.question === "Define eigenvalue and eigenvector.") {
        q.answer = detailedAnswers["Define eigenvalue and eigenvector."].trim();
    }
}

/* =========================================================
   VALIDATION FUNCTIONS
   ========================================================= */

function countByField(list, field) {
    const result = {};

    for (const item of list) {
        result[item[field]] = (result[item[field]] || 0) + 1;
    }

    return result;
}

function normalizeQuestion(text) {
    return String(text)
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim();
}

function validateQuestions() {

    console.log("");
    console.log("================================================");
    console.log("LINEAR ALGEBRA FINAL GENERATOR");
    console.log("================================================");

    console.log("Questions prepared :", questions.length);

    const errors = [];
    const warnings = [];

    /* Total */

    if (questions.length !== 100) {
        errors.push(
            `Total questions should be 100 but found ${questions.length}.`
        );
    }

    /* Type validation */

    const typeCounts = countByField(questions, "questionType");

    console.log("");
    console.log("QUESTION TYPE DISTRIBUTION");
    console.log(typeCounts);

    for (const [type, expected] of Object.entries(TARGET_TYPES)) {

        const actual = typeCounts[type] || 0;

        if (actual !== expected) {
            errors.push(
                `${type}: expected ${expected}, found ${actual}.`
            );
        }
    }

    /* Difficulty */

    const difficultyCounts = countByField(
        questions,
        "difficulty"
    );

    console.log("");
    console.log("DIFFICULTY DISTRIBUTION");
    console.log(difficultyCounts);

    for (const [difficulty, expected] of Object.entries(TARGET_DIFFICULTY)) {

        const actual = difficultyCounts[difficulty] || 0;

        if (actual !== expected) {
            errors.push(
                `${difficulty}: expected ${expected}, found ${actual}.`
            );
        }
    }

    /* Required fields */

    for (let i = 0; i < questions.length; i++) {

        const q = questions[i];

        const required = [
            "subject",
            "subjectCode",
            "semester",
            "unit",
            "topic",
            "questionType",
            "difficulty",
            "marks",
            "question",
            "answer"
        ];

        for (const field of required) {

            if (
                q[field] === undefined ||
                q[field] === null ||
                String(q[field]).trim() === ""
            ) {
                errors.push(
                    `Question ${i + 1}: missing ${field}.`
                );
            }
        }
    }

    /* Duplicate check */

    const duplicateMap = new Map();

    for (const q of questions) {

        const key = normalizeQuestion(q.question);

        if (!duplicateMap.has(key)) {
            duplicateMap.set(key, []);
        }

        duplicateMap.get(key).push(q);
    }

    let duplicateGroups = 0;

    for (const [key, list] of duplicateMap.entries()) {

        if (list.length > 1) {
            duplicateGroups++;
            errors.push(
                `Duplicate question found: ${list[0].question}`
            );
        }
    }

    console.log("");
    console.log("DUPLICATE GROUPS :", duplicateGroups);

    /* Answer quality */

    for (const q of questions) {

        const answerLength = String(q.answer).length;

        if (q.questionType === "Short" && answerLength < 300) {
            warnings.push(
                `Short answer may be too brief: ${q.question.substring(0, 80)}`
            );
        }

        if (q.questionType === "Long" && answerLength < 650) {
            warnings.push(
                `Long answer may be too brief: ${q.question.substring(0, 80)}`
            );
        }

        if (q.questionType === "Numerical" && answerLength < 180) {
            warnings.push(
                `Numerical solution may need more steps: ${q.question.substring(0, 80)}`
            );
        }

        if (q.questionType === "Programming") {

            if (
                !q.answer.includes("#include") &&
                !q.answer.includes("C++ Code")
            ) {
                errors.push(
                    `Programming question has no complete C++ code: ${q.question}`
                );
            }
        }

        if (q.questionType === "Case Study" && answerLength < 600) {
            warnings.push(
                `Case study answer may be too brief: ${q.question.substring(0, 80)}`
            );
        }
    }

    console.log("");
    console.log("HARD ERRORS :", errors.length);
    console.log("QUALITY WARNINGS :", warnings.length);

    if (errors.length > 0) {

        console.log("");
        console.log("================================================");
        console.log("VALIDATION FAILED");
        console.log("DATABASE WILL NOT BE CHANGED");
        console.log("================================================");

        errors.forEach((error, index) => {
            console.log(`${index + 1}. ${error}`);
        });

        return false;
    }

    console.log("");
    console.log("================================================");
    console.log("VALIDATION PASSED");
    console.log("================================================");

    if (warnings.length > 0) {

        console.log("");
        console.log("QUALITY WARNINGS:");

        warnings.forEach((warning, index) => {
            console.log(`${index + 1}. ${warning}`);
        });

    } else {

        console.log("No quality warnings found.");

    }

    return true;
}

/* =========================================================
   MONGODB INSTALLATION
   ========================================================= */

async function installQuestions() {

    const isValid = validateQuestions();

    if (!isValid) {
        return;
    }

    console.log("");
    console.log("================================================");
    console.log("SAFE MODE");
    console.log("================================================");

    console.log(
        "Database will NOT be changed automatically."
    );

    console.log(
        "To install this set, use:"
    );

    console.log(
        "$env:INSTALL_LINEAR_ALGEBRA='YES'"
    );

    console.log(
        "Then run the file again."
    );

    if (process.env.INSTALL_LINEAR_ALGEBRA !== "YES") {

        console.log("");
        console.log("SAFE MODE COMPLETE.");
        console.log("Existing Linear Algebra questions are untouched.");

        return;
    }

    const client = new MongoClient(MONGO_URI);

    try {

        await client.connect();

        console.log("");
        console.log("MongoDB Connected Successfully!");

        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTION);

        const oldQuestions = await collection
            .find({
                subject: SUBJECT
            })
            .toArray();

        console.log(
            "Existing Linear Algebra questions :",
            oldQuestions.length
        );

        /*
          Backup is NOT deleted by this script.
          Only Linear Algebra documents are replaced.
        */

        if (oldQuestions.length > 0) {

            await collection.deleteMany({
                subject: SUBJECT
            });

            console.log(
                "Old Linear Algebra questions removed :",
                oldQuestions.length
            );
        }

        await collection.insertMany(questions);

        console.log(
            "New Linear Algebra questions inserted :",
            questions.length
        );

        const finalCount = await collection.countDocuments({
            subject: SUBJECT
        });

        console.log(
            "Final Linear Algebra database count :",
            finalCount
        );

        if (finalCount === 100) {

            console.log("");
            console.log("================================================");
            console.log("LINEAR ALGEBRA INSTALLATION SUCCESSFUL");
            console.log("================================================");

        } else {

            console.log("");
            console.log(
                "WARNING: Database count is not 100."
            );
        }

    } catch (error) {

        console.error("");
        console.error("MongoDB ERROR:");
        console.error(error);

    } finally {

        await client.close();

        console.log("");
        console.log("MongoDB connection closed.");
    }
}

/* =========================================================
   START
   ========================================================= */

installQuestions();