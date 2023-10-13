const express = require('express')
const fetchuser = require('../../middleware/fetchuser');
const Enrollment = require('../../models/Enrollment');

const router = express.Router()

router.get('/', fetchuser, async (req, res) => {
    try {
        const studentId = req.user.id;
        // Calculate the number of ongoing courses
        const ongoingCoursesCount = await Enrollment.countDocuments({
            userId: studentId,
            status: 'in progress',
        });

        // Calculate the number of completed courses
        const completedCoursesCount = await Enrollment.countDocuments({
            userId: studentId,
            status: 'completed',
        });
        const studentOverview = {
            ongoingCoursesCount: ongoingCoursesCount,
            completedCoursesCount: completedCoursesCount,
        };

        res.json(studentOverview);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
})
module.exports = router