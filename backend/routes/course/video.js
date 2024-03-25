const express = require('express')
const { default: mongoose } = require('mongoose');
const fetchuser = require('../../middleware/fetchuser')
const Course = require('../../models/Course')
const isAdminOrTeacher = require('../../middleware/isAdminOrTeacher')
const { body, validationResult } = require('express-validator');
const Unit = require('../../models/Unit');
const Video = require('../../models/Video');
const fetch = require('node-fetch');
const VideoRecord = require('../../models/VideoRecord');
const Test = require('../../models/Test');
const TestRecord = require('../../models/TestRecord');

const getDuration = (durationString = "") => {
    const duration = { hours: 0, minutes: 0, seconds: 0 };
    const durationParts = durationString
        .replace("PT", "")
        .replace("H", ":")
        .replace("M", ":")
        .replace("S", "")
        .split(":");

    if (durationParts.length === 3) {
        duration["hours"] = durationParts[0];
        duration["minutes"] = durationParts[1];
        duration["seconds"] = durationParts[2];
    }

    if (durationParts.length === 2) {
        duration["minutes"] = durationParts[0];
        duration["seconds"] = durationParts[1];
    }

    if (durationParts.length === 1) {
        duration["seconds"] = durationParts[0];
    }

    return {
        ...duration,
        string: `${duration.hours}h${duration.minutes}m${duration.seconds}s`,
    };
};

async function getTime(url) {
    const id = url.split("v=")[1];
    // console.log(id)
    const videoUrl = new URL("https://www.googleapis.com/youtube/v3/videos");
    videoUrl.search = new URLSearchParams({
        key: "AIzaSyCvmIgCmavPYCR2JUGS_ha2WdNdPDX4fzw",
        part: "contentDetails",
        id: id,
    }).toString();
    const data = await fetch(videoUrl)
        .then(async (response) => {
            const data = await response.json();
            const videos = data?.items || [];
            return videos.map((video) => {
                return {
                    id: video?.id,
                    duration: getDuration(video?.contentDetails?.duration),
                };
            });
        })
        .catch((error) => {
            console.warn(error);
        });

    return data[0]
}

const router = express.Router()

router.post('/create/', fetchuser, isAdminOrTeacher, [
    body('title').isLength({ min: 1 }),
    body("unitId").isMongoId(),
    body('url').isURL()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { title, unitId, url, description } = req.body;
        const sequence = await Video.countDocuments({ unitId }) + 1

        // AIzaSyCvmIgCmavPYCR2JUGS_ha2WdNdPDX4fzw

        let time = await getTime(url.split('&')[0])
        var youtubeId = time.id;
        // console.log(youtubeId)
        const newVideo = await Video.create({
            unitId,
            title,
            description,
            sequence,
            url,
            youtubeId,
            duration: {
                hours: time.duration.hours,
                minutes: time.duration.minutes,
            }
        })
        // console.log(newVideo)
        res.status(201).json(newVideo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
})

router.get('/get/:id', fetchuser, async (req, res) => {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ error: "Invalid Id" })
    }
    const videos = await Video.find({ unitId: id })
    return res.json(videos)
})

router.put('/update/', fetchuser, isAdminOrTeacher, [
    body('_id').isMongoId(),
    body('title').isLength({ min: 1 }),
    body("unitId").isMongoId(),
    body('url').isURL()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { title, url, description, _id } = req.body;

        // AIzaSyCvmIgCmavPYCR2JUGS_ha2WdNdPDX4fzw
        const video = await Video.findOne({ _id })
        var youtubeId;
        var duration = video.duration;
        // if (video.url != url) {
        if (1) {
            let time = await getTime(url)
            console.log(time)
            youtubeId = time.id;
            duration = {
                hours: time.duration.hours,
                minutes: time.duration.minutes,
            }
        }
        const newVideo = await Video.findOneAndUpdate({ _id }, {
            title,
            description,
            url,
            duration,
            youtubeId
        }, { new: true })
        console.log(newVideo, youtubeId)
        res.status(201).json(newVideo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
})

router.delete('/delete/:id', fetchuser, isAdminOrTeacher, async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ error: "Invalid Id" })
        }
        const video = await Video.findOne({ _id: id })
        if (!video) {
            return res.status(400).json({ error: "Video does not exist" })
        }
        const unit = await Unit.findOne({ _id: video.unitId })
        const course = await Course.findOne({ _id: unit.courseId })
        if (course.teacherId == req.user.id) {
            await Video.deleteOne({ _id: id })

            const allVideos = await Video.find({ unitId: unit._id })
            allVideos.sort((a, b) => [
                a.sequence < b.sequence ? -1 : 1
            ]).map((v, idx) => {
                v.sequence = idx + 1;
                v.save();
            })

            // return res.json(allVideos)

            return res.json({ message: "Video deleted Successfully" })
        } else {
            return res.status(401).json({ error: "Unauthorized" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "server error" })
    }
})

router.post('/start/', fetchuser, async (req, res) => {
    try {
        const { videoId } = req.body;

        if (videoId == null || !mongoose.isValidObjectId(videoId)) {
            return res.status(400).json({ error: "Provide a valid video id." })
        }

        const video = await Video.findOne({ _id: videoId })

        if (!video) {
            return res.status(400).json({ error: "Provide a valid video id." })
        }


        var videoRecord = await VideoRecord.findOne({ videoId: videoId, userId: req.user.id })

        if (videoRecord == null) {
            return res.status(401).json({ error: "Not Enrolled." })
        }
        if (videoRecord.locked) {
            console.log(videoRecord)
            return res.status(403).json({ error: "Locked" })
        }
        videoRecord = await VideoRecord.findOneAndUpdate({ _id: videoRecord._id }, {
            startedOn: Date.now()
        }, { new: true })


        return res.json(videoRecord)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ "error": 'Server Error' })
    }
})

router.post('/check/', fetchuser, async (req, res) => {
    try {
        const { videoId } = req.body;

        if (videoId == null || !mongoose.isValidObjectId(videoId)) {
            return res.status(400).json({ error: "Provide a valid video id." })
        }

        const video = await Video.findOne({ _id: videoId })

        if (!video) {
            return res.status(400).json({ error: "Provide a valid video id." })
        }


        var videoRecord = await VideoRecord.findOne({ videoId: videoId, userId: req.user.id })

        if (videoRecord == null) {
            return res.status(401).json({ error: "Not Enrolled." })
        }

        if (!videoRecord.startedOn) {
            return res.status(406).json({ error: "Not Started." })
        }

        let started = videoRecord.startedOn;
        let current = Date.now();
        console.log()

        let difference = Math.abs((started - current) / 1000)

        let totalVideoSeconds = 0;
        totalVideoSeconds += video.duration.hours ? video.duration.hours * 3600 : 0;
        totalVideoSeconds += video.duration.minutes ? video.duration.minutes * 60 : 0;
        totalVideoSeconds += video.duration.seconds ? video.duration.seconds : 0;

        // console.log(difference, totalVideoSeconds * 0.7)
        totalVideoSeconds = 1
        if (difference > (totalVideoSeconds * 0.5)) {
            await VideoRecord.findOneAndUpdate({
                _id: videoRecord._id
            }, { completed: true })
            const nextVideo = await Video.findOne({ unitId: video.unitId, sequence: video.sequence + 1 })
            if (nextVideo) {
                const nextVideoRecord = await VideoRecord.findOneAndUpdate({ videoId: nextVideo._id, userId: req.user.id }, { locked: false }, { new: true })
                return res.json(nextVideoRecord)
            } else {
                // find test
                const nextTest = await TestRecord.findOneAndUpdate({ unitId: video.unitId }, { locked: false }, { new: true })

                return res.json(nextTest)
            }
        } else {
            // console.log('no')
            return res.status(403).json("Not Completed")
        }
        // return res.status(403).json("Not Completed")

    } catch (error) {
        console.log(error)
        return res.status(500).json({ "error": 'Server Error' })
    }
})

module.exports = router