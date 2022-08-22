const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/turf").then(()=>{console.log("connection done")});