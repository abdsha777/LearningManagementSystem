const mongoose = require('mongoose')

const unitSchema = mongoose.Schema({
    courseId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref:'Course'
    },
    title:{
        type: String,
        required:true,
    },
    description: {
        type: String,
        required:true,
    },
    sequence:{
        type:Number
    },
    duration:{
        type:Number
    },
    active:{
        type:Boolean,
        default:true
    }
})

module.exports = mongoose.model("Unit",unitSchema)
