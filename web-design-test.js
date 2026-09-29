const { MongoClient } = require("mongodb");

const MONGO_URI = "mongodb://127.0.0.1:27017";
const DB_NAME = "question_paper_generator";
const COLLECTION = "questions";

const questions = [

    // 1
    {
        semester: 1,
        subject: "Web Design",
        subjectCode: "BCA102",
        unit: "Unit 1",
        topic: "HTML Introduction",
        questionType: "MCQ",
        difficulty: "Easy",
        marks: 1,
        question: "Which HTML element is used to define the main heading of a webpage?",
        answer: "<h1> is used to define the main heading of a webpage. HTML provides heading elements from <h1> to <h6>, where <h1> represents the highest-level heading.",
        options: [
            "<heading>",
            "<h1>",
            "<head>",
            "<title>"
        ],
        correctAnswer: "<h1>",
        explanation: "The <h1> element represents the most important heading on an HTML page."
    },

    // 2
    {
        semester: 1,
        subject: "Web Design",
        subjectCode: "BCA102",
        unit: "Unit 1",
        topic: "Semantic HTML",
        questionType: "Short",
        difficulty: "Medium",
        marks: 2,
        question: "What is semantic HTML? Give two examples.",
        answer: "Semantic HTML uses elements whose names clearly describe their meaning and role in a webpage. It improves page structure, accessibility and search-engine understanding. Examples include <header>, <nav>, <main>, <article>, <section> and <footer>.",
        explanation: "Semantic elements make the structure and purpose of webpage content clearer."
    },

    // 3
    {
        semester: 1,
        subject: "Web Design",
        subjectCode: "BCA102",
        unit: "Unit 2",
        topic: "CSS Basics",
        questionType: "Short",
        difficulty: "Easy",
        marks: 2,
        question: "What is CSS and why is it used in web development?",
        answer: "CSS stands for Cascading Style Sheets. It is used to control the presentation of HTML elements, including colors, fonts, spacing, borders, positioning and layout. CSS separates presentation from the HTML document structure.",
        explanation: "CSS provides styling and layout control for webpages."
    },

    // 4
    {
        semester: 1,
        subject: "Web Design",
        subjectCode: "BCA102",
        unit: "Unit 2",
        topic: "CSS Selectors",
        questionType: "MCQ",
        difficulty: "Medium",
        marks: 1,
        question: "Which CSS selector targets an element with the id value 'header'?",
        answer: "The #header selector targets the HTML element whose id attribute is 'header'.",
        options: [
            ".header",
            "#header",
            "header",
            "*header"
        ],
        correctAnswer: "#header",
        explanation: "The # symbol is used for selecting an element by its unique id."
    },

    // 5
    {
        semester: 1,
        subject: "Web Design",
        subjectCode: "BCA102",
        unit: "Unit 2",
        topic: "CSS Box Model",
        questionType: "Long",
        difficulty: "Medium",
        marks: 5,
        question: "Explain the CSS box model with its main components and give a suitable example.",
        answer: "The CSS box model describes how the browser calculates the size and spacing of an HTML element. It consists of four main parts: content, padding, border and margin. Content contains the actual text or element data. Padding creates space between the content and border. Border surrounds the padding and content. Margin creates space outside the border. For example, if a box has width 200px, padding 20px, border 2px and margin 10px, these properties determine its total rendered size and surrounding space. The box model is important for creating accurate webpage layouts.",
        explanation: "The box model is fundamental to controlling element dimensions and spacing in CSS."
    },

    // 6
    {
        semester: 1,
        subject: "Web Design",
        subjectCode: "BCA102",
        unit: "Unit 3",
        topic: "JavaScript Basics",
        questionType: "Programming",
        difficulty: "Easy",
        marks: 5,
        question: "Write a JavaScript program to calculate the sum of two numbers entered by the user.",
        answer: `const first = Number(prompt("Enter first number:"));
const second = Number(prompt("Enter second number:"));

const sum = first + second;

console.log("Sum =", sum);`,
        explanation: "The program converts the two input values into numbers, adds them and displays the result."
    },

    // 7
    {
        semester: 1,
        subject: "Web Design",
        subjectCode: "BCA102",
        unit: "Unit 3",
        topic: "JavaScript DOM",
        questionType: "Long",
        difficulty: "Hard",
        marks: 5,
        question: "Explain the Document Object Model (DOM) and describe how JavaScript can modify HTML content using the DOM.",
        answer: "The Document Object Model represents an HTML document as a tree of objects. Each element, attribute and text portion can be accessed through this structure. JavaScript can use DOM methods such as document.getElementById(), querySelector() and querySelectorAll() to find elements. After selecting an element, JavaScript can modify properties such as textContent, innerHTML, style and attributes. For example, document.getElementById('message').textContent = 'Hello'; changes the text of an element with the id message. DOM manipulation allows webpages to respond dynamically to user actions.",
        explanation: "The DOM provides JavaScript with programmatic access to the structure and content of a webpage."
    },

    // 8
    {
        semester: 1,
        subject: "Web Design",
        subjectCode: "BCA102",
        unit: "Unit 4",
        topic: "HTML Forms",
        questionType: "Numerical",
        difficulty: "Medium",
        marks: 5,
        question: "A registration form contains 4 text fields, 2 radio-button groups and 1 checkbox. How many input controls are represented if each radio-button group contains 3 radio buttons?",
        answer: "There are 4 text fields + (2 × 3 radio buttons) + 1 checkbox = 4 + 6 + 1 = 11 input controls. Therefore, the form contains 11 input controls.",
        explanation: "Each radio-button group contains three individual radio-button controls."
    },

    // 9
    {
        semester: 1,
        subject: "Web Design",
        subjectCode: "BCA102",
        unit: "Unit 5",
        topic: "Responsive Web Design",
        questionType: "Case Study",
        difficulty: "Hard",
        marks: 10,
        question: "A university website looks correct on a desktop but its navigation menu and images overflow on mobile devices. Explain how responsive web design can solve this problem.",
        answer: "The website should use responsive design techniques so that its layout adapts to different screen sizes. CSS media queries can change navigation and layout rules at specific viewport widths. Flexible units such as percentages, rem and vw can reduce fixed-size dependencies. Images should use responsive rules such as max-width: 100% and height: auto. A flexible layout using CSS Flexbox or Grid can rearrange content for smaller screens. The navigation can also change from a horizontal menu to a compact mobile menu. The design should be tested at multiple viewport sizes to ensure that content remains readable and usable without horizontal scrolling.",
        explanation: "Responsive design combines flexible layouts, media queries and scalable content to support different devices."
    },

    // 10
    {
        semester: 1,
        subject: "Web Design",
        subjectCode: "BCA102",
        unit: "Unit 5",
        topic: "Web Accessibility",
        questionType: "Short",
        difficulty: "Easy",
        marks: 2,
        question: "What is web accessibility and why is it important?",
        answer: "Web accessibility means designing websites so that people with different abilities can use them effectively. It includes meaningful HTML structure, keyboard navigation, suitable text alternatives for images, readable content and sufficient contrast. Accessibility improves usability and helps more users access web content.",
        explanation: "Accessible websites are designed to be usable by people with a wide range of abilities and assistive technologies."
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

            const duplicate = await collection.findOne({
                subject: q.subject,
                subjectCode: q.subjectCode,
                unit: q.unit,
                topic: q.topic,
                questionType: q.questionType,
                difficulty: q.difficulty,
                question: q.question
            });

            if (duplicate) {
                console.log(`SKIPPED: ${q.topic}`);
                skipped++;
                continue;
            }

            const document = {
                ...q,
                usedInPapers: [],
                generatedBy: "Web Design Quality Test Generator",
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
        console.log("WEB DESIGN QUALITY TEST COMPLETED");
        console.log("==============================================");
        console.log(`Questions in file : ${questions.length}`);
        console.log(`Inserted          : ${inserted}`);
        console.log(`Skipped           : ${skipped}`);
        console.log("==============================================");

    } catch (error) {

        console.error("ERROR:", error);

    } finally {

        await client.close();

        console.log("MongoDB connection closed.");
    }
}

main();