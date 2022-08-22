
const authentication = require("../models/userModel");
const bcrypt = require("bcrypt");
const authCheck = require("../middleware/auths")
require('dotenv').config();
const userKey = process.env.USER_KEY;
const validator = require("validator");
const jwt = require("jsonwebtoken");
exports.logins = async (req, res) => {
    try {
        const password = req.body.password;
        console.log(password);

        await authentication.register.find({ email: req.body.email})

        .then( async(userData) =>{const passwordValid = await bcrypt.compare(password, userData[0].password);
            console.log(passwordValid);
            if (passwordValid) {
                const token = jwt.sign({ username: userData[0].ownerName, user_Auth: userData[0].user_Auth,_id:userData[0]._id }, userKey);
    
                if (token) {
                    const url = `http://localhost:3000/login/${token}`;
                    const transporter = authCheck.transporter;
                   const hello =  await transporter.sendMail({
                        to: req.body.email,
                        subject: 'Verify Account',
                        html: `Click <a href = '${url}'>here</a> to confirm your email.`
                     })
                    console.log(hello)
                }
                else {
                    res.send("something went wrong");
                }
            }
            else {
                res.send("invalid credintion")
            }})
        .catch((err)=>{res.status.send("Invalid credinton")})
        
    }



    catch (error) {
        res.status(400).send(error)
    }
}

const checkPasswordValidity = (value) => {
    const isNonWhiteSpace = /^\S*$/;
    if (!isNonWhiteSpace.test(value)) {
        res.send("Password must not contain Whitespaces.");
    }

    const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    if (!isContainsUppercase.test(value)) {
        res.send("Password must have at least one Uppercase Character.");
    }

    const isContainsLowercase = /^(?=.*[a-z]).*$/;
    if (!isContainsLowercase.test(value)) {
        res.send("Password must have at least one Lowercase Character.");
    }

    const isContainsNumber = /^(?=.*[0-9]).*$/;
    if (!isContainsNumber.test(value)) {
        res.send("Password must contain at least one Digit.");
    }

    const isContainsSymbol =
        /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
    if (!isContainsSymbol.test(value)) {
        res.send("Password must contain at least one Special Symbol.");
    }

    const isValidLength = /^.{10,16}$/;
    if (!isValidLength.test(value)) {
        res.send("Password must be 10-16 Characters Long.");
    }
    return null;
}

exports.signinUser = async (req, res) => {
    try {
        const message = checkPasswordValidity(req.body.password);
        if (!message) {
            const salt = await bcrypt.genSalt(10);
            const userPassword = await bcrypt.hash(req.body.password, salt);
            // console.log(userPassword);
         
            const registerUser = new authentication.register({
                ownerName: req.body.username,
                email: req.body.email,
                password: userPassword
            })
            await registerUser.save()
            
            .then(async(data)=>{ const token = await registerUser.generateAuthToken();
                const url = `http://localhost:3000/dashboard/${token}`;
                const transporter = authCheck.transporter;
                const hello =  await transporter.sendMail({
                    to: req.body.email,
                    subject: 'Verify Account',
                    html: `Click <a href = '${url}'>here</a> to confirm your email.`
                 })
                console.log(hello);})
            .catch(()=>{res.status(404).send("User already exist")});
           
        }
    }
    catch (error) {
        res.status(404).send(error)
    }
}
exports.logout = async (req, res) => {
    try {
        res.clearCookie("token");

        res.send("successfully logout");
    } catch (error) {
        res.status(500).send(error)
    }
};

exports.passwordReset = async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const newPassword = req.body.newpassword;

        const userData = await authentication.register.find({ username: username })
        const passwordValid = await bcrypt.compare(password, user[0].password);

        if (passwordValid) {
            const message = checkPasswordValidity(newPassword);

            console.log(message);
            if (!message) {

                const salt = await bcrypt.genSalt(10);
                const userPassword = await bcrypt.hash(newPassword, salt);
                authentication.register.updateOne({ username: username }, { password: userPassword })
                .then(() => { res.send("Your pasword has been successfully reset") });
            } else {
                res.send("please enter a strong pasword")
            }
        }
        else {
            res.send("currently you don't have account");
        }
    } catch (error) {
        res.send(error)
    }
}

exports.userProfile = async (req, res) => {
    try {
        const username = req.body.username;
        const userData = await authentication.register.findOne({ username: username});
        const profileUser = new authentication.profile({
            user_id: user._id,
            name: req.body.name,
        })
         profileUser.save();
    } catch (error) {
        res.send(error);
    }
}

