const express = require('express')
const { default: mongoose } = require('mongoose');
const fetchuser = require('../../middleware/fetchuser')
const Course = require('../../models/Course')
const isAdminOrTeacher = require('../../middleware/isAdminOrTeacher')
const { body, validationResult } = require('express-validator');
const Unit = require('../../models/Unit');

const router = express.Router()

router.post('/create/', fetchuser, isAdminOrTeacher, [
    body('title').isLength({ min: 1 }),
    body('description').isLength({ min: 2 }),
    body('duration').isInt(),
    body("courseId").isMongoId()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { title, description, courseId, duration } = req.body;
        const sequence = await Unit.countDocuments({courseId}) + 1

        const newUnit = await Unit.create({
            courseId,
            title,
            description,
            duration,
            sequence
        })

        res.status(201).json(newUnit);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
})


router.get('/get/:id', fetchuser, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const id = req.params.id;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ error: "Invalid Id" });
        }
        const unit = await Unit.findOne({_id:id})

        res.json(unit);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
})





module.exports = router