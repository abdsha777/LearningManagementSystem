const mongoose = require('mongoose')

const unitRecordSchema = mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },
    unitId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Unit",
        required: true
    },
    courseId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Course",
        required: true
    },
    completed: {
        type: Boolean,
        default: false,
    },
    locked: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model("UnitRecord", unitRecordSchema);