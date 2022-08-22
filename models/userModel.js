const mongoose = require("mongoose");
const validator = require("validator");
const jwtsigns = require("../middleware/auths")
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
    ownerName: {
        type: String,
        required: true,
        // unique: true

    },
    email: {
        type: String,
        required: true,
        // unique: true,
        validate: [validator.isEmail, "invalid Email"]
    },
    password: {
        type: String,
        required: true
    },
    user_Owner:{
        type: Boolean,
        required: true,
        default:false
    },
    user_Admin:{
        type: Boolean,
        required: true,
        default:false
    },
    user_Auth:{
        type: Boolean,
        required: true,
        default:false
    }
});

userSchema.methods.generateAuthToken = jwtsigns.jwtsign

exports.register = new mongoose.model("register", userSchema);