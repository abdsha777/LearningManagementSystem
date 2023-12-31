const mongoose = require('mongoose')

const videoRecordSchema = mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },
    videoId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Video",
        required: true
    },
    unitId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Unit",
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    locked: {
        type: Boolean,
        default: true
    },
    startedOn: {
        type: Date
    }
})

module.exports = mongoose.model('VideoRecord', videoRecordSchema);