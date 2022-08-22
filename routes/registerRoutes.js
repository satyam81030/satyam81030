const registerController = require("../controller/controllerUser");
const express = require("express");
const authCheck = require("../middleware/auths")
const router = new express.Router();


router.post("/login",registerController.logins,authCheck.authenticateJWT,authCheck.logged);
router.get("/auth-login-basic",(req,res)=>{
    res.render("auth-login-basic");
})
// router.get("/:_token",)
router.post("/dashboard",registerController.signinUser);
router.get("/dashboard/:_token",authCheck.authenticateJWT,authCheck.verify);
router.get("/login/:_token",authCheck.authenticateJWT,authCheck.logged)
router.post("/logout",authCheck.authenticateJWT,registerController.logout);

router.post("/reset",registerController.passwordReset);

router.post("/profile",registerController.userProfile);

module.exports =router;