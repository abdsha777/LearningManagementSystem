const express = require('express')
const router = express.Router()

router.post('/login',(req,res)=>{
    const username = req.body.username
    
    res.send('login')
})

module.exports = router