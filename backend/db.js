const mongoose = require("mongoose");

async function connectToMongo() {
    await mongoose.connect('mongodb://127.0.0.1:27017/lms');
    console.log("connected")
}

module.exports = connectToMongo