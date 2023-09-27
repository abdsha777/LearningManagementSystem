const mongoose = require('mongoose')

const studentDetailSchema = mongoose.Schema({
    userId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref:'User'
    },
    class: String,
    PhoneNumber: Number
})

module.exports = mongoose.model("StudentDetail",studentDetailSchema)
