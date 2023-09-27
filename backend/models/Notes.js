const mongoose = require('mongoose')

const notesSchema = mongoose.Schema({
    unitId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref:'Unit'
    },
    title:{
        type: String,
        required:true,
        unique:true
    },
    url: {
        type: String,
        required:true,
    }
})

module.exports = mongoose.model("Notes",notesSchema)
