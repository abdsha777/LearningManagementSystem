const mongoose = require("mongoose");
const User = require("./models/User");

async function connectToMongo() {
    await mongoose.connect('mongodb://127.0.0.1:27017/lms');
    console.log("connected")
}



async function fun(){
    try {
        await connectToMongo();
        // const user = await User.create({
        //     email:"aaa@a.com",
        //     password:"abc",
        //     name:"abdulla",
        //     role:"student"
        // })
        // console.log(user)

        
    } catch (e) {
        console.log(e.message);
    }
}

fun();