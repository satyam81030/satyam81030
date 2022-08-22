const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
 
    turf_Admin_Id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        
    },
    
    turf_dimension: {
        type: Number,
        required: true,
        // unique: true

    },
    location: {
        type: String,
        required: true,
        // unique: true,
    },
    cost: {
        type: Number,
        required: true
    },
    turf_available:{
        type: String,
        required:true,
        enum:["Available","Not-Available"],
        default:"Available"
    },
    turf_subscribed_By:{
        type:String
    }
   
});

exports.turfs = new mongoose.model("turfs", userSchema);