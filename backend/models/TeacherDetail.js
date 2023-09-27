const mongoose = require('mongoose')

const teacherDetailSchema = mongoose.Schema({
    userId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref:'User'
    },
    department: String,
    position: String
})

module.exports = mongoose.model("TeacherDetail",teacherDetailSchema)
