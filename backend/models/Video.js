const mongoose = require('mongoose')

const videoSchema = mongoose.Schema({
    unitId: {
        required:true,
        type: mongoose.SchemaTypes.ObjectId,
        ref:'Unit'
    },
    title:{
        type: String,
        required:true,
        unique:true
    },
    description: {
        type: String
    },
    url:{
        type: String,
        required:true,
    },
    sequence:{
        type:Number
    }
})

module.exports = mongoose.model("Video",videoSchema)
