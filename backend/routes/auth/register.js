const express = require('express')
const User = require('../../models/User')
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const isAdmin = require('../../middleware/isAdmin');
const isAdminOrTeacher = require('../../middleware/isAdminOrTeacher');
const fetchuser = require('../../middleware/fetchuser');

const signature = "SIGNATURE";

const router = express.Router()

router.post('/register',fetchuser,isAdmin,[
    body('email').isEmail(),
    body('password').isLength({min:1}),
    body('name').isLength({min:1}),
    body('role').isIn(['student','teacher','admin'])
],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const {email,name,password,role} = req.body;
        let user = await User.findOne({email:email})

        if(user){
            return res.status(400).send("user already exists!")
        }

        const salt = await bcrypt.genSalt(5);
        const securePassword = await  bcrypt.hash(password ,salt);

        user = await User.create({
            email:email,    
            password:securePassword,
            name:name,
            role:role
        })
        res.json({
            id:user.id,
            name:user.name,
            role
        })
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Error occured at server")
    }
})

router.post('/registerStudent',fetchuser,isAdminOrTeacher,[
    body('email').isEmail(),
    body('password').isLength({min:1}),
    body('name').isLength({min:1}),
    body('role','Only Students can be registered').isIn(['student'])
],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const {email,name,password,role} = req.body;
        let user = await User.findOne({email:email})

        if(user){
            return res.status(400).send("user already exists!")
        }

        const salt = await bcrypt.genSalt(5);
        const securePassword = await  bcrypt.hash(password ,salt);

        user = await User.create({
            email:email,    
            password:securePassword,
            name:name,
            role:role
        })
        res.json({
            id:user.id,
            name:user.name,
            role:role
        })
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Error occured at server")
    }
})

module.exports = router