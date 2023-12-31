const mongoose = require('mongoose')

const testRecordSchema = mongoose.Schema({
    courseId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Course',
        // required: true
    },
    unitId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Unit',
        // required: true
    },
    testId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Test',
        required: true
    },
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    locked: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model("TestRecord", testRecordSchema)
