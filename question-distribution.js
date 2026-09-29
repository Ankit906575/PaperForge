/*
========================================================
QUESTION PAPER GENERATOR SYSTEM
QUESTION DISTRIBUTION ENGINE
========================================================

Purpose:
1. 24 subjects ke question distribution ko manage karna
2. Har subject = 1000 questions
3. Question type distribution calculate karna
4. Difficulty distribution calculate karna
5. Unit-wise distribution calculate karna
6. Topic-wise distribution calculate karna
7. Complete statistics display karna

TOTAL:
24 Subjects
1000 Questions / Subject
24,000 Questions
========================================================
*/

const {
    SUBJECT_TOPICS,
    getAllSubjects,
    getSubject,
    getAllUnits,
    getAllTopics
} = require("./subject-topics");


// ======================================================
// MAIN CONFIGURATION
// ======================================================

const QUESTIONS_PER_SUBJECT = 1000;

const TOTAL_SUBJECTS = 24;

const TOTAL_TARGET =
    QUESTIONS_PER_SUBJECT * TOTAL_SUBJECTS;


// ======================================================
// QUESTION TYPE DISTRIBUTION
// ======================================================

const QUESTION_TYPE_DISTRIBUTION = {

    MCQ: 250,

    Short: 250,

    Long: 200,

    Numerical: 150,

    Programming: 100,

    "Case Study": 50

};


// ======================================================
// DIFFICULTY DISTRIBUTION
// ======================================================

const DIFFICULTY_DISTRIBUTION = {

    Easy: 300,

    Medium: 400,

    Hard: 300

};


// ======================================================
// QUESTION MARKS
// ======================================================

const QUESTION_TYPE_MARKS = {

    MCQ: 1,

    Short: 2,

    Long: 5,

    Numerical: 5,

    Programming: 5,

    "Case Study": 10

};


// ======================================================
// CALCULATE OBJECT TOTAL
// ======================================================

function calculateTotal(object) {

    return Object.values(object)
        .reduce(
            (total, value) =>
                total + Number(value),
            0
        );

}


// ======================================================
// VALIDATE DISTRIBUTION
// ======================================================

function validateDistribution() {

    const typeTotal =
        calculateTotal(
            QUESTION_TYPE_DISTRIBUTION
        );


    const difficultyTotal =
        calculateTotal(
            DIFFICULTY_DISTRIBUTION
        );


    const errors = [];


    // -----------------------------------------------
    // QUESTION TYPE CHECK
    // -----------------------------------------------

    if (
        typeTotal !==
        QUESTIONS_PER_SUBJECT
    ) {

        errors.push(
            `Question type total is ${typeTotal}, ` +
            `but expected ${QUESTIONS_PER_SUBJECT}.`
        );

    }


    // -----------------------------------------------
    // DIFFICULTY CHECK
    // -----------------------------------------------

    if (
        difficultyTotal !==
        QUESTIONS_PER_SUBJECT
    ) {

        errors.push(
            `Difficulty total is ${difficultyTotal}, ` +
            `but expected ${QUESTIONS_PER_SUBJECT}.`
        );

    }


    return {

        valid:
            errors.length === 0,

        errors,

        typeTotal,

        difficultyTotal

    };

}


// ======================================================
// UNIT DISTRIBUTION
// ======================================================

function calculateUnitDistribution(
    subjectName
) {

    const units =
        getAllUnits(
            subjectName
        );


    if (
        units.length === 0
    ) {

        return {};

    }


    /*
    1000 questions / 5 units = 200 questions
    */

    const base =
        Math.floor(
            QUESTIONS_PER_SUBJECT /
            units.length
        );


    const remainder =
        QUESTIONS_PER_SUBJECT %
        units.length;


    const distribution = {};


    units.forEach(
        (unit, index) => {

            distribution[unit] =
                base +
                (
                    index < remainder
                        ? 1
                        : 0
                );

        }
    );


    return distribution;

}


// ======================================================
// TOPIC DISTRIBUTION
// ======================================================

function calculateTopicDistribution(
    subjectName
) {

    const subject =
        getSubject(
            subjectName
        );


    if (!subject) {

        return {};

    }


    const distribution = {};


    for (
        const unit
        of Object.keys(
            subject.units
        )
    ) {

        const topics =
            subject.units[unit];


        if (
            topics.length === 0
        ) {

            distribution[unit] = {};

            continue;

        }


        /*
        Unit ke total questions
        */

        const unitDistribution =
            calculateUnitDistribution(
                subjectName
            );


        const unitQuestions =
            unitDistribution[unit];


        const base =
            Math.floor(
                unitQuestions /
                topics.length
            );


        const remainder =
            unitQuestions %
            topics.length;


        distribution[unit] = {};


        topics.forEach(
            (
                topic,
                index
            ) => {

                distribution[unit][topic] =
                    base +
                    (
                        index < remainder
                            ? 1
                            : 0
                    );

            }
        );

    }


    return distribution;

}


// ======================================================
// DIFFICULTY PERCENTAGES
// ======================================================

function calculateDifficultyPercentages() {

    const result = {};


    for (
        const difficulty
        of Object.keys(
            DIFFICULTY_DISTRIBUTION
        )
    ) {

        const count =
            DIFFICULTY_DISTRIBUTION[
                difficulty
            ];


        result[difficulty] =
            (
                count /
                QUESTIONS_PER_SUBJECT
            ) * 100;

    }


    return result;

}


// ======================================================
// QUESTION TYPE PERCENTAGES
// ======================================================

function calculateTypePercentages() {

    const result = {};


    for (
        const type
        of Object.keys(
            QUESTION_TYPE_DISTRIBUTION
        )
    ) {

        const count =
            QUESTION_TYPE_DISTRIBUTION[
                type
            ];


        result[type] =
            (
                count /
                QUESTIONS_PER_SUBJECT
            ) * 100;

    }


    return result;

}


// ======================================================
// CREATE SUBJECT PLAN
// ======================================================

function createSubjectPlan(
    subjectName
) {

    const subject =
        getSubject(
            subjectName
        );


    if (!subject) {

        throw new Error(
            `Subject not found: ${subjectName}`
        );

    }


    const units =
        getAllUnits(
            subjectName
        );


    const topics =
        getAllTopics(
            subjectName
        );


    return {

        semester:
            subject.semester,

        subject:
            subjectName,

        subjectCode:
            subject.subjectCode,

        targetQuestions:
            QUESTIONS_PER_SUBJECT,

        units:
            units.length,

        topics:
            topics.length,

        questionTypes:
            {
                ...QUESTION_TYPE_DISTRIBUTION
            },

        difficulties:
            {
                ...DIFFICULTY_DISTRIBUTION
            },

        unitDistribution:
            calculateUnitDistribution(
                subjectName
            ),

        topicDistribution:
            calculateTopicDistribution(
                subjectName
            )

    };

}


// ======================================================
// DISPLAY QUESTION TYPE DISTRIBUTION
// ======================================================

function displayQuestionTypeDistribution() {

    console.log("");

    console.log(
        "=============================================="
    );

    console.log(
        "QUESTION TYPE DISTRIBUTION"
    );

    console.log(
        "=============================================="
    );


    const percentages =
        calculateTypePercentages();


    for (
        const type
        of Object.keys(
            QUESTION_TYPE_DISTRIBUTION
        )
    ) {

        const count =
            QUESTION_TYPE_DISTRIBUTION[
                type
            ];


        const percentage =
            percentages[type];


        const marks =
            QUESTION_TYPE_MARKS[
                type
            ];


        console.log(
            `${type.padEnd(15)} ` +
            `${String(count).padStart(4)} questions | ` +
            `${percentage.toFixed(1)}% | ` +
            `${marks} marks`
        );

    }


    console.log(
        "----------------------------------------------"
    );


    console.log(
        `Total            ` +
        `${calculateTotal(
            QUESTION_TYPE_DISTRIBUTION
        )} questions`
    );

}


// ======================================================
// DISPLAY DIFFICULTY DISTRIBUTION
// ======================================================

function displayDifficultyDistribution() {

    console.log("");

    console.log(
        "=============================================="
    );

    console.log(
        "DIFFICULTY DISTRIBUTION"
    );

    console.log(
        "=============================================="
    );


    const percentages =
        calculateDifficultyPercentages();


    for (
        const difficulty
        of Object.keys(
            DIFFICULTY_DISTRIBUTION
        )
    ) {

        const count =
            DIFFICULTY_DISTRIBUTION[
                difficulty
            ];


        const percentage =
            percentages[
                difficulty
            ];


        console.log(
            `${difficulty.padEnd(10)} ` +
            `${String(count).padStart(4)} questions | ` +
            `${percentage.toFixed(1)}%`
        );

    }


    console.log(
        "----------------------------------------------"
    );


    console.log(
        `Total      ` +
        `${calculateTotal(
            DIFFICULTY_DISTRIBUTION
        )} questions`
    );

}


// ======================================================
// DISPLAY UNIT DISTRIBUTION
// ======================================================

function displayUnitDistribution(
    subjectName
) {

    const distribution =
        calculateUnitDistribution(
            subjectName
        );


    console.log("");

    console.log(
        `UNIT DISTRIBUTION - ${subjectName}`
    );

    console.log(
        "----------------------------------------------"
    );


    for (
        const unit
        of Object.keys(
            distribution
        )
    ) {

        console.log(
            `${unit.padEnd(10)} ` +
            `${distribution[unit]} questions`
        );

    }

}


// ======================================================
// DISPLAY SUBJECT SUMMARY
// ======================================================

function displaySubjectSummary(
    subjectName
) {

    const subject =
        getSubject(
            subjectName
        );


    const units =
        getAllUnits(
            subjectName
        );


    const topics =
        getAllTopics(
            subjectName
        );


    console.log("");

    console.log(
        `${subject.semester} | ` +
        `${subjectName} | ` +
        `${subject.subjectCode}`
    );

    console.log(
        `Units: ${units.length} | ` +
        `Topics: ${topics.length} | ` +
        `Questions: ${QUESTIONS_PER_SUBJECT}`
    );

}


// ======================================================
// DISPLAY ALL SUBJECTS
// ======================================================

function displayAllSubjects() {

    const subjects =
        getAllSubjects();


    console.log("");

    console.log(
        "=============================================="
    );

    console.log(
        "ALL SUBJECT DISTRIBUTION"
    );

    console.log(
        "=============================================="
    );


    for (
        const subjectName
        of subjects
    ) {

        displaySubjectSummary(
            subjectName
        );

    }

}


// ======================================================
// CREATE COMPLETE PLAN
// ======================================================

function createCompletePlan() {

    const subjects =
        getAllSubjects();


    const plans = [];


    for (
        const subjectName
        of subjects
    ) {

        plans.push(
            createSubjectPlan(
                subjectName
            )
        );

    }


    return plans;

}


// ======================================================
// DISPLAY FINAL SUMMARY
// ======================================================

function displayFinalSummary() {

    console.log("");

    console.log(
        "=============================================="
    );

    console.log(
        "FINAL QUESTION BANK PLAN"
    );

    console.log(
        "=============================================="
    );

    console.log("");

    console.log(
        `Total Subjects       : ${TOTAL_SUBJECTS}`
    );

    console.log(
        `Questions / Subject  : ${QUESTIONS_PER_SUBJECT}`
    );

    console.log(
        `Total Questions      : ${TOTAL_TARGET}`
    );

    console.log(
        `Total Units          : 120`
    );

    console.log(
        `Total Topics         : 923`
    );

    console.log("");

    console.log(
        "Question Type Total  : " +
        calculateTotal(
            QUESTION_TYPE_DISTRIBUTION
        )
    );

    console.log(
        "Difficulty Total     : " +
        calculateTotal(
            DIFFICULTY_DISTRIBUTION
        )
    );

    console.log("");

    console.log(
        "=============================================="
    );

}


// ======================================================
// MAIN
// ======================================================

function main() {

    console.log("");

    console.log(
        "################################################"
    );

    console.log(
        "# QUESTION DISTRIBUTION ENGINE"
    );

    console.log(
        "################################################"
    );


    // --------------------------------------------------
    // VALIDATE
    // --------------------------------------------------

    const validation =
        validateDistribution();


    console.log("");

    console.log(
        "DISTRIBUTION VALIDATION"
    );

    console.log(
        "----------------------------------------------"
    );


    if (
        validation.valid
    ) {

        console.log(
            "Status: VALID"
        );

        console.log(
            "Question type total: " +
            validation.typeTotal
        );

        console.log(
            "Difficulty total: " +
            validation.difficultyTotal
        );

    } else {

        console.log(
            "Status: INVALID"
        );


        for (
            const error
            of validation.errors
        ) {

            console.log(
                `ERROR: ${error}`
            );

        }


        return;

    }


    // --------------------------------------------------
    // DISPLAY DISTRIBUTIONS
    // --------------------------------------------------

    displayQuestionTypeDistribution();

    displayDifficultyDistribution();


    // --------------------------------------------------
    // DISPLAY ALL SUBJECTS
    // --------------------------------------------------

    displayAllSubjects();


    // --------------------------------------------------
    // SHOW FIRST SUBJECT UNIT DISTRIBUTION
    // --------------------------------------------------

    console.log("");

    console.log(
        "=============================================="
    );

    console.log(
        "SAMPLE UNIT DISTRIBUTION"
    );

    console.log(
        "=============================================="
    );


    displayUnitDistribution(
        "Linear Algebra"
    );


    // --------------------------------------------------
    // CREATE COMPLETE PLAN
    // --------------------------------------------------

    const completePlan =
        createCompletePlan();


    console.log("");

    console.log(
        `Complete plans created: ` +
        `${completePlan.length}`
    );


    // --------------------------------------------------
    // FINAL SUMMARY
    // --------------------------------------------------

    displayFinalSummary();


    console.log("");

    console.log(
        "Question distribution engine completed."
    );

}


// ======================================================
// START
// ======================================================

main();


// ======================================================
// EXPORT
// ======================================================

module.exports = {

    QUESTIONS_PER_SUBJECT,

    TOTAL_SUBJECTS,

    TOTAL_TARGET,

    QUESTION_TYPE_DISTRIBUTION,

    DIFFICULTY_DISTRIBUTION,

    QUESTION_TYPE_MARKS,

    validateDistribution,

    calculateUnitDistribution,

    calculateTopicDistribution,

    calculateDifficultyPercentages,

    calculateTypePercentages,

    createSubjectPlan,

    createCompletePlan

};