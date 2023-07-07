const express = require("express");


// const { Logcheck } = require("../middleware/Logcheck.js");
const { signupUser , loginUser } = require("../controller/userController.js")

const userRouter = express.Router();

//Registering new user by logging the date of registeration

userRouter.post("/register",signupUser);

userRouter.post("/login",loginUser);

module.exports = { userRouter };