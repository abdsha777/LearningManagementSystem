const mongoose = require("mongoose");

const videoSchema = mongoose.Schema({
    unitId: {
        required: true,
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Unit",
    },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    url: {
        type: String,
        required: true,
    },
    sequence: {
        type: Number,
    },
    youtubeId: {
        type: String,
    },
    duration: {
        hours: {
            type: Number,
            default: 0
        },
        minutes: {
            type: Number,
            default: 0
        }
    },
});

module.exports = mongoose.model("Video", videoSchema);
