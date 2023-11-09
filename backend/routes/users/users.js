const express = require('express')
const fetchuser = require('../../middleware/fetchuser')
const isAdmin = require('../../middleware/isAdmin')
const isAdminOrTeacher = require('../../middleware/isAdminOrTeacher')
const Course = require('../../models/Course')
const Enrollment = require('../../models/Enrollment')
const User = require('../../models/User')
const StudentDetail = require('../../models/StudentDetail')

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

        const studentDetails = await StudentDetail.find({
            userId: { $in: students.map(s => s.id) }
        })

        const enrollmentCounts = await Enrollment.aggregate([
            {
                $match: {
                    userId: { $in: students.map(student => student.id) }
                }
            },
            {
                $group: {
                    _id: '$userId',
                    totalEnrolled: { $sum: 1 },
                    totalCompleted: {
                        $sum: {
                            $cond: [{ $eq: ['$status', 'completed'] }, 1, 0]
                        }
                    }
                }
            }
        ]);

        const studentInfo = students.map(student => {
            const detail = studentDetails.find(detail => detail.userId.equals(student._id));
            const enrollmentCount = enrollmentCounts.find(count => count._id.equals(student._id));
            return {
                id:student.id,
                name: student.name,
                active: student.active,
                class: detail ? detail.class : null,
                totalEnrolled: enrollmentCount ? enrollmentCount.totalEnrolled : 0,
                totalCompleted: enrollmentCount ? enrollmentCount.totalCompleted : 0
            };
        });

        res.json(studentInfo);
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