const mongoose = require('mongoose')

const MCQSchema = mongoose.Schema({
    testId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref:'Test'
    },
    question:{
        type: String,
        required:true,
        unique:true
    },
    options:{
        type: [String],
        required:true
    },
    answer:{
        type: String,
        required:true
    }
})

module.exports = mongoose.model("MCQ",MCQSchema)
