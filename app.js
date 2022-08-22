const express = require("express");
const port = process.env.PORT || 3000;
require("./server")
const cors = require('cors');
const bodyParser = require('body-parser');
const app  = express();
app.use(cors());

app.use(express.json())


var path = require('path');
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.urlencoded({extended: true}));


const registerRoute = require("./routes/registerRoutes");
const registerTurf = require("./routes/turfRoutes")
app.use(registerRoute);
app.use(registerTurf);

app.get("/",(req,res)=>{
    res.send("Lets get Started");
})
// app.use("/file", upload)
app.listen(port,(req,res)=>{
    console.log(`Connection is successful on port ${port}`);
})