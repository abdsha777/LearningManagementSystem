const express = require('express') 
const connectToMongo = require("./db");

// connectToMongo();

const app = express();
const port=5000;


// routes
app.use('/auth',require('./routes/auth/login.js'))

app.listen(port,()=>{
    console.log(`express running on http://localhost:${port}`)
})
