const express = require('express')
const fetchuser = require('../../middleware/fetchuser')
const { body, validationResult } = require('express-validator');
const Enrollment = require('../../models/Enrollment');
const mongoose = require('mongoose');

const router = express.Router()

router.post('/', fetchuser, async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.user.id;
        // console.log(courseId)
        if (!courseId || !mongoose.isValidObjectId(courseId)) {
            return res.status(400).json({ error: "Invalid data" })
        }
        const alreadyEnrolled = await Enrollment.findOne({courseId,userId})
        if(alreadyEnrolled){
            return res.status(400).json({ error: "Already Enrolled" })
        }
        const newEnrollment = await Enrollment.create({
            courseId,
            userId,
        })
        return res.json(newEnrollment)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ "error": "Server error" })
    }
})

// router.get('/',(req,res)=>{
//     const dueDate = new Date();
//     dueDate.setMonth(dueDate.getMonth() + 3);
//     res.send(dueDate);
// })

module.exports = router