const express = require('express')
var cors = require('cors')
const connectToMongo = require("./db");

connectToMongo();

const app = express();
const port = 5000;

//using middleware
app.use(cors())
app.use(express.json())

// routes
app.use('/auth', require('./routes/auth/signup.js'))
app.use('/auth', require('./routes/auth/login.js'))


app.listen(port, () => {
    console.log(`express running on http://localhost:${port}`)
})
