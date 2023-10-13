const express = require('express')
var cors = require('cors')
const connectToMongo = require("./db");

connectToMongo();

const app = express();
const port  = process.env.PORT || 5000;
//using middleware
app.use(cors())
app.use(express.json())

// routes
//auth
app.use('/api/auth', require('./routes/auth/register.js'))
app.use('/api/auth', require('./routes/auth/login.js'))
//users with single user
app.use('/api/users', require('./routes/users/users.js'))
// course
app.use('/api/course', require('./routes/course/course.js'))
// enroll
app.use('/api/enroll', require('./routes/enrollment/enrollment.js'))
// overview
app.use('/api/overview/admin', require('./routes/overview/adminOverview.js'))
app.use('/api/overview/teacher', require('./routes/overview/teacherOverview.js'))
app.use('/api/overview/student', require('./routes/overview/StudentOverview.js'))

app.listen(port, () => {
    console.log(`express running on http://localhost:${port}`)
})

app.get('/',(req,res)=>{
    res.json({
        auth:{
            login:"http://localhost:5000/api/auth/login",
            register:"http://localhost:5000/api/auth/register (admin)",
            registerStudent:"http://localhost:5000/api/auth/registerstudent (admin,teacher)",
        },
        users:{
            allUsers:"http://localhost:5000/api/users/ (admin)",
            teachers:"http://localhost:5000/api/users/teachers/ (admin)",
            students:"http://localhost:5000/api/users/students/ (admin,teacher)",
        },
        enrollment:{
            enroll:"http://localhost:5000/api/enroll/"
        },
        course:{
            allCourse:"http://localhost:5000/api/course/",
            CreateCourse:"http://localhost:5000/api/course/create/",
            teacherMyCourse:"http://localhost:5000/api/course/teachermycourse/ (teacher)",
        },
        overview:{
            admin:"http://localhost:5000/api/overview/admin/ (admin)",
            teacher:"http://localhost:5000/api/overview/teacher/ (teacher)",
            student:"http://localhost:5000/api/overview/teacher/",
        }
    })
})
