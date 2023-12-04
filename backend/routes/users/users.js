const express = require('express')
const fetchuser = require('../../middleware/fetchuser')
const isAdmin = require('../../middleware/isAdmin')
const isAdminOrTeacher = require('../../middleware/isAdminOrTeacher')
const Course = require('../../models/Course')
const Enrollment = require('../../models/Enrollment')
const User = require('../../models/User')
const StudentDetail = require('../../models/StudentDetail')
const { body, validationResult } = require('express-validator');
const TeacherDetail = require('../../models/TeacherDetail')
const { default: mongoose } = require('mongoose')

const router = express.Router()

// router.get('/',fetchuser,isAdmin,async (req,res)=>{
//     try {
//         const allUsers = await User.find();
//         res.json(allUsers);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Server error' });
//     }
// })


//get all teachers
router.get('/teachers',fetchuser,isAdmin,async (req,res)=>{
    try {
        const teachers = await User.find({role:'teacher'});
        const teachersInfo = await Promise.all(teachers.map(async (teacher) => {
            const teacherDetail = await TeacherDetail.findOne({ userId: teacher._id });
            const numOfCourse = await Course.countDocuments({teacherId:teacher._id})
            return {
                id: teacher._id,
                email: teacher.email,
                name: teacher.name,
                active: teacher.active,
                department: teacherDetail ? teacherDetail.department : null,
                position: teacherDetail ? teacherDetail.position : null,
                numOfCourse
            };
        }));
        return res.json(teachersInfo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
})

// get one teacher
router.get('/teacher/:id',fetchuser,isAdmin,async (req,res)=>{
    try {
        const id = req.params.id;
        if(!mongoose.isObjectIdOrHexString(id)){
            return res.status(400).json({error:"Invalid Id"})
        }
        const teacher = await User.findOne({_id:id});
        const teacherDetail = await TeacherDetail.findOne({userId:id})

        return res.json({
            email: teacher.email,
            name: teacher.name,
            active: teacher.active,
            department: teacherDetail ? teacherDetail.department : null,
            position: teacherDetail ? teacherDetail.position : null,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
})
// update the teacher
router.put('/teacher/:id',fetchuser,isAdmin,[
    body('email').isEmail(),
    body('name').isLength({min:1}),
    body('department').exists(),
    body('position').exists(),
],async (req,res)=>{
    try {
        const id = req.params.id;
        if(!mongoose.isObjectIdOrHexString(id)){
            return res.status(400).json({error:"Invalid Id"})
        }
        const teacher = await User.findOneAndUpdate({_id:id},req.body,{new:true});
        const teacherDetail = await TeacherDetail.findOneAndUpdate({userId:id},req.body,{new:true})

        return res.json({
            email: teacher.email,
            name: teacher.name,
            active: teacher.active,
            department: teacherDetail ? teacherDetail.department : null,
            position: teacherDetail ? teacherDetail.position : null,
        });
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

router.get('/student/:id',fetchuser,isAdminOrTeacher,async(req,res)=>{
    try {
        const id = req.params.id;
        const student = await User.findOne({_id:id})
        const studentDetail = await StudentDetail.findOne({userId: id})
        const studentInfo = {
            id: student.id,
            name: student.name,
            email: student.email,
            class: studentDetail?.class,
            phoneNumber: studentDetail?.phoneNumber,
            active:student.active
        }
        return res.json(studentInfo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
})

router.put('/student/:id',fetchuser,isAdminOrTeacher,[
    body('email').isEmail(),
    body('name').isLength({min:1}),
    body('class').isLength({min:1}),
    body('phoneNumber').isLength({min:10}),
    body('active').isBoolean()
],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const id = req.params.id;
        var updatedStudent;
        try {
            updatedStudent = await User.findByIdAndUpdate({_id:id},req.body,{new:true})
        } catch (error) {
            return res.status(400).json({ error: 'Email already in use' });
        }
        
        if(!updatedStudent){
            return res.status(404).json({error:"Student not found"})
        }
        const updatedStudentDetails = await StudentDetail.findOneAndUpdate({userId:id},req.body,{new:true})

        return res.json({
            email: updatedStudent.email,
            name: updatedStudent.name,
            active: updatedStudent.active,
            class: updatedStudentDetails.class,
            phoneNumber: updatedStudentDetails.phoneNumber,
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
})


module.exports = router