const express = require('express')
const fetchuser = require('../../middleware/fetchuser');
const Course = require('../../models/Course');
const Enrollment = require('../../models/Enrollment');
const isAdminOrTeacher = require('../../middleware/isAdminOrTeacher');

const router = express.Router()

router.get('/', fetchuser, isAdminOrTeacher ,async (req, res) => {
    try {
        const teacherId = req.user.id;

        // Calculate the number of students enrolled in the teacher's courses
        const studentsEnrolledInTeacherCourses = await Enrollment.countDocuments({
            courseId: { $in: (await Course.find({ teacherId })).map((course) => course._id) },
        });

        // Calculate the number of courses the teacher has
        const teacherCourseCount = await Course.countDocuments({ teacherId });

        // Calculate the total number of students enrolled in the teacher's courses
        const totalStudentsInTeacherCourses = await Enrollment.distinct('userId', {
            courseId: { $in: (await Course.find({ teacherId })).map((course) => course._id) },
        });
        const courseData = await Enrollment.aggregate([
            {
              $match: {
                courseId: {
                  $in: (await Course.find({ teacherId: req.user._id })).map((course) => course._id),
                },
              },
            },
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

        // Create a response object
        const teacherDashboard = {
            studentsEnrolledInTeacherCourses: studentsEnrolledInTeacherCourses,
            teacherCourseCount: teacherCourseCount,
            totalStudentsInTeacherCourses: totalStudentsInTeacherCourses.length,
            courseData:courseData
        };

        res.json(teacherDashboard);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
})
module.exports = router