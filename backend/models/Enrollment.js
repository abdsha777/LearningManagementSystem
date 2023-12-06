const mongoose = require('mongoose')

const enrollmentSchema = mongoose.Schema({
    userId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref:'User'
    },
    courseId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref:'Course'
    },
    enrollmentDate: {
        type: Date,
        default: Date.now,
        immutable:true
    },
    dueDate: {
        type: Date,
        default: Date.now,
        // immutable:true
    },
    status:{
        type:String,
        enum:['completed','in progress','incomplete'],
        default:'in progress'
    },
    certificateId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref:'Certificate',
        default:null
    }
})

module.exports = mongoose.model("Enrollment",enrollmentSchema)
