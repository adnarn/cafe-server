const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI)
.then( ()  => console.log("connected to database successfully"))
.catch((err) => console.log("connection error"));

module.exports = mongoose;