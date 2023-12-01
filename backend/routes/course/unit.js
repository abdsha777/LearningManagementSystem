const express = require("express");
const { default: mongoose } = require("mongoose");
const fetchuser = require("../../middleware/fetchuser");
const Course = require("../../models/Course");
const isAdminOrTeacher = require("../../middleware/isAdminOrTeacher");
const { body, validationResult } = require("express-validator");
const Unit = require("../../models/Unit");
const Video = require("../../models/Video");
const MCQ = require("../../models/MCQ");
const Test = require("../../models/Test");

const router = express.Router();

router.post(
    "/create/",
    fetchuser,
    isAdminOrTeacher,
    [
        body("title").isLength({ min: 1 }),
        body("description").isLength({ min: 2 }),
        body("duration").isInt(),
        body("courseId").isMongoId(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { title, description, courseId, duration } = req.body;
            const sequence = (await Unit.countDocuments({ courseId })) + 1;

            const newUnit = await Unit.create({
                courseId,
                title,
                description,
                duration,
                sequence,
            });

            res.status(201).json(newUnit);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Server error" });
        }
    }
);

router.get("/get/:id", fetchuser, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const id = req.params.id;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ error: "Invalid Id" });
        }
        const unit = await Unit.findOne({ _id: id });
        const test = await Test.findOne({ unitId: id });
        var numberOfQuestion = 0
        if (test) {
            numberOfQuestion = await MCQ.countDocuments({ testId: test._id })
        }
        res.json({
            active: unit.active,
            courseId: unit.courseId,
            description: unit.description,
            duration: unit.duration,
            sequence: unit.sequence,
            title: unit.title,
            _id: unit._id,
            numberOfQuestion
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

router.delete("/delete/:id", fetchuser, isAdminOrTeacher, async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ error: "Invalid Id" });
        }
        const unit = await Unit.findOne({ _id: id });
        if (!unit) {
            return res.status(400).json({ error: "Invalid Unit Id" });
        }
        const course = await Course.findOne({ _id: unit.courseId });

        if (course.teacherId == req.user.id) {
            await Unit.deleteOne({ _id: id });
            await Video.deleteMany({ unitId: id });
            var test = await Test.findOne({ unitId: id });
            if (test) {
                await MCQ.deleteMany({ testId: test._id })
                await Test.deleteOne({ _id: test._id })
            }
            const allUnits = await Unit.find({ courseId: course._id });

            allUnits
                .sort((a, b) => {
                    a.sequence < b.sequence ? -1 : 1;
                })
                .map((u, idx) => {
                    u.sequence = idx + 1;
                    u.save();
                });
            return res.json({ message: "Unit Deleted" });
        } else {
            return res.status(401).json({ error: "Unauthorized" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});
router.put(
    "/update/:id",
    fetchuser,
    isAdminOrTeacher,
    [
        body("title").isLength({ min: 1 }),
        body("description").isLength({ min: 2 }),
        body("duration").isInt(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { title, description, duration } = req.body;
            const id = req.params.id;

            const newUnit = await Unit.findOneAndUpdate(
                { _id: id },
                {
                    title,
                    description,
                    duration,
                },
                { new: true }
            );

            res.status(201).json(newUnit);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Server error" });
        }
    }
);

module.exports = router;
