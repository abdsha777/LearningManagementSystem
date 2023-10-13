const express = require('express')
const fetchuser = require('../../middleware/fetchuser')
const Course = require('../../models/Course')
const isAdminOrTeacher = require('../../middleware/isAdminOrTeacher')
const { body, validationResult } = require('express-validator');

const router = express.Router()

router.get('/', fetchuser, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Get the requested page (default to page 1)
        const limit = parseInt(req.query.limit) || 10; // Set a default limit or use a query parameter
        const searchTitle = req.query.title || '';

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const query = {};
        if (searchTitle) {
            query.title = { $regex: searchTitle, $options: 'i' }; // Case-insensitive search by title
        }

        const coursesCount = await Course.countDocuments(query);
        const totalPages = Math.ceil(coursesCount / limit);

        const courses = await Course.find(query).skip(startIndex).limit(limit);

        const result = {
            courses: courses,
            currentPage: page,
            totalPages: totalPages,
            totalCourses: coursesCount, // Add totalCourses to indicate the total number of courses available
        };

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
})

router.post('/create/', fetchuser, isAdminOrTeacher, [
    body('title').isLength({ min: 5 }),
    body('description').isLength({ min: 10 }),
    body('duration').isInt(),
    body('courseImg')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { title, description, duration, courseImg } = req.body;
        console.log(req.user.id)
        const newCourse = await Course.create({
            title: title,
            description: description,
            duration: duration,
            courseImg: courseImg,
            teacherId: req.user.id,
        })
        res.status(201).json(newCourse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
})

router.get('/teachermycourse/', fetchuser,isAdminOrTeacher ,async (req, res) => {
    try {
        const searchTitle = req.query.title || '';

        const query = { teacherId: req.user.id };

        if (searchTitle) {
            query.title = { $regex: searchTitle, $options: 'i' }; // Case-insensitive search by title
        }

        const courses = await Course.find(query);

        const result = {
            courses: courses, // Add totalCourses to indicate the total number of courses available
        };

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
})

module.exports = router