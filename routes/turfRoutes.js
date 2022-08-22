const express = require("express");
const router = new express.Router();
const authCheck = require("../middleware/auths");
const turfs = require("../controller/Controllerturf")
const bookturf  = require("../controller/controllerBook")

router.post("/registerTurf",authCheck.authenticateJWT,turfs.Registerturfs,(req,res)=>{
    res.send("succesful")
});
router.get("/turf",turfs.turfs);
router.post("/bookTurf/:_id",authCheck.authenticateJWT,bookturf.bookTurf)

module.exports =router;