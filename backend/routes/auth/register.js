const express = require('express')
const User = require('../../models/User')
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const isAdmin = require('../../middleware/isAdmin');
const isAdminOrTeacher = require('../../middleware/isAdminOrTeacher');
const fetchuser = require('../../middleware/fetchuser');
const StudentDetail = require('../../models/StudentDetail');
const TeacherDetail = require('../../models/TeacherDetail');

const signature = "SIGNATURE";

const router = express.Router()

router.post('/register',fetchuser,isAdmin,[
    body('email').isEmail(),
    body('name').isLength({min:1}),
    body('role').isIn(['teacher','admin'])
],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const {email,name,role} = req.body;
        let user = await User.findOne({email:email})

        if(user){
            return res.status(400).send("user already exists!")
        }
        const password = name.split(" ")[0]+ Math.floor(Math.random()*1000)

        const salt = await bcrypt.genSalt(5);
        const securePassword = await  bcrypt.hash(password ,salt);

        user = await User.create({
            email:email,    
            password:securePassword,
            name:name,
            role:role
        })
        if(role=="teacher"){
            let teacherDetail = await TeacherDetail.create({
                userId: user._id,
                department: req.body.department,
                position: req.body.position
            })
            return res.json({
                id:user.id,
                name:user.name,
                role,
                email,
                password,
                department:teacherDetail.department,
                position:teacherDetail.position
            })
        }
        return res.json({
            id:user.id,
            name:user.name,
            role,
            email,
            password
        })
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Error occured at server")
    }
})

router.post('/registerStudent',fetchuser,isAdminOrTeacher,[
    body('email').isEmail(),
    body('name').isLength({min:1}),
    body('class').isLength({min:1})
],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const {email,name, phoneNumber } = req.body;
        let user = await User.findOne({email:email})
        const password = name.split(" ")[0]+ Math.floor(Math.random()*1000)
        if(user){
            return res.status(400).send("user already exists!")
        }

        const salt = await bcrypt.genSalt(5);
        const securePassword = await  bcrypt.hash(password ,salt);

        user = await User.create({
            email:email,    
            password:securePassword,
            name:name,
            role:"student"
        })
        let studentDetail = await StudentDetail.create({
            userId:user.id,
            class:req.body.class,
            phoneNumber:phoneNumber
        })
        res.json({
            id:user.id,
            name:user.name,
            role:"student",
            class:studentDetail.class,
            phoneNumber:phoneNumber,
            email,
            password
        })
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Error occured at server")
    }
})

module.exports = router