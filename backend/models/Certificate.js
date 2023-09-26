const mongoose = require('mongoose')

const certificateSchema = mongoose.Schema({
    studentId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref:'User'
    },
    courseId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref:'Course'
    },
    completionDate: {
        type: Date,
        default: Date.now,
        immutable:true
    },
    url:{
        type:String
    }
})

module.exports = mongoose.model("Certificate",certificateSchema)
 