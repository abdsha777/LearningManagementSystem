const mongoose = require('mongoose')

const studentDetailSchema = mongoose.Schema({
    userId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref:'User'
    },
    class: String,
    phoneNumber: String
})

module.exports = mongoose.model("StudentDetail",studentDetailSchema)
