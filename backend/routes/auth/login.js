const express = require('express')
const User = require('../../models/User')
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const signature = "SIGNATURE";

const router = express.Router()

router.post('/login',[
    body('email').isEmail(),
    body('password').isLength({min:1})
],async (req,res)=>{
    // return res.json(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(),a:req.body.email });
    }
    try {
        const {email,password} = req.body;
        let user = await User.findOne({email})

        if(!user){
            return res.status(400).send("user does not exists!")
        }

        const passCompare = await bcrypt.compare(password,user.password)
        
        if(!passCompare){
            return res.status(400).send("Invalid Credentials")
        }

        const data = {
            user:{
                id:user.id,
                name:user.name,
                role:user.role
            }
        }
        const authToken = jwt.sign(data,signature);
        res.json(authToken)
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Error occured at server")
    }
})

module.exports = router