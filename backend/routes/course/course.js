const express = require('express')
const fetchuser = require('../../middleware/fetchuser')
const Course = require('../../models/Course')
const isAdminOrTeacher = require('../../middleware/isAdminOrTeacher')
const { body, validationResult } = require('express-validator');
const User = require('../../models/User');
const Enrollment = require('../../models/Enrollment');
const multer = require("multer")
const path = require("path");
const { default: mongoose } = require('mongoose');
const Unit = require('../../models/Unit');
const Video = require('../../models/Video');
const Test = require('../../models/Test');

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

router.get('/detail/:id', fetchuser, async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ error: "Invalid Id" })
        }
        const course = await Course.findOne({ _id: id })

        // if(req.user.id != course._id){
        //     return res.status(401).json({error:"Unauthorized"})
        // }
        const units = await Unit.find({ courseId: course._id })
        // course.units = units
        const finalTest = await Test.findOne({courseId:course._id,final:true})
        const result = {
            _id: course._id,
            title: course.title,
            description: course.description,
            duration: course.duration,
            courseImg: course.courseImg,
            units: await Promise.all(units.map(async (u) => {
                let numOfVideo = await Video.countDocuments({ unitId: u._id })
                return {
                    _id: u._id,
                    courseId: u.courseId,
                    title: u.title,
                    description: u.description,
                    sequence: u.sequence,
                    duration: u.duration,
                    numOfVideo
                }
            })),
            finalTest:finalTest
        }
        return res.json(result)
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

router.post('/create/', fetchuser, isAdminOrTeacher, upload.single('courseImg'), [
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

router.post('/update/:id', fetchuser, isAdminOrTeacher, upload.single('courseImg'), [
    body('title').isLength({ min: 1 }),
    body('description').isLength({ min: 5 }),
    body('duration').exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const id = req.params.id;
        if (!mongoose.isObjectIdOrHexString(id)) {
            return res.status(400).json({ error: "Invalid Id" })
        }
        const { title, description, duration } = req.body;
        const courseImg = req.file; // Access the uploaded file

        // Save the course with image information
        const updated = await Course.findOneAndUpdate({
            _id: id
        }, {
            title: title,
            description: description,
            duration: duration,
            courseImg: courseImg?.filename, // Store the filename in the database
            teacherId: req.user.id,
        });

        res.status(200).json(updated);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
})


module.exports = router