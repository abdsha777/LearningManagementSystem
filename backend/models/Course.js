const mongoose = require('mongoose')

const courseSchema = mongoose.Schema({
    title:{
        type: String,
        required:true,
        unique:true
    },
    description: {
        type: String,
        required:true,
    },
    // learning_points: String,
    teacherId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref:'User'
    },
    duration:{
        type:Number,
        required:true
    },
    courseImg:{
        type:String
    },
    createdAt:{
        type:Date,
        default: Date.now,
        immutable:true
    },
    active:{
        type:Boolean,
        default:true
    }
})

module.exports = mongoose.model("Course",courseSchema)
