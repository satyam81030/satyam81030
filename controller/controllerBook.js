const turf = require("../models/turfModel");

const stripe = require('stripe')('sk_test_51LYU8MSJ2MDKsDyQOhGgK4UZ7ATrF8cvaDwmH37qEeTgnLweqvI8A5xlP3p0QAzIobsxUItsJdl1FJRI8DMkSwLs00DFG00E3x');
exports.bookTurf = async(req,res)=>{
    if (req.user.user_Auth == true) {
        const available  = await turf.turfs.find({turf_available:"Available",location:req.body.location,_id:req.params._id}).then(async(datas)=>{
             await stripe.tokens.create({
                card: {
                    number: '4242424242424242',
                    exp_month: 2,
                    exp_year: 2023,
                    cvc: '314',
                }
            })
            .then(async(data)=>{await stripe.paymentIntents.create({
                amount: datas[0].cost,
                currency: 'usd',
                source: data[data.id],
                description: 'My First turf Charge'
            });}).then(async()=>{await turf.turfs.findByIdAndUpdate({_id:req.params._id},{
                turf_available:"Not-Available",
                turf_subscribed_By
            })})
            .catch((error)=>{console.log(error);})
        }) 
    
    }
}