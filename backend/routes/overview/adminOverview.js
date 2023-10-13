const express = require('express')
const fetchuser = require('../../middleware/fetchuser');
const User = require('../../models/User');
const Course = require('../../models/Course');
const Enrollment = require('../../models/Enrollment');
const isAdmin = require('../../middleware/isAdmin');

const router = express.Router()

router.get('/', fetchuser,isAdmin ,async (req, res) => {
    try {
        const totalStudents = await User.countDocuments({ role: 'student' });
        const totalTeachers = await User.countDocuments({ role: 'teacher' });
        const totalCourses = await Course.countDocuments();
        const totalEnrollments = await Enrollment.countDocuments();

        const courseData = await Enrollment.aggregate([
            {
              $group: {
                _id: '$courseId',
                studentCount: { $sum: 1 },
              },
            },
            {
              $lookup: {
                from: 'courses', // Name of the Course collection in your database
                localField: '_id',
                foreignField: '_id',
                as: 'courseData',
              },
            },
            {
              $project: {
                courseName: { $arrayElemAt: ['$courseData.title', 0] },
                studentCount: 1,
              },
            },
          ]);

        const adminOverview = {
            totalStudents: totalStudents,
            totalTeachers: totalTeachers,
            totalCourses: totalCourses,
            totalEnrollments: totalEnrollments,
            courseData:courseData
        };
        res.json(adminOverview);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
})
module.exports = router