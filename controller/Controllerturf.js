const { default: mongoose } = require("mongoose");
const turf = require("../models/turfModel");

exports.Registerturfs = async(req,res)=>{
    console.log(req.user._id);
    console.log(req.user.user_Auth)
    if (req.user.user_Auth == true) {
        const registerTurf = new turf.turfs({
           turf_Admin_Id:req.user._id,
           turf_dimension:req.body.turf_size,
           location:req.body.location,
           cost:req.body.cost,
           turf_available:req.body.status
        })
        await registerTurf.save()
        .then(()=>{turf.turfs.findByIdAndUpdate({_id:req.user._id},{
            user_Admin:true
        })})
        .catch((error)=>{console.log(error);})

    }
    else{
        res.send("Please register first");
    }
    
}

exports.turfs = async(req,res)=>{
        const turfss = await turf.turfs.find({}).select({turf_Admin_Id:0,_id:0});
        res.send(turfss)
}