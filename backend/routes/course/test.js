const express = require("express")
const fetchuser = require("../../middleware/fetchuser")
const isAdminOrTeacher = require("../../middleware/isAdminOrTeacher")
const mongoose = require("mongoose")
const Test = require("../../models/Test")
const MCQ = require("../../models/MCQ")


const router = express.Router()

router.get('/final/get/:id', fetchuser, async (req, res) => {
    try {
        const id = req.params.id;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ error: "Invalid Id" })
        }

        const finalTest = await Test.findOne({ courseId: id, final: true })

        const mcqs = await MCQ.find({ testId: finalTest._id })
        if (req.user.role == "student") {
            const simplifiedMcqs = mcqs.map(({ question, options }) => ({
                question,
                options,
            }));
            return res.json(simplifiedMcqs)
        }
        return res.json(mcqs)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Server Error." })
    }
})

router.post("/final/addmcq", fetchuser, isAdminOrTeacher,
    async (req, res) => {
        try {
            const { question, options, answer, courseId, final } = req.body;
            if (!mongoose.isValidObjectId(courseId)) {
                return res.status(400).json({ "error": "Invalid Course ID" })
            }
            if (!question || !options || options.length != 4 || !answer) {
                return res.status(400).json({ "error": "Invalid Data" })
            }

            var finalTest = await Test.findOne({ courseId: courseId, final: true })

            if (!finalTest) {
                finalTest = await Test.create({
                    courseId,
                    final: true
                })
                console.log(finalTest)
                return res.send("new")
            }

            var newMCQ = await MCQ.create({
                question,
                answer,
                options,
                testId: finalTest._id
            })

            return res.json(newMCQ)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: "Server Error." })
        }
    }
)


module.exports = router