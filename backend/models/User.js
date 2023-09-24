const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email : {
        type : String,
        required :true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['admin','student','teacher'],
        required:true,
    },
    active:{
        type:Boolean,
        default:true
    },
    createdAt:{
        type:Date,
        default: Date.now,
        immutable:true
    },
    updatedAt:{
        type:Date,
        default: Date.now
    },
    lastLogin:{
        type:Date,
        default: Date.now
    },
    profilePicture:{
        type:String
    }
})

module.exports = mongoose.model("User",userSchema)