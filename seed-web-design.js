const dns = require("dns");
const { MongoClient } = require("mongodb");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const MONGO_URI =
    "mongodb+srv://paperforge_user:anEBNxhTnYAQs3mZ@paperforge.c9txst2.mongodb.net/?appName=PaperForge";
const DATABASE_NAME = "PaperForge";
const COLLECTION_NAME = "questions";

const questions = [

    // =========================
    // UNIT 1 - WEB FUNDAMENTALS
    // =========================

    {
        semester: 1,
        subject: "Web Design",
        subjectCode: "BCA102",
        unit: 1,
        topic: "Web Fundamentals",
        questionType: "Short",
        difficulty: "Easy",
        marks: 2,
        question: "What is a website? Explain its basic purpose.",
        answer: "A website is a collection of related web pages available on the Internet under a common domain name. It is used to provide information, services, communication, or other online functionality."
    },

    {
        semester: 1,
        subject: "Web Design",
        subjectCode: "BCA102",
        unit: 1,
        topic: "Internet and Web",
        questionType: "Short",
        difficulty: "Easy",
        marks: 2,
        question: "Differentiate between the Internet and the World Wide Web.",
        answer: "The Internet is a global network of connected computers, while the World Wide Web is a service that runs on the Internet and provides interconnected web pages accessed through browsers."
    },

    {
        semester: 1,
        subject: "Web Design",
        subjectCode: "BCA102",
        unit: 1,
        topic: "Web Architecture",
        questionType: "Long",
        difficulty: "Medium",
        marks: 5,
        question: "Explain the basic working of a web browser and web server.",
        answer: "A browser sends a request to a web server using HTTP or HTTPS. The server processes the request and sends the required resources such as HTML, CSS, JavaScript, and images back to the browser. The browser interprets these resources and displays the web page."
    },

    {
        semester: 1,
        subject: "Web Design",
        subjectCode: "BCA102",
        unit: 1,
        topic: "Web Technologies",
        questionType: "Long",
        difficulty: "Medium",
        marks: 5,
        question: "Explain the roles of HTML, CSS and JavaScript in web development.",
        answer: "HTML defines the structure and content of a web page. CSS controls its appearance, layout and styling. JavaScript adds interactivity and dynamic behavior to the web page."
    },

    // =========================
    // UNIT 2 - HTML
    // =========================

    {
        semester: 1,
        subject: "Web Design",
        subjectCode: "BCA102",
        unit: 2,
        topic: "HTML Basics",
        questionType: "Short",
        difficulty: "Easy",
        marks: 2,
        question: "What is HTML? Why is it used in web development?",
        answer: "HTML stands for HyperText Markup Language. It is used to create the structure and content of web pages using elements and tags."
    },

    {
        semester: 1,
        subject: "Web Design",
        subjectCode: "BCA102",
        unit: 2,
        topic: "HTML Elements",
        questionType: "Short",
        difficulty: "Easy",
        marks: 2,
        question: "What are HTML tags and elements?",
        answer: "HTML tags are markup instructions enclosed in angle brackets. An HTML element generally consists of an opening tag, content and a closing tag, although some elements are empty."
    },

    {
        semester: 1,
        subject: "Web Design",
        subjectCode: "BCA102",
        unit: 2,
        topic: "HTML Forms",
        questionType: "Long",
        difficulty: "Medium",
        marks: 5,
        question: "Explain HTML forms and describe the purpose of common form controls.",
        answer: "HTML forms collect information from users. Common controls include text fields, password fields, radio buttons, checkboxes, select lists and submit buttons. The form data can be sent to a server for processing."
    },

    {
        semester: 1,
        subject: "Web Design",
        subjectCode: "BCA102",
        unit: 2,
        topic: "HTML Tables",
        questionType: "Long",
        difficulty: "Medium",
        marks: 5,
        question: "Explain how tables are created in HTML. Describe the use of table, row and cell elements.",
        answer: "An HTML table is created using the table element. Rows are created using tr, while cells are created using td. Header cells can be created using th. These elements organize information into rows and columns."
    },

    // =========================
    // UNIT 3 - CSS
    // =========================

    {
        semester: 1,
        subject: "Web Design",
        subjectCode: "BCA102",
        unit: 3,
        topic: "CSS Basics",
        questionType: "Short",
        difficulty: "Easy",
        marks: 2,
        question: "What is CSS? What are its advantages?",
        answer: "CSS stands for Cascading Style Sheets. It is used to control the presentation and layout of HTML documents. CSS provides consistent styling, separates content from presentation and makes websites easier to maintain."
    },

    {
        semester: 1,
        subject: "Web Design",
        subjectCode: "BCA102",
        unit: 3,
        topic: "CSS Types",
        questionType: "Short",
        difficulty: "Easy",
        marks: 2,
        question: "What are inline, internal and external CSS?",
        answer: "Inline CSS is written directly inside an HTML element. Internal CSS is written inside a style element in the HTML document. External CSS is stored in a separate stylesheet and linked to the HTML document."
    },

    {
        semester: 1,
        subject: "Web Design",
        subjectCode: "BCA102",
        unit: 3,
        topic: "CSS Selectors",
        questionType: "Long",
        difficulty: "Medium",
        marks: 5,
        question: "Explain CSS selectors with suitable examples.",
        answer: "CSS selectors identify the HTML elements to which styles are applied. Common selectors include element selectors, class selectors and ID selectors. For example, p targets paragraph elements, .menu targets elements with class menu, and #header targets the element with ID header."
    },

    {
        semester: 1,
        subject: "Web Design",
        subjectCode: "BCA102",
        unit: 3,
        topic: "CSS Box Model",
        questionType: "Long",
        difficulty: "Hard",
        marks: 5,
        question: "Explain the CSS box model and its major components.",
        answer: "The CSS box model describes how an HTML element occupies space. Its main components are content, padding, border and margin. Content contains the actual data, padding provides space around the content, border surrounds the padding, and margin provides space outside the border."
    },

    // =========================
    // UNIT 4 - JAVASCRIPT
    // =========================

    {
        semester: 1,
        subject: "Web Design",
        subjectCode: "BCA102",
        unit: 4,
        topic: "JavaScript Basics",
        questionType: "Short",
        difficulty: "Easy",
        marks: 2,
        question: "What is JavaScript? Explain its role in web development.",
        answer: "JavaScript is a programming language commonly used in web development. It adds interactivity and dynamic behavior to web pages, such as form validation, events and dynamic content updates."
    },

    {
        semester: 1,
        subject: "Web Design",
        subjectCode: "BCA102",
        unit: 4,
        topic: "JavaScript Variables",
        questionType: "Short",
        difficulty: "Easy",
        marks: 2,
        question: "What are variables in JavaScript? Name the keywords used to declare them.",
        answer: "Variables store data values in JavaScript. The commonly used declaration keywords are let, const and var."
    },

    {
        semester: 1,
        subject: "Web Design",
        subjectCode: "BCA102",
        unit: 4,
        topic: "DOM",
        questionType: "Long",
        difficulty: "Medium",
        marks: 5,
        question: "Explain the Document Object Model (DOM) and its importance in JavaScript.",
        answer: "The DOM represents an HTML document as a tree of objects. JavaScript can use the DOM to find, modify, add or remove HTML elements and their content, allowing web pages to respond dynamically to user actions."
    },

    {
        semester: 1,
        subject: "Web Design",
        subjectCode: "BCA102",
        unit: 4,
        topic: "JavaScript Events",
        questionType: "Long",
        difficulty: "Hard",
        marks: 5,
        question: "Explain JavaScript events and event handling with an example.",
        answer: "An event is an action that occurs in a web page, such as a click, key press or form submission. JavaScript can respond to these events using event handlers or event listeners. For example, a click event can execute a function when a button is pressed."
    },

    // =========================
    // UNIT 5 - RESPONSIVE WEB
    // =========================

    {
        semester: 1,
        subject: "Web Design",
        subjectCode: "BCA102",
        unit: 5,
        topic: "Responsive Design",
        questionType: "Short",
        difficulty: "Easy",
        marks: 2,
        question: "What is responsive web design?",
        answer: "Responsive web design is an approach in which a website automatically adapts its layout and content to different screen sizes and devices."
    },

    {
        semester: 1,
        subject: "Web Design",
        subjectCode: "BCA102",
        unit: 5,
        topic: "Media Queries",
        questionType: "Short",
        difficulty: "Medium",
        marks: 2,
        question: "What are CSS media queries?",
        answer: "Media queries are CSS rules used to apply different styles depending on conditions such as screen width, height or device characteristics."
    },

    {
        semester: 1,
        subject: "Web Design",
        subjectCode: "BCA102",
        unit: 5,
        topic: "Responsive Layout",
        questionType: "Long",
        difficulty: "Medium",
        marks: 5,
        question: "Explain the importance of responsive design for modern websites.",
        answer: "Responsive design allows websites to work effectively across desktops, laptops, tablets and mobile devices. It improves usability, accessibility and consistency across different screen sizes."
    },

    {
        semester: 1,
        subject: "Web Design",
        subjectCode: "BCA102",
        unit: 5,
        topic: "Web Design Case Study",
        questionType: "Case Study",
        difficulty: "Hard",
        marks: 5,
        question: "A college website looks correct on a desktop but its navigation and content overlap on mobile devices. Identify the likely web design issues and explain how responsive design can solve them.",
        answer: "The problems may result from fixed widths, unsuitable positioning and lack of responsive layout rules. Responsive CSS, flexible layouts, appropriate media queries and mobile-friendly navigation can adapt the website to smaller screens."
    }

];

async function seedWebDesign() {

    const client = new MongoClient(
        MONGO_URI,
        {
            tls: true
        }
    );

    try {

        console.log("======================================");
        console.log(" WEB DESIGN QUESTION BANK SEEDER");
        console.log("======================================");

        await client.connect();

        console.log("MongoDB Connected Successfully!");

        const database = client.db(DATABASE_NAME);
        const collection = database.collection(COLLECTION_NAME);

        console.log("Database:", DATABASE_NAME);
        console.log("Collection:", COLLECTION_NAME);
        console.log("Questions received:", questions.length);

        let inserted = 0;
        let skipped = 0;

        for (const question of questions) {

            const existing = await collection.findOne({
                subject: question.subject,
                subjectCode: question.subjectCode,
                unit: question.unit,
                topic: question.topic,
                question: question.question
            });

            if (existing) {

                skipped++;

                console.log(
                    "SKIPPED:",
                    question.question.substring(0, 70)
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
                question.question.substring(0, 70)
            );
        }

        const total = await collection.countDocuments({
            subject: "Web Design",
            subjectCode: "BCA102"
        });

        console.log("======================================");
        console.log(" WEB DESIGN IMPORT COMPLETED");
        console.log("======================================");
        console.log("Inserted :", inserted);
        console.log("Skipped  :", skipped);
        console.log("Total Web Design Questions:", total);
        console.log("======================================");

    } catch (error) {

        console.error("ERROR:", error);

    } finally {

        await client.close();

        console.log("MongoDB connection closed.");
    }
}

seedWebDesign();