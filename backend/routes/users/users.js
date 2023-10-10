const express = require('express')
const fetchuser = require('../../middleware/fetchuser')
const isAdmin = require('../../middleware/isAdmin')
const isAdminOrTeacher = require('../../middleware/isAdminOrTeacher')
const Course = require('../../models/Course')
const Enrollment = require('../../models/Enrollment')
const User = require('../../models/User')

const router = express.Router()

router.get('/',fetchuser,isAdmin,async (req,res)=>{
    try {
        const allUsers = await User.find();
        res.json(allUsers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
})
router.get('/teachers',fetchuser,isAdmin,async (req,res)=>{
    try {
        const teachers = await User.find({role:'teacher'});
        res.json(teachers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
})
router.get('/students',fetchuser,isAdmin,async (req,res)=>{
    try {
        const students = await User.find({role:'student'});
        res.json(students);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
})

router.get('/mystudents',fetchuser,isAdminOrTeacher,async (req,res)=>{
    try {
        const courses = await Course.find({teacherId:req.user.id})
        const courseIds = courses.map(course => course.id)

        const enrolledStudents = await Enrollment.find({
            courseId:{$in:courseIds},
        }).populate('userId','name email')
        res.json(enrolledStudents);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
})

module.exports = router