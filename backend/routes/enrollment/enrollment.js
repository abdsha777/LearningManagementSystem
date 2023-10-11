const express = require('express')
const fetchuser = require('../../middleware/fetchuser')
const { body, validationResult } = require('express-validator');
const Enrollment = require('../../models/Enrollment');

const router = express.Router()

router.post('/', fetchuser, [
    body('courseId').isMongoId()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { courseId } = req.body;

        const existingEnrollment = await Enrollment.findOne({
            userId: req.user._id,
            courseId: courseId,
        });

        if (existingEnrollment) {
            return res.status(400).json({ error: 'User is already enrolled in the course' });
        }
        const dueDate = new Date();
        dueDate.setMonth(dueDate.getMonth() + 3);
        const newEnrollment = new Enrollment({
            userId: req.user._id, // User's ID
            courseId: courseId,
            enrollmentDate: new Date(),
            dueDate: dueDate, // Set your due date logic
        });
        await newEnrollment.save();

        res.status(201).json(newEnrollment);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
})

// router.get('/',(req,res)=>{
//     const dueDate = new Date();
//     dueDate.setMonth(dueDate.getMonth() + 3);
//     res.send(dueDate);
// })

module.exports = router