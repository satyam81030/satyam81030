require('dotenv').config();

const nodemailer = require('nodemailer');
const authentication = require("../models/userModel")
const userKey = process.env.USER_KEY;
const adminKey = process.env.ADMIN_KEY;
const jwt = require("jsonwebtoken");
exports.jwtsign = async function () {
    try {
        const token = jwt.sign({ ownerName: this.ownerName, _id:this._id}, userKey);
        return token;
    } catch (error) {
        console.log(error);
    }

}

exports.authenticateJWT = (req, res, next) => {
    // const authHeader = req.params._token;
    // console.log(authHeader);
    const authHeader = req.headers.authorization || req.params._token;
    
    if (authHeader) {
        const token = authHeader.split(' ')[1] || authHeader;
        // console.log(token);
    // if (authHeader) {
    //     const token = authHeader;
        jwt.verify(token, userKey, async(err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
           console.log(user);
           req.user = user
           req.token = token
        //    res.cookie(`auth`,req.user.user_Auth);
           next()
        });
    } else {
        res.sendStatus(401);
    }
};

exports.transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: 'solankisatyam4105@gmail.com',
        pass: 'bfsimcdpcmuhcyqa',
    },
    secure: true, 
});

exports.verify = async(req,res)=>{
    const data =   await authentication.register.findByIdAndUpdate({_id:req.user._id},{
        user_Auth:true
       }).then(()=>{res.send(`Your are verified Successfully and your token is ${req.token}`)}).catch((error)=>{res.status(403).send("Something went wrong")})
      
    };
exports.logged = (req,res)=>{
   if (req.user.user_Auth == true) {
    // res.send(req.cookies);
    res.send(`Your are Successfully logged in and your token is ${req.token}`)
            // use = req.user.user_Auth
        
   }
}

