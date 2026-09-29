const express = require("express");
const path = require("path");
const crypto = require("crypto");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();

const PORT = 3000;

const MONGODB_URL =
    "mongodb://127.0.0.1:27017";

const DATABASE_NAME =
    "question_paper_generator";

const COLLECTION_NAME =
    "questions";

const PAPERS_COLLECTION =
    "papers";

const SETTINGS_COLLECTION =
    "system_settings";


/*
=========================================================
EXPRESS SETTINGS
=========================================================
*/

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(
    express.static(
        path.join(__dirname, "public")
    )
);


/*
=========================================================
SIMPLE SECURITY
=========================================================

Password:
    Default = 1234

Recovery PIN:
    DHULAN KI VIDAI KA WAQT HONE BALA HAI

No:
    OTP
    WebAuthn
    Face Lock
    Random Recovery Code
    Recovery Code Regeneration
=========================================================
*/

const FIXED_RECOVERY_PIN =
    "DHULAN KI VIDAI KA WAQT HONE BALA HAI";


/*
=========================================================
ACTIVE LOGIN SESSIONS
=========================================================
*/

const activeSessions =
    new Map();


/*
=========================================================
HASH FUNCTION
=========================================================
*/

function hashValue(value) {

    const salt =
        crypto.randomBytes(32)
            .toString("hex");

    const hash =
        crypto.pbkdf2Sync(
            String(value),
            salt,
            100000,
            64,
            "sha512"
        ).toString("hex");

    return {
        hash: hash,
        salt: salt
    };
}


/*
=========================================================
VERIFY HASH
=========================================================
*/

function verifyHash(
    value,
    storedHash,
    storedSalt
) {

    if (
        !storedHash ||
        !storedSalt
    ) {
        return false;
    }

    const hash =
        crypto.pbkdf2Sync(
            String(value),
            storedSalt,
            100000,
            64,
            "sha512"
        ).toString("hex");

    return (
        hash === storedHash
    );
}


/*
=========================================================
CREATE SESSION
=========================================================
*/

function createSession(
    role = "admin"
) {

    const sessionToken =
        crypto.randomBytes(32)
            .toString("hex");

    activeSessions.set(
        sessionToken,
        {
            role: role,
            createdAt: Date.now()
        }
    );

    return sessionToken;
}


/*
=========================================================
GET SESSION TOKEN
=========================================================
*/

function getSessionToken(req) {

    const cookieHeader =
        req.headers.cookie || "";

    const cookies =
        cookieHeader
            .split(";")
            .map(
                item =>
                    item.trim()
            );

    const sessionCookie =
        cookies.find(
            item =>
                item.startsWith(
                    "qpg_session="
                )
        );

    if (!sessionCookie) {
        return null;
    }

    return sessionCookie
        .substring(
            "qpg_session=".length
        );
}


/*
=========================================================
AUTHENTICATION MIDDLEWARE
=========================================================
*/

function requireAuthentication(
    req,
    res,
    next
) {

    const sessionToken =
        getSessionToken(req);

    if (
        !sessionToken ||
        !activeSessions.has(
            sessionToken
        )
    ) {

        return res.status(401).json({
            success: false,
            message:
                "Authentication required."
        });

    }

    req.user =
        activeSessions.get(
            sessionToken
        );

    next();
}


/*
=========================================================
CONNECT MONGODB
=========================================================
*/

let mongoClient = null;


async function connectDatabase() {

    mongoClient =
        new MongoClient(
            MONGODB_URL
        );

    await mongoClient.connect();

    console.log(
        "MongoDB Connected Successfully!"
    );

    const database =
        mongoClient.db(
            DATABASE_NAME
        );

    return {
        client:
            mongoClient,

        database:
            database
    };
}


/*
=========================================================
SYSTEM SETTINGS
=========================================================
*/

async function getSystemSettings(
    database
) {

    const settingsCollection =
        database.collection(
            SETTINGS_COLLECTION
        );

    let settings =
        await settingsCollection.findOne({
            _id: "main"
        });


    /*
        FIRST TIME SETUP
    */

    if (!settings) {

        const passwordData =
            hashValue("1234");

        const recoveryData =
            hashValue(
                FIXED_RECOVERY_PIN
            );

        settings = {

            _id: "main",

            passwordHash:
                passwordData.hash,

            passwordSalt:
                passwordData.salt,

            recoveryPinHash:
                recoveryData.hash,

            recoveryPinSalt:
                recoveryData.salt,

            createdAt:
                new Date(),

            updatedAt:
                new Date()

        };


        await settingsCollection.insertOne(
            settings
        );


        console.log(
            "===================================="
        );

        console.log(
            "SIMPLE SECURITY SETUP"
        );

        console.log(
            "Default Password: 1234"
        );

        console.log(
            "Recovery PIN:",
            FIXED_RECOVERY_PIN
        );

        console.log(
            "===================================="
        );

    }


    /*
        MIGRATION FOR OLD DATABASE
    */

    if (
        !settings.recoveryPinHash ||
        !settings.recoveryPinSalt
    ) {

        const recoveryData =
            hashValue(
                FIXED_RECOVERY_PIN
            );

        await settingsCollection.updateOne(

            {
                _id: "main"
            },

            {
                $set: {

                    recoveryPinHash:
                        recoveryData.hash,

                    recoveryPinSalt:
                        recoveryData.salt,

                    updatedAt:
                        new Date()

                }
            }

        );

        settings =
            await settingsCollection.findOne({
                _id: "main"
            });

    }


    return settings;
}


/*
=========================================================
UPDATE SYSTEM SETTINGS
=========================================================
*/

async function updateSystemSettings(
    database,
    updates
) {

    const settingsCollection =
        database.collection(
            SETTINGS_COLLECTION
        );

    await settingsCollection.updateOne(

        {
            _id: "main"
        },

        {
            $set: {
                ...updates,
                updatedAt:
                    new Date()
            }
        },

        {
            upsert: true
        }

    );

}


/*
=========================================================
AUTH STATUS
=========================================================
*/

app.get(
    "/api/auth/status",
    function (req, res) {

        const sessionToken =
            getSessionToken(req);

        const authenticated =
            Boolean(
                sessionToken &&
                activeSessions.has(
                    sessionToken
                )
            );

        res.json({
            success: true,
            authenticated:
                authenticated
        });

    }
);


/*
=========================================================
LOGIN
=========================================================
*/

app.post(
    "/api/auth/login",
    async function (req, res) {

        try {

            const database =
                req.app.locals.database;

            const password =
                String(
                    req.body.password ||
                    ""
                );

            if (!password) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Password is required."

                });

            }


            const settings =
                await getSystemSettings(
                    database
                );


            const passwordCorrect =
                verifyHash(

                    password,

                    settings.passwordHash,

                    settings.passwordSalt

                );


            if (!passwordCorrect) {

                return res.status(401).json({

                    success: false,

                    message:
                        "Incorrect password."

                });

            }


            const sessionToken =
                createSession(
                    "admin"
                );


            res.setHeader(

                "Set-Cookie",

                "qpg_session=" +
                sessionToken +
                "; HttpOnly; Path=/; SameSite=Strict"

            );


            res.json({

                success: true,

                message:
                    "Login successful."

            });

        } catch (error) {

            console.error(
                "Login Error:",
                error
            );

            res.status(500).json({

                success: false,

                message:
                    "Unable to login."

            });

        }

    }
);


/*
=========================================================
LOGOUT
=========================================================
*/

app.post(
    "/api/auth/logout",
    function (req, res) {

        const sessionToken =
            getSessionToken(req);

        if (sessionToken) {

            activeSessions.delete(
                sessionToken
            );

        }

        res.setHeader(

            "Set-Cookie",

            "qpg_session=; HttpOnly; Path=/; SameSite=Strict; Max-Age=0"

        );


        res.json({

            success: true,

            message:
                "Logged out successfully."

        });

    }
);


/*
=========================================================
CHANGE PASSWORD
=========================================================
*/

app.post(
    "/api/auth/change-password",
    requireAuthentication,
    async function (req, res) {

        try {

            const database =
                req.app.locals.database;

            const currentPassword =
                String(
                    req.body.currentPassword ||
                    ""
                );

            const newPassword =
                String(
                    req.body.newPassword ||
                    ""
                );


            if (
                newPassword.length < 6
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Password must contain at least 6 characters."

                });

            }


            const settings =
                await getSystemSettings(
                    database
                );


            const currentCorrect =
                verifyHash(

                    currentPassword,

                    settings.passwordHash,

                    settings.passwordSalt

                );


            if (!currentCorrect) {

                return res.status(401).json({

                    success: false,

                    message:
                        "Current password is incorrect."

                });

            }


            const newPasswordData =
                hashValue(
                    newPassword
                );


            await updateSystemSettings(

                database,

                {

                    passwordHash:
                        newPasswordData.hash,

                    passwordSalt:
                        newPasswordData.salt

                }

            );


            res.json({

                success: true,

                message:
                    "Password changed successfully."

            });

        } catch (error) {

            console.error(
                "Change Password Error:",
                error
            );

            res.status(500).json({

                success: false,

                message:
                    "Unable to change password."

            });

        }

    }
);


/*
=========================================================
RESET PASSWORD USING FIXED RECOVERY PIN
=========================================================
*/

app.post(
    "/api/auth/reset-password",
    async function (req, res) {

        try {

            const database =
                req.app.locals.database;

            const recoveryPin =
                String(
                    req.body.recoveryPin ||
                    ""
                ).trim();

            const newPassword =
                String(
                    req.body.newPassword ||
                    ""
                );


            if (!recoveryPin) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Recovery PIN is required."

                });

            }


            if (
                newPassword.length < 6
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Password must contain at least 6 characters."

                });

            }


            const settings =
                await getSystemSettings(
                    database
                );


            const pinCorrect =
                verifyHash(

                    recoveryPin,

                    settings.recoveryPinHash,

                    settings.recoveryPinSalt

                );


            if (!pinCorrect) {

                return res.status(401).json({

                    success: false,

                    message:
                        "Incorrect Recovery PIN."

                });

            }


            const passwordData =
                hashValue(
                    newPassword
                );


            await updateSystemSettings(

                database,

                {

                    passwordHash:
                        passwordData.hash,

                    passwordSalt:
                        passwordData.salt

                }

            );


            const sessionToken =
                createSession(
                    "admin"
                );


            res.setHeader(

                "Set-Cookie",

                "qpg_session=" +
                sessionToken +
                "; HttpOnly; Path=/; SameSite=Strict"

            );


            res.json({

                success: true,

                message:
                    "Password reset successfully."

            });

        } catch (error) {

            console.error(
                "Reset Password Error:",
                error
            );

            res.status(500).json({

                success: false,

                message:
                    "Unable to reset password."

            });

        }

    }
);


/*
=========================================================
QUESTION / PAPER HELPER FUNCTIONS
=========================================================
*/

function shuffleArray(
    array
) {

    const result =
        [...array];

    for (
        let i =
            result.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );

        [
            result[i],
            result[j]
        ] = [
            result[j],
            result[i]
        ];

    }

    return result;
}


function getQuestionIds(
    questions
) {

    return questions
        .map(
            question =>
                question &&
                question._id
                    ? new ObjectId(
                        question._id
                    )
                    : null
        )
        .filter(
            id => id !== null
        );

}


/*
=========================================================
ADD PAPER USAGE
=========================================================
*/

async function addPaperUsage(
    database,
    questions,
    paperId,
    paperNumber,
    paperName
) {

    const questionsCollection =
        database.collection(
            COLLECTION_NAME
        );

    const questionIds =
        getQuestionIds(
            questions
        );


    if (
        questionIds.length === 0
    ) {
        return;
    }


    const usageRecord = {

        paperId:
            String(
                paperId
            ),

        paperNumber:
            paperNumber || "",

        paperName:
            paperName || "",

        usedAt:
            new Date()

    };


    await questionsCollection.updateMany(

        {
            _id: {
                $in:
                    questionIds
            }
        },

        {
            $addToSet: {

                usedInPapers:
                    usageRecord

            }
        }

    );

}


/*
=========================================================
REMOVE PAPER USAGE
=========================================================
*/

async function removePaperUsage(
    database,
    paperId
) {

    const questionsCollection =
        database.collection(
            COLLECTION_NAME
        );


    await questionsCollection.updateMany(

        {},

        {

            $pull: {

                usedInPapers: {

                    paperId:
                        String(
                            paperId
                        )

                }

            }

        }

    );

}


/*
=========================================================
BACKUP
=========================================================
*/

app.get(
    "/api/backup",
    requireAuthentication,
    async function (req, res) {

        try {

            const database =
                req.app.locals.database;

            const questions =
                await database
                    .collection(
                        COLLECTION_NAME
                    )
                    .find({})
                    .toArray();

            const papers =
                await database
                    .collection(
                        PAPERS_COLLECTION
                    )
                    .find({})
                    .toArray();

            const settings =
                await getSystemSettings(
                    database
                );


            res.json({

                success: true,

                backup: {

                    version:
                        "1.0",

                    createdAt:
                        new Date(),

                    questions:
                        questions,

                    papers:
                        papers,

                    settings: {

                        passwordHash:
                            settings.passwordHash,

                        passwordSalt:
                            settings.passwordSalt,

                        recoveryPinHash:
                            settings.recoveryPinHash,

                        recoveryPinSalt:
                            settings.recoveryPinSalt

                    }

                }

            });

        } catch (error) {

            console.error(
                "Backup Error:",
                error
            );

            res.status(500).json({

                success: false,

                message:
                    "Unable to create backup."

            });

        }

    }
);


/*
=========================================================
RESTORE
=========================================================
*/

app.post(
    "/api/restore",
    requireAuthentication,
    async function (req, res) {

        try {

            const database =
                req.app.locals.database;

            const backup =
                req.body.backup;


            if (!backup) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Backup data is missing."

                });

            }


            const questions =
                Array.isArray(
                    backup.questions
                )
                    ? backup.questions
                    : [];


            const papers =
                Array.isArray(
                    backup.papers
                )
                    ? backup.papers
                    : [];


            const questionsCollection =
                database.collection(
                    COLLECTION_NAME
                );


            const papersCollection =
                database.collection(
                    PAPERS_COLLECTION
                );


            await questionsCollection.deleteMany(
                {}
            );

            await papersCollection.deleteMany(
                {}
            );


            if (
                questions.length > 0
            ) {

                await questionsCollection.insertMany(
                    questions.map(
                        question => {

                            const copy = {
                                ...question
                            };

                            if (
                                copy._id &&
                                typeof copy._id === "string"
                            ) {

                                try {

                                    copy._id =
                                        new ObjectId(
                                            copy._id
                                        );

                                } catch (error) {

                                    delete copy._id;

                                }

                            }

                            return copy;

                        }
                    )
                );

            }


            if (
                papers.length > 0
            ) {

                await papersCollection.insertMany(
                    papers.map(
                        paper => {

                            const copy = {
                                ...paper
                            };

                            if (
                                copy._id &&
                                typeof copy._id === "string"
                            ) {

                                try {

                                    copy._id =
                                        new ObjectId(
                                            copy._id
                                        );

                                } catch (error) {

                                    delete copy._id;

                                }

                            }

                            return copy;

                        }
                    )
                );

            }


            res.json({

                success: true,

                message:
                    "Backup restored successfully."

            });

        } catch (error) {

            console.error(
                "Restore Error:",
                error
            );

            res.status(500).json({

                success: false,

                message:
                    "Unable to restore backup."

            });

        }

    }
);
/*
=========================================================
QUESTION SELECTION BY DIFFICULTY
=========================================================
*/

function selectQuestionsByDifficulty(
    questions,
    count,
    difficulty
) {

    if (count <= 0) {
        return [];
    }

    const filtered =
        questions.filter(
            function (question) {

                return (
                    String(
                        question.difficulty || ""
                    ).toLowerCase() ===
                    String(
                        difficulty
                    ).toLowerCase()
                );

            }
        );

    return shuffleArray(
        filtered
    ).slice(
        0,
        count
    );
}


/*
    SAVE QUESTION
    WITH DUPLICATE PROTECTION
*/

app.post(
    "/api/questions",
    async function (req, res) {

        try {

            const questionsCollection =
                req.app.locals.database.collection(
                    COLLECTION_NAME
                );

            /*
                CLEAN / NORMALIZE TEXT
            */

            function normalizeText(value) {

                return String(value || "")
                    .trim()
                    .replace(/\s+/g, " ")
                    .toLowerCase();

            }


            /*
                GET QUESTION DATA
            */

            const semester =
                String(req.body.semester || "").trim();

            const subject =
                String(req.body.subject || "").trim();

            const subjectCode =
                String(req.body.subjectCode || "").trim();

            const unit =
                String(req.body.unit || "").trim();

            const topic =
                String(req.body.topic || "").trim();

            const questionType =
                String(req.body.questionType || "").trim();

            const difficulty =
                String(req.body.difficulty || "").trim();

            const question =
                String(req.body.question || "").trim();

            const answer =
                String(req.body.answer || "").trim();

            const marks =
                Number(req.body.marks);


            /*
                BASIC VALIDATION
            */

            if (
                !semester ||
                !subject ||
                !questionType ||
                !difficulty ||
                !question
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Please fill all required question fields."

                });

            }


            /*
                DUPLICATE CHECK

                Same question is considered duplicate when:

                Subject
                Subject Code
                Unit
                Topic
                Question Type
                Difficulty
                Question Text

                are the same.
            */

            const duplicateQuery = {

                subject:
                    normalizeText(subject),

                subjectCode:
                    normalizeText(subjectCode),

                unit:
                    normalizeText(unit),

                topic:
                    normalizeText(topic),

                questionType:
                    normalizeText(questionType),

                difficulty:
                    normalizeText(difficulty),

                question:
                    normalizeText(question)

            };


            const existingQuestion =
                await questionsCollection.findOne(
                    duplicateQuery
                );


            /*
                DUPLICATE FOUND
            */

            if (existingQuestion) {

                return res.status(409).json({

                    success: false,

                    duplicate: true,

                    message:
                        "This question already exists in the Question Bank.",

                    questionId:
                        existingQuestion._id

                });

            }


            /*
                SAVE QUESTION

                Keep original display values.
            */

            const questionData = {

                semester:
                    semester,

                subject:
                    subject,

                subjectCode:
                    subjectCode,

                unit:
                    unit,

                topic:
                    topic,

                questionType:
                    questionType,

                difficulty:
                    difficulty,

                marks:
                    marks,

                question:
                    question,

                answer:
                    answer,

                createdAt:
                    new Date(),

                updatedAt:
                    new Date(),

                usedInPapers:
                    []

            };


            /*
                INSERT NEW QUESTION
            */

            const result =
                await questionsCollection.insertOne(
                    questionData
                );


            /*
                SUCCESS RESPONSE
            */

            res.status(201).json({

                success: true,

                duplicate: false,

                message:
                    "Question saved successfully!",

                questionId:
                    result.insertedId

            });


        } catch (error) {

            console.error(
                "Error saving question:",
                error
            );


            res.status(500).json({

                success: false,

                message:
                    "Failed to save question."

            });

        }

    }
);


/*
=========================================================
GET ALL QUESTIONS
=========================================================
*/

app.get(
    "/api/questions",
    async function (req, res) {

        try {

            const questionsCollection =
                req.app.locals.database.collection(
                    COLLECTION_NAME
                );

            const questions =
                await questionsCollection
                    .find({})
                    .sort({
                        createdAt: -1
                    })
                    .toArray();

            res.json({

                success: true,

                questions:
                    questions

            });

        } catch (error) {

            console.error(
                "Error loading questions:",
                error
            );

            res.status(500).json({

                success: false,

                message:
                    "Failed to load questions."

            });

        }

    }
);


/*
=========================================================
GET SINGLE QUESTION
=========================================================
*/

app.get(
    "/api/questions/:id",
    async function (req, res) {

        try {

            const questionId =
                req.params.id;

            if (
                !ObjectId.isValid(
                    questionId
                )
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Invalid question ID."

                });

            }

            const questionsCollection =
                req.app.locals.database.collection(
                    COLLECTION_NAME
                );

            const question =
                await questionsCollection.findOne({

                    _id:
                        new ObjectId(
                            questionId
                        )

                });

            if (!question) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Question not found."

                });

            }

            res.json({

                success: true,

                question:
                    question

            });

        } catch (error) {

            console.error(
                "Error loading question:",
                error
            );

            res.status(500).json({

                success: false,

                message:
                    "Failed to load question."

            });

        }

    }
);


/*
=========================================================
UPDATE QUESTION
=========================================================
*/

app.put(
    "/api/questions/:id",
    async function (req, res) {

        try {

            const questionId =
                req.params.id;

            if (
                !ObjectId.isValid(
                    questionId
                )
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Invalid question ID."

                });

            }

            const questionsCollection =
                req.app.locals.database.collection(
                    COLLECTION_NAME
                );

            const updatedQuestion = {

                semester:
                    req.body.semester,

                subject:
                    req.body.subject,

                subjectCode:
                    req.body.subjectCode || "",

                unit:
                    req.body.unit,

                topic:
                    req.body.topic || "",

                questionType:
                    req.body.questionType,

                difficulty:
                    req.body.difficulty,

                marks:
                    Number(
                        req.body.marks
                    ),

                question:
                    req.body.question,

                answer:
                    req.body.answer || ""

            };

            const result =
                await questionsCollection.updateOne(

                    {
                        _id:
                            new ObjectId(
                                questionId
                            )
                    },

                    {
                        $set:
                            updatedQuestion
                    }

                );

            if (
                result.matchedCount === 0
            ) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Question not found."

                });

            }

            res.json({

                success: true,

                message:
                    "Question updated successfully!"

            });

        } catch (error) {

            console.error(
                "Error updating question:",
                error
            );

            res.status(500).json({

                success: false,

                message:
                    "Failed to update question."

            });

        }

    }
);


/*
=========================================================
DELETE QUESTION
=========================================================
*/

app.delete(
    "/api/questions/:id",
    async function (req, res) {

        try {

            const questionId =
                req.params.id;

            if (
                !ObjectId.isValid(
                    questionId
                )
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Invalid question ID."

                });

            }

            const questionsCollection =
                req.app.locals.database.collection(
                    COLLECTION_NAME
                );

            const result =
                await questionsCollection.deleteOne({

                    _id:
                        new ObjectId(
                            questionId
                        )

                });

            if (
                result.deletedCount === 0
            ) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Question not found."

                });

            }

            res.json({

                success: true,

                message:
                    "Question deleted successfully!"

            });

        } catch (error) {

            console.error(
                "Error deleting question:",
                error
            );

            res.status(500).json({

                success: false,

                message:
                    "Failed to delete question."

            });

        }

    }
);


/*
=========================================================
GENERATE QUESTION PAPER
SUBJECTIVE QUESTIONS ONLY
=========================================================
*/

app.post(
    "/api/generate-paper",
    async function (req, res) {

        try {

            const questionsCollection =
                req.app.locals.database.collection(
                    COLLECTION_NAME
                );

            const semester =
                req.body.semester;

            const subject =
                req.body.subject;

            const easyPercentage =
                Number(
                    req.body.easyPercentage
                );

            const mediumPercentage =
                Number(
                    req.body.mediumPercentage
                );

            const hardPercentage =
                Number(
                    req.body.hardPercentage
                );

            const shortAnswerCount =
                Number(
                    req.body.shortAnswerCount || 0
                );

            const longAnswerCount =
                Number(
                    req.body.longAnswerCount || 0
                );

            const numericalCount =
                Number(
                    req.body.numericalCount || 0
                );

            const programmingCount =
                Number(
                    req.body.programmingCount || 0
                );

            const caseStudyCount =
                Number(
                    req.body.caseStudyCount || 0
                );

            const totalQuestions =
                shortAnswerCount +
                longAnswerCount +
                numericalCount +
                programmingCount +
                caseStudyCount;


            if (
                !semester ||
                !subject
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Semester and Subject are required."

                });

            }


           const difficultyTotal =
    Number(easyPercentage) +
    Number(mediumPercentage) +
    Number(hardPercentage);

if (
    !Number.isFinite(difficultyTotal) ||
    Math.abs(difficultyTotal - 100) > 0.01
) {
    return res.status(400).json({
        success: false,
        message:
            "Difficulty percentages must total 100%."
    });
}

            if (
                totalQuestions === 0
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "At least one question is required."

                });

            }


            const allowedTypes = [

                "Short Answer",

                "Long Answer",

                "Numerical",

                "Programming / Code Based",

                "Case Study",

                "Case Study / Application Based"

            ];


            const availableQuestions =
                await questionsCollection
                    .find({

                        semester:
                            semester,

                        subject:
                            subject,

                        questionType:
                            {
                                $in:
                                    allowedTypes
                            }

                    })
                    .toArray();


            if (
                availableQuestions.length === 0
            ) {

                return res.status(404).json({

                    success: false,

                    message:
                        "No subjective questions are available for this subject. Please add questions to the Question Bank."

                });

            }


            /*
                FIRST TRY UNUSED QUESTIONS
            */

            const unusedQuestions =
                availableQuestions.filter(

                    function (question) {

                        return (
                            !Array.isArray(
                                question.usedInPapers
                            ) ||
                            question.usedInPapers.length === 0
                        );

                    }

                );


            let sourceQuestions;


            if (
                unusedQuestions.length >=
                totalQuestions
            ) {

                sourceQuestions =
                    unusedQuestions;

            } else {

                sourceQuestions =
                    availableQuestions;

            }


            /*
                DIFFICULTY COUNTS
            */

            let easyCount =
                Math.round(
                    totalQuestions *
                    easyPercentage /
                    100
                );

            let mediumCount =
                Math.round(
                    totalQuestions *
                    mediumPercentage /
                    100
                );

            let hardCount =
                totalQuestions -
                easyCount -
                mediumCount;


            const selectedQuestions = [];


            /*
                ADD QUESTIONS WITHOUT DUPLICATES
            */

            function addQuestions(
                questionList
            ) {

                questionList.forEach(

                    function (question) {

                        if (
                            selectedQuestions.length >=
                            totalQuestions
                        ) {

                            return;

                        }


                        const alreadySelected =
                            selectedQuestions.some(

                                function (selected) {

                                    return (

                                        String(
                                            selected._id
                                        ) ===
                                        String(
                                            question._id
                                        )

                                    );

                                }

                            );


                        if (
                            !alreadySelected
                        ) {

                            selectedQuestions.push(
                                question
                            );

                        }

                    }

                );

            }


            /*
                EASY
            */

            addQuestions(

                selectQuestionsByDifficulty(

                    sourceQuestions,

                    easyCount,

                    "Easy"

                )

            );


            /*
                MEDIUM
            */

            addQuestions(

                selectQuestionsByDifficulty(

                    sourceQuestions,

                    mediumCount,

                    "Medium"

                )

            );


            /*
                HARD
            */

            addQuestions(

                selectQuestionsByDifficulty(

                    sourceQuestions,

                    hardCount,

                    "Hard"

                )

            );


            /*
                FILL REMAINING QUESTIONS
            */

            if (
                selectedQuestions.length <
                totalQuestions
            ) {

                addQuestions(

                    shuffleArray(
                        sourceQuestions
                    )

                );

            }


            /*
                NOT ENOUGH QUESTIONS
            */

            if (
                selectedQuestions.length <
                totalQuestions
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Not enough suitable questions are available. Please add more questions to the Question Bank.",

                    required:
                        totalQuestions,

                    available:
                        selectedQuestions.length

                });

            }


            /*
                FINAL SHUFFLE
            */

            const finalQuestions =
                shuffleArray(
                    selectedQuestions
                );


            res.json({

                success: true,

                message:
                    "Question paper generated successfully.",

                totalQuestions:
                    finalQuestions.length,

                questions:
                    finalQuestions

            });


        } catch (error) {

            console.error(
                "Error generating paper:",
                error
            );

            res.status(500).json({

                success: false,

                message:
                    "Failed to generate question paper."

            });

        }

    }
);
/*
=========================================================
SAVE GENERATED QUESTION PAPER
=========================================================
*/

app.post(
    "/api/save-paper",
    requireAuthentication,
    async function (req, res) {

        try {

            const database =
                req.app.locals.database;

            const papersCollection =
                database.collection(
                    PAPERS_COLLECTION
                );

            const paperName =
                req.body.paperName;

            const subject =
                req.body.subject;

            const semester =
                req.body.semester;

            const questions =
                req.body.questions;


            if (
                !paperName ||
                !subject ||
                !semester ||
                !Array.isArray(questions) ||
                questions.length === 0
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Paper name, subject, semester and questions are required."

                });

            }


            /*
                FIND NEXT PAPER NUMBER
            */

            const previousPaper =
                await papersCollection
                    .find({})
                    .sort({
                        paperNumber: -1
                    })
                    .limit(1)
                    .toArray();


            let nextNumber = 1;


            if (
                previousPaper.length > 0 &&
                previousPaper[0].paperNumber
            ) {

                const previousNumber =
                    parseInt(
                        String(
                            previousPaper[0].paperNumber
                        ).replace(
                            /[^0-9]/g,
                            ""
                        ),
                        10
                    );


                if (
                    !isNaN(
                        previousNumber
                    )
                ) {

                    nextNumber =
                        previousNumber + 1;

                }

            }


            const paperNumber =
                "Paper " +
                String(
                    nextNumber
                ).padStart(
                    3,
                    "0"
                );


            const paper = {

                paperNumber:
                    paperNumber,

                paperName:
                    paperName,

                subject:
                    subject,

                semester:
                    semester,

                questions:
                    questions,

                createdAt:
                    new Date(),

                updatedAt:
                    new Date()

            };


            const result =
                await papersCollection.insertOne(
                    paper
                );


            /*
                MARK QUESTIONS AS USED
            */

            await addPaperUsage(

                database,

                questions,

                result.insertedId,

                paperNumber,

                paperName

            );


            res.status(201).json({

                success: true,

                message:
                    "Question paper saved successfully.",

                paperId:
                    result.insertedId,

                paperNumber:
                    paperNumber

            });


        } catch (error) {

            console.error(
                "Error saving paper:",
                error
            );

            res.status(500).json({

                success: false,

                message:
                    "Failed to save question paper."

            });

        }

    }
);


/*
=========================================================
GET ALL PREVIOUS PAPERS
=========================================================
*/

app.get(
    "/api/papers",
    requireAuthentication,
    async function (req, res) {

        try {

            const papersCollection =
                req.app.locals.database.collection(
                    PAPERS_COLLECTION
                );

            const papers =
                await papersCollection
                    .find({})
                    .sort({
                        createdAt: -1
                    })
                    .toArray();


            res.json({

                success: true,

                papers:
                    papers

            });


        } catch (error) {

            console.error(
                "Error loading papers:",
                error
            );

            res.status(500).json({

                success: false,

                message:
                    "Failed to load previous papers."

            });

        }

    }
);


/*
=========================================================
GET SINGLE PAPER
=========================================================
*/

app.get(
    "/api/papers/:id",
    requireAuthentication,
    async function (req, res) {

        try {

            const paperId =
                req.params.id;


            if (
                !ObjectId.isValid(
                    paperId
                )
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Invalid paper ID."

                });

            }


            const papersCollection =
                req.app.locals.database.collection(
                    PAPERS_COLLECTION
                );


            const paper =
                await papersCollection.findOne({

                    _id:
                        new ObjectId(
                            paperId
                        )

                });


            if (!paper) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Paper not found."

                });

            }


            res.json({

                success: true,

                paper:
                    paper

            });


        } catch (error) {

            console.error(
                "Error loading paper:",
                error
            );

            res.status(500).json({

                success: false,

                message:
                    "Failed to load paper."

            });

        }

    }
);


/*
=========================================================
UPDATE PREVIOUS PAPER
=========================================================
*/

app.put(
    "/api/papers/:id",
    requireAuthentication,
    async function (req, res) {

        try {

            const paperId =
                req.params.id;


            if (
                !ObjectId.isValid(
                    paperId
                )
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Invalid paper ID."

                });

            }


            const papersCollection =
                req.app.locals.database.collection(
                    PAPERS_COLLECTION
                );


            const oldPaper =
                await papersCollection.findOne({

                    _id:
                        new ObjectId(
                            paperId
                        )

                });


            if (!oldPaper) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Paper not found."

                });

            }


            /*
                REMOVE OLD USAGE
            */

            await removePaperUsage(

                req.app.locals.database,

                paperId

            );


            const updatedPaper = {

                paperName:
                    req.body.paperName ||
                    oldPaper.paperName,

                subject:
                    req.body.subject ||
                    oldPaper.subject,

                semester:
                    req.body.semester ||
                    oldPaper.semester,

                questions:
                    Array.isArray(
                        req.body.questions
                    )
                        ? req.body.questions
                        : oldPaper.questions,

                updatedAt:
                    new Date()

            };


            await papersCollection.updateOne(

                {
                    _id:
                        new ObjectId(
                            paperId
                        )
                },

                {
                    $set:
                        updatedPaper
                }

            );


            /*
                ADD NEW USAGE
            */

            await addPaperUsage(

                req.app.locals.database,

                updatedPaper.questions,

                paperId,

                oldPaper.paperNumber,

                updatedPaper.paperName

            );


            res.json({

                success: true,

                message:
                    "Paper updated successfully."

            });


        } catch (error) {

            console.error(
                "Error updating paper:",
                error
            );

            res.status(500).json({

                success: false,

                message:
                    "Failed to update paper."

            });

        }

    }
);


/*
=========================================================
DELETE PREVIOUS PAPER
=========================================================
*/

app.delete(
    "/api/papers/:id",
    requireAuthentication,
    async function (req, res) {

        try {

            const paperId =
                req.params.id;


            if (
                !ObjectId.isValid(
                    paperId
                )
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Invalid paper ID."

                });

            }


            const papersCollection =
                req.app.locals.database.collection(
                    PAPERS_COLLECTION
                );


            const paper =
                await papersCollection.findOne({

                    _id:
                        new ObjectId(
                            paperId
                        )

                });


            if (!paper) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Paper not found."

                });

            }


            /*
                REMOVE QUESTION USAGE
            */

            await removePaperUsage(

                req.app.locals.database,

                paperId

            );


            /*
                DELETE PAPER
            */

            await papersCollection.deleteOne({

                _id:
                    new ObjectId(
                        paperId
                    )

            });


            res.json({

                success: true,

                message:
                    "Paper deleted successfully."

            });


        } catch (error) {

            console.error(
                "Error deleting paper:",
                error
            );

            res.status(500).json({

                success: false,

                message:
                    "Failed to delete paper."

            });

        }

    }
);


/*
=========================================================
SERVER START
=========================================================
*/

async function startServer() {

    try {

        console.log(
            "START SERVER FUNCTION CALLED"
        );


        const connection =
            await connectDatabase();


        console.log(
            "DATABASE CONNECTION COMPLETED"
        );


        const database =
            connection.database;


        app.locals.database =
            database;


        await getSystemSettings(
            database
        );


        console.log(
            "SYSTEM SETTINGS COMPLETED"
        );


        const server =
    app.listen(
        PORT,
        "0.0.0.0",
        function () {
                    console.log(
                        "Server is running at http://localhost:" +
                        PORT
                    );

                    console.log(
                        "SERVER ADDRESS:",
                        server.address()
                    );

                }
            );


    } catch (error) {

        console.error(
            "SERVER START ERROR:",
            error
        );

        process.exit(
            1
        );

    }

}


startServer();