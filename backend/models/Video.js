const mongoose = require('mongoose')

const videoSchema = mongoose.Schema({
    unitId: {
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
    sequence:{
        type:Number
    }
})

module.exports = mongoose.model("Video",videoSchema)
