const mongoose = require('mongoose')

const studentTestSchema = mongoose.Schema({
    courseId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref:'Course'
    },
    studentId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref:'User'
    },
    testId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref:'Test'
    },
    createdAt:{
        type: Date,
        default:Date.now
    },
    score:{
        type: Number,
        required:true
    }
})

module.exports = mongoose.model("StudentTest",studentTestSchema)
