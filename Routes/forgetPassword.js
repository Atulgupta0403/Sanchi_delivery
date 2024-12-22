const express = require("express");
const { forgetPassHandler, resetPassHandler } = require("../Controllers/forgetPassword");
const router = express.Router();


router.post("/password/reset" , forgetPassHandler);


router.post("/password/reset/:resetToken" , resetPassHandler);


module.exports = router