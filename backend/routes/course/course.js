const express = require('express')
const fetchuser = require('../../middleware/fetchuser')
const Course = require('../../models/Course')
const isAdminOrTeacher = require('../../middleware/isAdminOrTeacher')
const { body, validationResult } = require('express-validator');
const User = require('../../models/User');
const Enrollment = require('../../models/Enrollment');
const multer = require("multer")
const path = require("path")

const router = express.Router()

router.get('/', fetchuser, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const searchTitle = req.query.title || '';

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const query = {};
        if (searchTitle) {
            query.title = { $regex: searchTitle, $options: 'i' };
        }

        const coursesCount = await Course.countDocuments(query);
        const totalPages = Math.ceil(coursesCount / limit);

        const courses = await Course.find(query)
            .skip(startIndex)
            .limit(limit);

        // Retrieve additional information for each course
        const courseDetails = await Promise.all(
            courses.map(async (course) => {
                // Query the teacher's name
                const teacher = await User.findById(course.teacherId);

                // Query the number of enrolled students
                const enrolledStudentsCount = await Enrollment.countDocuments({
                    courseId: course.id,
                });

                // Query the number of students who have completed the course
                const completedStudentsCount = await Enrollment.countDocuments({
                    courseId: course.id,
                    status: 'completed',
                });

                return {
                    id: course.id,
                    title: course.title,
                    description: course.description,
                    teacher: teacher.name,
                    enrolledStudents: enrolledStudentsCount,
                    completedStudents: completedStudentsCount, // Add the number of students who have completed the course
                    date: course.createdAt, // Add the course date (adjust as needed)
                };
            })
        );

        const result = {
            courses: courseDetails,
            currentPage: page,
            totalPages: totalPages,
            totalCourses: coursesCount,
        };

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "img"); // Set the destination directory
    },
    filename: (req, file, cb) => {
        // Set the filename to the course name with the original extension
        const extension = path.extname(file.originalname);
        const courseName = req.body.title.replace(/\s+/g, '_').toLowerCase(); // Convert spaces to underscores
        const fileName = `${courseName}${extension}`;
        cb(null, fileName);
    },
});
const upload = multer({ storage: storage });

router.post('/create/', fetchuser, isAdminOrTeacher, upload.single('courseImg') , [
    body('title').isLength({ min: 1 }),
    body('description').isLength({ min: 5 }),
    body('duration').exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { title, description, duration } = req.body;
        const courseImg = req.file; // Access the uploaded file

        // Check if an image was provided
        if (!courseImg) {
            return res.status(400).json({ error: 'Please provide a course image.' });
        }

        // Save the course with image information
        const newCourse = await Course.create({
            title: title,
            description: description,
            duration: duration,
            courseImg: courseImg.filename, // Store the filename in the database
            teacherId: req.user.id,
        });

        res.status(201).json(newCourse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
})

router.get('/mycourse/', fetchuser, isAdminOrTeacher, async (req, res) => {
    try {

        const query = { teacherId: req.user.id };

        const courses = await Course.find(query);

        res.json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
})

module.exports = router