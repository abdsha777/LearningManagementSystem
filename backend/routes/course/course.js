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
const MCQ = require('../../models/MCQ');
const UnitRecord = require('../../models/UnitRecord');
const VideoRecord = require('../../models/VideoRecord');
const TestRecord = require('../../models/TestRecord');

const router = express.Router()

router.get('/', fetchuser, async (req, res) => {
    try {
        const courses = await Course.find()

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
                    duration: course.duration,
                    courseImg: course.courseImg
                };
            })
        );

        const result = {
            courses: courseDetails
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
        if (!course) {
            return res.status(400).json({ error: "Invalid Id" })
        }
        const isEnrolled = await Enrollment.findOne({ courseId: course._id, userId: new mongoose.Types.ObjectId(req.user.id) })

        const units = await Unit.find({ courseId: course._id })
        // course.units = units
        const finalTest = await Test.findOne({ courseId: course._id, final: true })
        var mcqCount = 0
        if (finalTest) {
            mcqCount = await MCQ.countDocuments({ testId: finalTest._id })
        }

        const teacher = await User.findOne({ _id: course.teacherId })

        const enrolledStudents = await Enrollment.countDocuments({ courseId: course._id })

        const result = {
            _id: course._id,
            title: course.title,
            description: course.description,
            duration: course.duration,
            courseImg: course.courseImg,
            teacher: teacher.name,
            enrolledStudents,
            isEnrolled,
            units: await Promise.all(units.map(async (u) => {
                let numOfVideo = await Video.countDocuments({ unitId: u._id })
                let test = await Test.findOne({ unitId: u._id })
                let testRecord;
                if (test) {
                    testRecord = await TestRecord.findOne({ testId: test._id, userId: new mongoose.Types.ObjectId(req.user.id) })
                    // console.log(test._id)
                    // console.log(req.user.id)
                    // console.log(testRecord)
                }
                let numOfMCQ = 0;
                if (test) {
                    numOfMCQ = await MCQ.countDocuments({ testId: test._id })
                }
                const unitRecord = await UnitRecord.findOne({ unitId: u._id, userId: req.user.id })

                const videos = await Video.find({ unitId: u._id })
                return {
                    _id: u._id,
                    courseId: u.courseId,
                    title: u.title,
                    description: u.description,
                    sequence: u.sequence,
                    duration: u.duration,
                    numOfVideo,
                    numOfMCQ,
                    testLocked: testRecord?.locked,
                    testId: test?._id,
                    locked: unitRecord?.locked,
                    videos: await Promise.all(videos.map(async (v) => {
                        let videoRecord = await VideoRecord.findOne({ videoId: v._id, userId: req.user.id })
                        return {
                            _id: v._id,
                            unitId: v.unitId,
                            duration: v.duration,
                            description: v.description,
                            youtubeId: v.youtubeId,
                            title: v.title,
                            url: v.url,
                            sequence: v.sequence,
                            locked: videoRecord?.locked
                        }
                    }))
                    // videos: videos
                }
            })),
            finalTest: finalTest ? {
                _id: finalTest?._id,
                courseId: finalTest?.courseId,
                mcqCount: mcqCount
            } : null
        }
        return res.json(result)

        // const result1 = await Course.aggregate([
        //     { $match: { _id: new mongoose.Types.ObjectId(id) } },
        //     {
        //         $lookup: {
        //             from: 'units',
        //             let: { courseId: '$_id' },
        //             pipeline: [
        //                 {
        //                     $match: {
        //                         $expr: {
        //                             $eq: ['$courseId', '$$courseId']
        //                         }
        //                     }
        //                 },
        //                 {
        //                     $lookup: {
        //                         from: 'videos',
        //                         localField: '_id',
        //                         foreignField: 'unitId',
        //                         as: 'videos'
        //                     }
        //                 },
        //                 {
        //                     $lookup: {
        //                         from: 'tests',
        //                         localField: '_id',
        //                         foreignField: 'unitId',
        //                         as: 'test'
        //                     }
        //                 },
        //                 {
        //                     $lookup: {
        //                         from: 'mcqs',
        //                         localField: 'test._id',
        //                         foreignField: 'testId',
        //                         as: 'mcqs'
        //                     }
        //                 },
        //                 {
        //                     $addFields: {
        //                         numOfVideo: { $size: '$videos' },
        //                         numOfMCQ: { $size: '$mcqs' }
        //                     }
        //                 }
        //             ],
        //             as: "units"
        //         }
        //     },
        //     {
        //         $lookup: {
        //             from: 'users',
        //             localField: 'teacherId',
        //             foreignField: '_id',
        //             as: 'teacher'
        //         }
        //     },
        //     {
        //         $lookup: {
        //             from: 'enrollments',
        //             let: { courseId: '$_id' },
        //             pipeline: [
        //                 {
        //                     $match: {
        //                         $expr: {
        //                             $and: [
        //                                 { $eq: ['$courseId', '$$courseId'] },
        //                                 { $eq: ['$userId', new mongoose.Types.ObjectId(req.user.id)] }
        //                             ]
        //                         }
        //                     }
        //                 }
        //             ],
        //             as: 'enrollment'
        //         }
        //     },
        //     {
        //         $lookup: {
        //             from: 'enrollments',
        //             let: { courseId: '$_id' },
        //             pipeline: [
        //                 {
        //                     $match: {
        //                         $expr: {
        //                             $eq: ['$courseId', '$$courseId']
        //                         }
        //                     }
        //                 }
        //             ],
        //             as: 'enrolledStudents'
        //         }
        //     },
        //     {
        //         $lookup: {
        //             from: 'tests',
        //             let: { courseId: '$_id' },
        //             pipeline: [
        //                 {
        //                     $match: {
        //                         $expr: {
        //                             $and: [
        //                                 { $eq: ['$courseId', '$$courseId'] },
        //                                 { $eq: ['$final', true] }
        //                             ]
        //                         }
        //                     }
        //                 },
        //                 {
        //                     $lookup: {
        //                         from: 'mcqs',
        //                         localField: '_id',
        //                         foreignField: 'testId',
        //                         as: 'mcqs'
        //                     }
        //                 },
        //                 {
        //                     $addFields: {
        //                         mcqCount: { $size: '$mcqs' }
        //                     }
        //                 },
        //                 { $unset: ['mcqs'] }
        //             ],
        //             as: 'finalTest'
        //         }
        //     },
        //     {
        //         $addFields: {
        //             isEnrolled: { $size: '$enrollment' },
        //             teacher: { $arrayElemAt: ['$teacher.name', 0] },
        //             enrolledStudents: { $size: '$enrolledStudents' },
        //             finalTest: {
        //                 $cond: {
        //                     if: { $gt: [{ $size: '$finalTest' }, 0] },
        //                     then: { $arrayElemAt: ['$finalTest', 0] },
        //                     else: null
        //                 }
        //             }
        //         }
        //     },
        //     {
        //         $project: {
        //             _id: 1,
        //             title: 1,
        //             description: 1,
        //             duration: 1,
        //             courseImg: 1,
        //             teacher: 1,
        //             enrolledStudents: 1,
        //             isEnrolled: 1,
        //             units: {
        //                 $map: {
        //                     input: '$units',
        //                     as: 'unit',
        //                     in: {
        //                         _id: '$$unit._id',
        //                         courseId: '$$unit.courseId',
        //                         title: '$$unit.title',
        //                         description: '$$unit.description',
        //                         sequence: '$$unit.sequence',
        //                         duration: '$$unit.duration',
        //                         numOfVideo: '$$unit.numOfVideo',
        //                         numOfMCQ: '$$unit.numOfMCQ',
        //                         videos: '$$unit.videos'
        //                     }
        //                 }
        //             },
        //             finalTest: {
        //                 $cond: {
        //                     if: { $ne: ['$finalTest', null] },
        //                     then: {
        //                         _id: '$finalTest._id',
        //                         courseId: '$finalTest.courseId',
        //                         mcqCount: '$finalTest.mcqCount'
        //                     },
        //                     else: null
        //                 }
        //             }
        //         }
        //     }
        // ])

        // return res.json(result1[0])
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

router.put('/unitsequence', fetchuser, isAdminOrTeacher, async (req, res) => {
    try {
        const { units } = req.body;
        if (units.lenght < 1) {
            return res.json({ msg: "no data" })
        }
        // console.log(units)
        await Promise.all(units.map(async (u) => {
            await Unit.findOneAndUpdate({ _id: u._id }, {
                sequence: u.sequence
            })
        }))
        return res.json({ msg: "updated" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Server Error" })
    }
})

router.put('/videosequence', fetchuser, isAdminOrTeacher, async (req, res) => {
    try {
        const { units } = req.body;
        if (units.lenght < 1) {
            return res.json({ msg: "no data" })
        }
        // console.log(units)
        await Promise.all(units.map(async (u) => {
            await Video.findOneAndUpdate({ _id: u._id }, {
                sequence: u.sequence
            })
        }))
        return res.json({ msg: "updated" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Server Error" })
    }
})

module.exports = router