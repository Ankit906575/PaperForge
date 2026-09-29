/*
========================================================
QUESTION PAPER GENERATOR SYSTEM
SUBJECT + UNIT + TOPIC MASTER DATA
========================================================

24 Subjects
5 Units per Subject
Multiple Topics per Unit

Target:
1000 Questions / Subject
24 Subjects
Total = 24,000 Questions
========================================================
*/

const SUBJECT_TOPICS = {

    // ==================================================
    // SEMESTER 1
    // ==================================================

    "Linear Algebra": {

        semester: "1",
        subjectCode: "BCA101",

        units: {

            "Unit 1": [
                "Introduction to Matrices",
                "Types of Matrices",
                "Matrix Addition and Subtraction",
                "Scalar Multiplication",
                "Matrix Multiplication",
                "Transpose of a Matrix",
                "Symmetric and Skew-Symmetric Matrices",
                "Determinants",
                "Properties of Determinants",
                "Minors and Cofactors",
                "Adjoint of a Matrix",
                "Inverse of a Matrix"
            ],

            "Unit 2": [
                "Linear Equations",
                "Homogeneous Equations",
                "Non-Homogeneous Equations",
                "Matrix Representation",
                "Gaussian Elimination",
                "Gauss-Jordan Elimination",
                "Consistency of Linear Equations",
                "Rank of a Matrix",
                "Inverse Matrix Method",
                "Cramer's Rule",
                "Applications of Linear Equations"
            ],

            "Unit 3": [
                "Vectors",
                "Vector Spaces",
                "Subspaces",
                "Linear Combination",
                "Linear Dependence",
                "Linear Independence",
                "Spanning Sets",
                "Basis",
                "Dimension",
                "Coordinates Relative to a Basis",
                "Row Space",
                "Column Space"
            ],

            "Unit 4": [
                "Linear Transformations",
                "Properties of Linear Transformations",
                "Kernel",
                "Image",
                "Range",
                "Matrix Representation",
                "Composition of Transformations",
                "Invertible Transformations",
                "Rank-Nullity Theorem",
                "Change of Basis",
                "Applications of Linear Transformations"
            ],

            "Unit 5": [
                "Eigenvalues",
                "Eigenvectors",
                "Characteristic Equation",
                "Finding Eigenvalues",
                "Finding Eigenvectors",
                "Algebraic Multiplicity",
                "Geometric Multiplicity",
                "Diagonalization",
                "Conditions for Diagonalization",
                "Cayley-Hamilton Theorem",
                "Applications of Eigenvalues and Eigenvectors"
            ]

        }

    },


    "Web Design": {

        semester: "1",
        subjectCode: "BCA102",

        units: {

            "Unit 1": [
                "Internet and World Wide Web",
                "Web Browsers",
                "Web Servers",
                "Web Architecture",
                "HTML Introduction",
                "HTML Document Structure",
                "HTML Elements",
                "HTML Attributes",
                "Headings and Paragraphs",
                "Lists",
                "Links",
                "Images"
            ],

            "Unit 2": [
                "HTML Tables",
                "HTML Forms",
                "Input Elements",
                "Form Validation",
                "Semantic HTML",
                "Audio and Video",
                "HTML5 Features",
                "Frames",
                "Meta Tags",
                "Accessibility",
                "HTML Best Practices"
            ],

            "Unit 3": [
                "CSS Introduction",
                "CSS Syntax",
                "Selectors",
                "Colors",
                "Backgrounds",
                "Fonts",
                "Text Properties",
                "Borders",
                "Margins",
                "Padding",
                "Box Model",
                "Display Properties"
            ],

            "Unit 4": [
                "CSS Positioning",
                "Flexbox",
                "CSS Grid",
                "Responsive Design",
                "Media Queries",
                "Transitions",
                "Transforms",
                "Animations",
                "Pseudo Classes",
                "Pseudo Elements",
                "CSS Variables"
            ],

            "Unit 5": [
                "JavaScript Introduction",
                "Variables",
                "Data Types",
                "Operators",
                "Conditional Statements",
                "Loops",
                "Functions",
                "Arrays",
                "Objects",
                "DOM",
                "Events",
                "Form Validation"
            ]

        }

    },


    "Computer System Organisation": {

        semester: "1",
        subjectCode: "BCA103",

        units: {

            "Unit 1": [
                "Computer Organization",
                "Computer Architecture",
                "Functional Units",
                "CPU",
                "Memory",
                "Input Devices",
                "Output Devices",
                "System Bus",
                "Registers",
                "Instruction Cycle"
            ],

            "Unit 2": [
                "Number Systems",
                "Binary Number System",
                "Decimal Number System",
                "Octal Number System",
                "Hexadecimal Number System",
                "Number System Conversion",
                "Binary Arithmetic",
                "Complements",
                "Signed Numbers",
                "Floating Point Representation"
            ],

            "Unit 3": [
                "Boolean Algebra",
                "Logic Gates",
                "AND Gate",
                "OR Gate",
                "NOT Gate",
                "NAND Gate",
                "NOR Gate",
                "XOR Gate",
                "XNOR Gate",
                "Karnaugh Map"
            ],

            "Unit 4": [
                "Memory Organization",
                "Primary Memory",
                "Secondary Memory",
                "RAM",
                "ROM",
                "Cache Memory",
                "Virtual Memory",
                "Memory Hierarchy",
                "Associative Memory",
                "Cache Mapping"
            ],

            "Unit 5": [
                "Input Output Organization",
                "I/O Interface",
                "Programmed I/O",
                "Interrupt Driven I/O",
                "DMA",
                "Interrupts",
                "Instruction Formats",
                "Addressing Modes",
                "RISC",
                "CISC"
            ]

        }

    },


    "Programming for Problem Solving": {

        semester: "1",
        subjectCode: "BCA104",

        units: {

            "Unit 1": [
                "Problem Solving",
                "Algorithms",
                "Flowcharts",
                "Programming Languages",
                "C Language Introduction",
                "Structure of C Program",
                "Variables",
                "Constants",
                "Data Types",
                "Operators"
            ],

            "Unit 2": [
                "Input and Output",
                "Conditional Statements",
                "if Statement",
                "if-else Statement",
                "Nested if",
                "switch Statement",
                "Loops",
                "for Loop",
                "while Loop",
                "do-while Loop"
            ],

            "Unit 3": [
                "Functions",
                "Function Declaration",
                "Function Definition",
                "Function Arguments",
                "Return Values",
                "Recursion",
                "Arrays",
                "One Dimensional Arrays",
                "Two Dimensional Arrays",
                "Array Operations"
            ],

            "Unit 4": [
                "Strings",
                "String Functions",
                "Pointers",
                "Pointer Arithmetic",
                "Pointers and Arrays",
                "Pointers and Functions",
                "Structures",
                "Unions",
                "Enumerations",
                "Typedef"
            ],

            "Unit 5": [
                "File Handling",
                "File Opening",
                "File Reading",
                "File Writing",
                "Preprocessor Directives",
                "Macros",
                "Dynamic Memory Allocation",
                "malloc",
                "calloc",
                "realloc",
                "free"
            ]

        }

    },


    "Report Writing": {

        semester: "1",
        subjectCode: "BCA105",

        units: {

            "Unit 1": [
                "Introduction to Report Writing",
                "Purpose of Reports",
                "Types of Reports",
                "Formal Reports",
                "Informal Reports",
                "Report Structure",
                "Report Planning",
                "Audience Analysis"
            ],

            "Unit 2": [
                "Research Process",
                "Information Collection",
                "Primary Data",
                "Secondary Data",
                "Sources of Information",
                "Questionnaires",
                "Interviews",
                "Observation"
            ],

            "Unit 3": [
                "Report Organization",
                "Title Page",
                "Abstract",
                "Introduction",
                "Main Body",
                "Conclusion",
                "Recommendations",
                "References",
                "Appendices"
            ],

            "Unit 4": [
                "Technical Writing",
                "Technical Reports",
                "Project Reports",
                "Laboratory Reports",
                "Business Reports",
                "Progress Reports",
                "Research Reports",
                "Case Reports"
            ],

            "Unit 5": [
                "Editing",
                "Proofreading",
                "Grammar",
                "Clarity",
                "Conciseness",
                "Formatting",
                "Charts and Tables",
                "Report Presentation",
                "Citation",
                "Plagiarism"
            ]

        }

    },


    // ==================================================
    // SEMESTER 2
    // ==================================================

    "Environmental Literature": {

        semester: "2",
        subjectCode: "BCA201",

        units: {

            "Unit 1": [
                "Introduction to Environmental Literature",
                "Nature Writing",
                "Environment and Society",
                "Ecological Awareness",
                "Human-Nature Relationship"
            ],

            "Unit 2": [
                "Environmental Poetry",
                "Nature Poetry",
                "Ecological Themes",
                "Environmental Imagery",
                "Poetry and Conservation"
            ],

            "Unit 3": [
                "Environmental Prose",
                "Essays on Environment",
                "Nature Essays",
                "Environmental Narratives",
                "Ecological Writing"
            ],

            "Unit 4": [
                "Environmental Fiction",
                "Climate Fiction",
                "Environmental Characters",
                "Environmental Conflict",
                "Sustainability in Literature"
            ],

            "Unit 5": [
                "Environmental Ethics",
                "Climate Change",
                "Pollution",
                "Biodiversity",
                "Conservation",
                "Sustainable Development"
            ]

        }

    },


    "Probability": {

        semester: "2",
        subjectCode: "BCA202",

        units: {

            "Unit 1": [
                "Probability Basics",
                "Sample Space",
                "Events",
                "Types of Events",
                "Probability Axioms",
                "Addition Theorem",
                "Multiplication Theorem"
            ],

            "Unit 2": [
                "Conditional Probability",
                "Independent Events",
                "Bayes Theorem",
                "Total Probability",
                "Random Experiments"
            ],

            "Unit 3": [
                "Random Variables",
                "Discrete Random Variables",
                "Continuous Random Variables",
                "Probability Distribution",
                "Probability Mass Function",
                "Probability Density Function"
            ],

            "Unit 4": [
                "Mathematical Expectation",
                "Mean",
                "Variance",
                "Standard Deviation",
                "Moments",
                "Covariance"
            ],

            "Unit 5": [
                "Binomial Distribution",
                "Poisson Distribution",
                "Normal Distribution",
                "Applications of Probability Distributions",
                "Numerical Problems"
            ]

        }

    },


    "Data Structure": {

        semester: "2",
        subjectCode: "BCA203",

        units: {

            "Unit 1": [
                "Introduction to Data Structures",
                "Arrays",
                "One Dimensional Arrays",
                "Two Dimensional Arrays",
                "Sparse Matrices",
                "Linked Lists",
                "Singly Linked List",
                "Doubly Linked List",
                "Circular Linked List"
            ],

            "Unit 2": [
                "Stacks",
                "Stack Operations",
                "Stack Implementation",
                "Applications of Stack",
                "Queues",
                "Queue Operations",
                "Circular Queue",
                "Priority Queue",
                "Deque"
            ],

            "Unit 3": [
                "Searching",
                "Linear Search",
                "Binary Search",
                "Sorting",
                "Bubble Sort",
                "Selection Sort",
                "Insertion Sort",
                "Merge Sort",
                "Quick Sort"
            ],

            "Unit 4": [
                "Trees",
                "Binary Trees",
                "Binary Search Trees",
                "Tree Traversal",
                "Preorder",
                "Inorder",
                "Postorder",
                "AVL Trees",
                "Heap"
            ],

            "Unit 5": [
                "Graphs",
                "Graph Representation",
                "Adjacency Matrix",
                "Adjacency List",
                "Breadth First Search",
                "Depth First Search",
                "Spanning Trees",
                "Minimum Spanning Tree",
                "Graph Applications"
            ]

        }

    },


    "OOPS using C++": {

        semester: "2",
        subjectCode: "BCA204",

        units: {

            "Unit 1": [
                "Object Oriented Programming",
                "Classes",
                "Objects",
                "Data Members",
                "Member Functions",
                "Constructors",
                "Destructors",
                "Access Specifiers"
            ],

            "Unit 2": [
                "Inheritance",
                "Single Inheritance",
                "Multiple Inheritance",
                "Multilevel Inheritance",
                "Hierarchical Inheritance",
                "Hybrid Inheritance",
                "Virtual Base Class"
            ],

            "Unit 3": [
                "Polymorphism",
                "Function Overloading",
                "Operator Overloading",
                "Function Overriding",
                "Virtual Functions",
                "Pure Virtual Functions",
                "Abstract Classes"
            ],

            "Unit 4": [
                "Encapsulation",
                "Abstraction",
                "Friend Functions",
                "Static Members",
                "This Pointer",
                "Templates",
                "Exception Handling"
            ],

            "Unit 5": [
                "File Handling",
                "Streams",
                "Reading Files",
                "Writing Files",
                "STL",
                "Vectors",
                "Stacks",
                "Queues",
                "Maps",
                "Iterators"
            ]

        }

    },


    "Full Stack": {

        semester: "2",
        subjectCode: "BCA205",

        units: {

            "Unit 1": [
                "Full Stack Development",
                "Client Server Architecture",
                "Frontend",
                "Backend",
                "Database",
                "HTTP",
                "HTTPS",
                "REST API"
            ],

            "Unit 2": [
                "HTML",
                "CSS",
                "JavaScript",
                "DOM",
                "Responsive Design",
                "Forms",
                "Web Accessibility"
            ],

            "Unit 3": [
                "Node.js",
                "NPM",
                "Express.js",
                "Middleware",
                "Routing",
                "REST APIs",
                "Error Handling"
            ],

            "Unit 4": [
                "MongoDB",
                "Collections",
                "Documents",
                "CRUD",
                "MongoDB Queries",
                "Indexes",
                "Aggregation",
                "Database Connection"
            ],

            "Unit 5": [
                "Authentication",
                "Authorization",
                "Sessions",
                "Cookies",
                "JWT",
                "API Security",
                "Deployment",
                "Version Control",
                "Git and GitHub"
            ]

        }

    },


    "Database Management System": {

        semester: "2",
        subjectCode: "BCA206",

        units: {

            "Unit 1": [
                "Database Concepts",
                "DBMS",
                "File System vs DBMS",
                "Database Architecture",
                "Data Models",
                "Schema",
                "Instance",
                "Database Users"
            ],

            "Unit 2": [
                "ER Model",
                "Entities",
                "Attributes",
                "Relationships",
                "Cardinality",
                "ER Diagram",
                "Relational Model",
                "Keys"
            ],

            "Unit 3": [
                "SQL",
                "DDL",
                "DML",
                "DCL",
                "TCL",
                "SELECT",
                "INSERT",
                "UPDATE",
                "DELETE",
                "Joins",
                "Subqueries"
            ],

            "Unit 4": [
                "Functional Dependencies",
                "Normalization",
                "First Normal Form",
                "Second Normal Form",
                "Third Normal Form",
                "BCNF",
                "Lossless Decomposition",
                "Dependency Preservation"
            ],

            "Unit 5": [
                "Transactions",
                "ACID Properties",
                "Concurrency Control",
                "Serializability",
                "Deadlocks",
                "Recovery",
                "Database Security",
                "Backup and Recovery"
            ]

        }

    },


    // ==================================================
    // SEMESTER 3
    // ==================================================

    "Discrete Mathematics": {

        semester: "3",
        subjectCode: "BCA301",

        units: {

            "Unit 1": [
                "Sets",
                "Set Operations",
                "Venn Diagrams",
                "Relations",
                "Types of Relations",
                "Functions",
                "Types of Functions"
            ],

            "Unit 2": [
                "Logic",
                "Propositions",
                "Logical Connectives",
                "Truth Tables",
                "Tautology",
                "Contradiction",
                "Logical Equivalence",
                "Predicate Logic"
            ],

            "Unit 3": [
                "Counting",
                "Permutation",
                "Combination",
                "Pigeonhole Principle",
                "Inclusion Exclusion Principle"
            ],

            "Unit 4": [
                "Graph Theory",
                "Graphs",
                "Graph Terminology",
                "Graph Representation",
                "Euler Graph",
                "Hamiltonian Graph",
                "Trees"
            ],

            "Unit 5": [
                "Boolean Algebra",
                "Lattices",
                "Recurrence Relations",
                "Mathematical Induction",
                "Algebraic Structures"
            ]

        }

    },


    "Python Programming": {

        semester: "3",
        subjectCode: "BCA302",

        units: {

            "Unit 1": [
                "Python Introduction",
                "Python Features",
                "Variables",
                "Data Types",
                "Operators",
                "Input and Output",
                "Type Conversion"
            ],

            "Unit 2": [
                "Conditional Statements",
                "if",
                "if-else",
                "Nested if",
                "for Loop",
                "while Loop",
                "break",
                "continue",
                "pass"
            ],

            "Unit 3": [
                "Lists",
                "Tuples",
                "Sets",
                "Dictionaries",
                "Strings",
                "List Comprehension",
                "Dictionary Comprehension"
            ],

            "Unit 4": [
                "Functions",
                "Arguments",
                "Lambda Functions",
                "Recursion",
                "Modules",
                "Packages",
                "Exception Handling"
            ],

            "Unit 5": [
                "File Handling",
                "Object Oriented Programming",
                "Classes",
                "Objects",
                "Inheritance",
                "Polymorphism",
                "NumPy",
                "Pandas"
            ]

        }

    },


    "Digital Marketing": {

        semester: "3",
        subjectCode: "BCA303",

        units: {

            "Unit 1": [
                "Digital Marketing Introduction",
                "Traditional vs Digital Marketing",
                "Digital Marketing Channels",
                "Digital Marketing Strategy",
                "Customer Journey"
            ],

            "Unit 2": [
                "Search Engine Optimization",
                "On Page SEO",
                "Off Page SEO",
                "Keywords",
                "Backlinks",
                "Search Engine Ranking"
            ],

            "Unit 3": [
                "Social Media Marketing",
                "Facebook Marketing",
                "Instagram Marketing",
                "YouTube Marketing",
                "Social Media Strategy",
                "Content Marketing"
            ],

            "Unit 4": [
                "Email Marketing",
                "Email Campaigns",
                "Email Lists",
                "Conversion Rate",
                "Affiliate Marketing",
                "Influencer Marketing"
            ],

            "Unit 5": [
                "Web Analytics",
                "Google Analytics",
                "Digital Advertising",
                "PPC",
                "Display Advertising",
                "Conversion Tracking",
                "Marketing Metrics"
            ]

        }

    },


    "Operating System": {

        semester: "3",
        subjectCode: "BCA304",

        units: {

            "Unit 1": [
                "Operating System Introduction",
                "OS Functions",
                "Types of Operating Systems",
                "System Calls",
                "OS Structure",
                "Process Concept"
            ],

            "Unit 2": [
                "Process Management",
                "Process States",
                "Process Scheduling",
                "FCFS",
                "SJF",
                "Priority Scheduling",
                "Round Robin"
            ],

            "Unit 3": [
                "Threads",
                "Multithreading",
                "Synchronization",
                "Critical Section",
                "Semaphores",
                "Deadlocks",
                "Deadlock Prevention"
            ],

            "Unit 4": [
                "Memory Management",
                "Paging",
                "Segmentation",
                "Virtual Memory",
                "Page Replacement",
                "FIFO",
                "LRU",
                "Optimal Page Replacement"
            ],

            "Unit 5": [
                "File Systems",
                "File Allocation",
                "Directory Structure",
                "Disk Scheduling",
                "FCFS Disk Scheduling",
                "SSTF",
                "SCAN",
                "C-SCAN",
                "Protection and Security"
            ]

        }

    },


    // ==================================================
    // SEMESTER 4
    // ==================================================

    "Machine Learning": {

        semester: "4",
        subjectCode: "BCA401",

        units: {

            "Unit 1": [
                "Machine Learning Introduction",
                "Types of Machine Learning",
                "Supervised Learning",
                "Unsupervised Learning",
                "Reinforcement Learning",
                "Training Data",
                "Testing Data"
            ],

            "Unit 2": [
                "Linear Regression",
                "Multiple Linear Regression",
                "Logistic Regression",
                "Regression Evaluation",
                "Classification"
            ],

            "Unit 3": [
                "Decision Trees",
                "Random Forest",
                "K Nearest Neighbors",
                "Support Vector Machine",
                "Naive Bayes"
            ],

            "Unit 4": [
                "Clustering",
                "K-Means",
                "Hierarchical Clustering",
                "Dimensionality Reduction",
                "PCA",
                "Feature Selection"
            ],

            "Unit 5": [
                "Model Evaluation",
                "Accuracy",
                "Precision",
                "Recall",
                "F1 Score",
                "Confusion Matrix",
                "Overfitting",
                "Underfitting",
                "Cross Validation"
            ]

        }

    },


    "Java": {

        semester: "4",
        subjectCode: "BCA402",

        units: {

            "Unit 1": [
                "Java Introduction",
                "Java Features",
                "JVM",
                "JRE",
                "JDK",
                "Variables",
                "Data Types",
                "Operators"
            ],

            "Unit 2": [
                "Conditional Statements",
                "Loops",
                "Arrays",
                "Strings",
                "Methods",
                "Constructors",
                "Packages"
            ],

            "Unit 3": [
                "Classes",
                "Objects",
                "Inheritance",
                "Polymorphism",
                "Encapsulation",
                "Abstraction",
                "Interfaces"
            ],

            "Unit 4": [
                "Exception Handling",
                "Multithreading",
                "Threads",
                "Synchronization",
                "File Handling",
                "Streams"
            ],

            "Unit 5": [
                "Collections",
                "ArrayList",
                "LinkedList",
                "HashMap",
                "HashSet",
                "Generics",
                "JDBC",
                "Database Connectivity"
            ]

        }

    },


    "Mobile Application": {

        semester: "4",
        subjectCode: "BCA403",

        units: {

            "Unit 1": [
                "Mobile Computing",
                "Mobile Applications",
                "Mobile Operating Systems",
                "Android Introduction",
                "Android Architecture",
                "Android Studio"
            ],

            "Unit 2": [
                "Activities",
                "Activity Lifecycle",
                "Layouts",
                "Views",
                "TextView",
                "Button",
                "EditText",
                "ImageView"
            ],

            "Unit 3": [
                "Intents",
                "Explicit Intent",
                "Implicit Intent",
                "Fragments",
                "Menus",
                "Dialogs",
                "Notifications"
            ],

            "Unit 4": [
                "Data Storage",
                "Shared Preferences",
                "SQLite",
                "Room Database",
                "Content Providers",
                "File Storage"
            ],

            "Unit 5": [
                "Networking",
                "REST APIs",
                "JSON",
                "Internet Permissions",
                "Location Services",
                "Security",
                "Application Deployment"
            ]

        }

    },


    "First Aid and Health": {

        semester: "4",
        subjectCode: "BCA404",

        units: {

            "Unit 1": [
                "First Aid Introduction",
                "Objectives of First Aid",
                "First Aid Kit",
                "Emergency Response",
                "Safety Principles"
            ],

            "Unit 2": [
                "Bleeding",
                "Wounds",
                "Burns",
                "Fractures",
                "Sprains",
                "Strains"
            ],

            "Unit 3": [
                "CPR",
                "Basic Life Support",
                "Choking",
                "Unconsciousness",
                "Shock",
                "Emergency Care"
            ],

            "Unit 4": [
                "Healthy Lifestyle",
                "Nutrition",
                "Balanced Diet",
                "Physical Activity",
                "Sleep",
                "Personal Hygiene"
            ],

            "Unit 5": [
                "Mental Health",
                "Stress Management",
                "Health Awareness",
                "Disease Prevention",
                "Public Health",
                "Emergency Preparedness"
            ]

        }

    },


    "Generative AI": {

        semester: "4",
        subjectCode: "BCA405",

        units: {

            "Unit 1": [
                "Artificial Intelligence Introduction",
                "Generative AI Introduction",
                "AI vs Generative AI",
                "Machine Learning",
                "Deep Learning",
                "Foundation Models"
            ],

            "Unit 2": [
                "Large Language Models",
                "Transformers",
                "Tokenization",
                "Embeddings",
                "Attention Mechanism",
                "Context Window"
            ],

            "Unit 3": [
                "Prompt Engineering",
                "Prompt Design",
                "Zero Shot Prompting",
                "Few Shot Prompting",
                "Chain of Thought",
                "Role Prompting"
            ],

            "Unit 4": [
                "Generative AI Applications",
                "Text Generation",
                "Image Generation",
                "Code Generation",
                "Audio Generation",
                "Video Generation"
            ],

            "Unit 5": [
                "AI Ethics",
                "AI Bias",
                "Hallucination",
                "Privacy",
                "Copyright",
                "Responsible AI",
                "AI Safety"
            ]

        }

    },


    // ==================================================
    // SEMESTER 5
    // ==================================================

    "Computer Networks": {

        semester: "5",
        subjectCode: "BCA501",

        units: {

            "Unit 1": [
                "Computer Networks",
                "Network Types",
                "LAN",
                "MAN",
                "WAN",
                "Network Topologies",
                "Network Models",
                "OSI Model",
                "TCP/IP Model"
            ],

            "Unit 2": [
                "Physical Layer",
                "Transmission Media",
                "Guided Media",
                "Unguided Media",
                "Data Link Layer",
                "Framing",
                "Error Detection",
                "Error Control"
            ],

            "Unit 3": [
                "Flow Control",
                "Stop and Wait",
                "Sliding Window",
                "ARQ",
                "CSMA/CD",
                "CSMA/CA",
                "Ethernet",
                "MAC Address"
            ],

            "Unit 4": [
                "Network Layer",
                "IP Addressing",
                "IPv4",
                "IPv6",
                "Subnetting",
                "Routing",
                "Routing Algorithms",
                "ICMP"
            ],

            "Unit 5": [
                "Transport Layer",
                "TCP",
                "UDP",
                "Congestion Control",
                "Application Layer",
                "DNS",
                "HTTP",
                "FTP",
                "SMTP",
                "DHCP"
            ]

        }

    },


    "Design and Analysis of Algorithms": {

        semester: "5",
        subjectCode: "BCA502",

        units: {

            "Unit 1": [
                "Algorithms",
                "Algorithm Analysis",
                "Time Complexity",
                "Space Complexity",
                "Asymptotic Notations",
                "Big O",
                "Omega",
                "Theta"
            ],

            "Unit 2": [
                "Divide and Conquer",
                "Binary Search",
                "Merge Sort",
                "Quick Sort",
                "Strassen Algorithm"
            ],

            "Unit 3": [
                "Greedy Algorithms",
                "Activity Selection",
                "Knapsack",
                "Huffman Coding",
                "Minimum Spanning Tree",
                "Prim's Algorithm",
                "Kruskal's Algorithm"
            ],

            "Unit 4": [
                "Dynamic Programming",
                "Matrix Chain Multiplication",
                "Longest Common Subsequence",
                "0/1 Knapsack",
                "Optimal Binary Search Tree"
            ],

            "Unit 5": [
                "Graph Algorithms",
                "BFS",
                "DFS",
                "Shortest Path",
                "Dijkstra Algorithm",
                "Bellman Ford",
                "Floyd Warshall",
                "Backtracking",
                "Branch and Bound"
            ]

        }

    },


    "Social Media Analytics": {

        semester: "5",
        subjectCode: "BCA503",

        units: {

            "Unit 1": [
                "Social Media",
                "Social Media Platforms",
                "Social Media Data",
                "Social Media Analytics",
                "Analytics Process"
            ],

            "Unit 2": [
                "Data Collection",
                "Social Media APIs",
                "Web Scraping",
                "Text Data",
                "User Data",
                "Engagement Data"
            ],

            "Unit 3": [
                "Sentiment Analysis",
                "Text Mining",
                "Natural Language Processing",
                "Opinion Mining",
                "Emotion Analysis"
            ],

            "Unit 4": [
                "Social Network Analysis",
                "Nodes",
                "Edges",
                "Centrality",
                "Community Detection",
                "Network Visualization"
            ],

            "Unit 5": [
                "Social Media Metrics",
                "Reach",
                "Engagement",
                "Impressions",
                "Conversion",
                "Influencer Analytics",
                "Social Media Strategy"
            ]

        }

    },


    "Software Engineering and Testing": {

        semester: "5",
        subjectCode: "BCA504",

        units: {

            "Unit 1": [
                "Software Engineering",
                "Software Characteristics",
                "Software Process",
                "SDLC",
                "Waterfall Model",
                "Agile Model",
                "Spiral Model",
                "Prototype Model"
            ],

            "Unit 2": [
                "Requirement Engineering",
                "Functional Requirements",
                "Non Functional Requirements",
                "Requirement Analysis",
                "SRS",
                "Feasibility Study"
            ],

            "Unit 3": [
                "Software Design",
                "Architectural Design",
                "Modular Design",
                "Cohesion",
                "Coupling",
                "UML",
                "Class Diagram",
                "Use Case Diagram"
            ],

            "Unit 4": [
                "Software Testing",
                "Testing Principles",
                "Unit Testing",
                "Integration Testing",
                "System Testing",
                "Acceptance Testing",
                "Black Box Testing",
                "White Box Testing"
            ],

            "Unit 5": [
                "Test Case",
                "Test Plan",
                "Regression Testing",
                "Performance Testing",
                "Security Testing",
                "Test Automation",
                "Debugging",
                "Software Maintenance"
            ]

        }

    }

};


// ======================================================
// HELPER FUNCTIONS
// ======================================================

function getAllSubjects() {

    return Object.keys(
        SUBJECT_TOPICS
    );

}


function getSubject(subjectName) {

    return SUBJECT_TOPICS[
        subjectName
    ];

}


function getAllUnits(subjectName) {

    const subject =
        getSubject(subjectName);

    if (!subject) {
        return [];
    }

    return Object.keys(
        subject.units
    );

}


function getAllTopics(subjectName) {

    const subject =
        getSubject(subjectName);

    if (!subject) {
        return [];
    }

    return Object.values(
        subject.units
    ).flat();

}


// ======================================================
// STATISTICS
// ======================================================

function showMasterDataStatistics() {

    const subjects =
        getAllSubjects();

    let totalUnits = 0;

    let totalTopics = 0;


    console.log("");

    console.log(
        "=============================================="
    );

    console.log(
        "SUBJECT MASTER DATA"
    );

    console.log(
        "=============================================="
    );


    for (const subjectName of subjects) {

        const subject =
            getSubject(subjectName);

        const units =
            getAllUnits(subjectName);

        const topics =
            getAllTopics(subjectName);


        totalUnits += units.length;

        totalTopics += topics.length;


        console.log("");

        console.log(
            `${subject.semester} | ` +
            `${subjectName} | ` +
            `${subject.subjectCode}`
        );

        console.log(
            `Units: ${units.length} | ` +
            `Topics: ${topics.length}`
        );

    }


    console.log("");

    console.log(
        "----------------------------------------------"
    );

    console.log(
        `Total Subjects: ${subjects.length}`
    );

    console.log(
        `Total Units: ${totalUnits}`
    );

    console.log(
        `Total Topics: ${totalTopics}`
    );

    console.log(
        "Target Questions: 24,000"
    );

    console.log(
        "----------------------------------------------"
    );

}


// ======================================================
// RUN STATISTICS
// ======================================================

showMasterDataStatistics();


// ======================================================
// EXPORT
// ======================================================

module.exports = {

    SUBJECT_TOPICS,

    getAllSubjects,

    getSubject,

    getAllUnits,

    getAllTopics

};