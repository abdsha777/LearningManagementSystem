const mongoose = require('mongoose')

const testSchema = mongoose.Schema({
    unitId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref:'Unit'
    },
    title:{
        type: String,
        required:true,
        unique:true
    },
    final:{
        type: Boolean,
        default:false
    }
})

module.exports = mongoose.model("Test",testSchema)
