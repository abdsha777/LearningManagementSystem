const express = require('express')
const fetchuser = require('../../middleware/fetchuser')
const { body, validationResult } = require('express-validator');
const Enrollment = require('../../models/Enrollment');
const mongoose = require('mongoose');
const Unit = require('../../models/Unit');
const UnitRecord = require('../../models/UnitRecord');
const Video = require('../../models/Video');
const VideoRecord = require('../../models/VideoRecord');
const Test = require('../../models/Test');
const TestRecord = require('../../models/TestRecord');

const router = express.Router()

router.post('/', fetchuser, async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.user.id;
        // console.log(courseId)
        if (!courseId || !mongoose.isValidObjectId(courseId)) {
            return res.status(400).json({ error: "Invalid data" })
        }
        const alreadyEnrolled = await Enrollment.findOne({ courseId, userId })
        if (alreadyEnrolled) {
            return res.status(400).json({ error: "Already Enrolled" })
        }
        const newEnrollment = await Enrollment.create({
            courseId,
            userId,
        })
        const units = await Unit.find({ courseId })
        // console.log(units)
        // creating all black record that will be locked or incomplete from the start,
        // after the users has completed the previous one the next one will be accesible and 
        // so on.
        await Promise.all(units.map(async (u, idx) => {
            await UnitRecord.create({ unitId: u._id, userId: req.user.id, courseId, locked: !idx == 0 });

            const videos = await Video.find({ unitId: u._id })
            await Promise.all(videos.map(async (v, idx2) => {
                await VideoRecord.create({ videoId: v._id, unitId: u._id, userId: req.user.id, locked: !(idx == 0 && idx2 == 0) })
            }))
            const test = await Test.findOne({ unitId: u._id })
            if (test) {
                console.log(1)
                await TestRecord.create({ testId: test._id, unitId: u._id, userId: req.user.id })
            }
        }))

        const finalTest = await Test.findOne({ courseId: courseId, final: true })
        if (finalTest) {
            // console.log(finalTest)
            await TestRecord.create({ testId: finalTest._id, courseId: courseId, userId: req.user.id })
        }

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