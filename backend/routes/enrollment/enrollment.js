const express = require('express')
const fetchuser = require('../../middleware/fetchuser')
const { body, validationResult } = require('express-validator');
const Enrollment = require('../../models/Enrollment');
const  mongoose = require('mongoose');

const router = express.Router()

router.post('/',fetchuser,async (req,res)=>{
    try {
        const {courseId,userId} = req.body;
        if(!courseId || !userId || !mongoose.isValidObjectId(courseId) || !mongoose.isValidObjectId(userId)){
            return res.status(400).json({error:"Invalid data"})
        }
        const newEnrollment = await Enrollment.create({
            courseId,
            userId,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({"error":"Server error"})
    }
})

// router.get('/',(req,res)=>{
//     const dueDate = new Date();
//     dueDate.setMonth(dueDate.getMonth() + 3);
//     res.send(dueDate);
// })

module.exports = router