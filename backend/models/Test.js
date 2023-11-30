const mongoose = require('mongoose')

const testSchema = mongoose.Schema({
    courseId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref:'Course'
    },
    unitId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref:'Unit'
    },
    final:{
        type: Boolean,
        default:false
    }
})

module.exports = mongoose.model("Test",testSchema)
