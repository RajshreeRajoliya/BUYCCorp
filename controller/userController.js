const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const { UserModel } = require("../model/users.model.js");


//SIGNUP
const signupUser = async (req, res) => {
    const { email, password, name } = req.body;
    try {
      let user = await UserModel.find({ email });
      if (user.length > 0) {
  
        //If user already exists in database
  
        res.status(200).send({ msg: "User Already Exists" });
      } else {
  
        //User registered for first time, hashing password and storing the password
       
        bcrypt.hash(password, 5, async (error, hash) => {
          if (error) {
            res.status(200).send({ msg: error });
          } else {
            let newUser = UserModel({ name, email, password: hash });
            await newUser.save();
            let findUser = await UserModel.find({ email });
  
            //Finding user giving token in the payload, sending on each successful signup
            jwt.sign({ id: findUser[0]._id }, "payload", async (err, token) => {
              if (err) {
                res.status(200).send({ msg: error });
              } else {
                res.send({ msg: "User Registered Succesfully", token });
              }
            });
          }
        });
      }
    } catch (error) {
      res.status(400).send({ msg: error.message });
    }
  }

  //LOGIN
  const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    let user = await UserModel.find({ email });
    try {
       //User logged in, if signedup already
  
      if (user.length < 1) {
        res.status(200).send({ msg: "User Does Not Exists" });
      } else {
        bcrypt.compare(password, user[0].password, async (error, result) => {
          if (error) {
            res.status(200).send({ msg: error });
          } else if (result === true) {
  
            //Giving token in the payload, on each successfull login
  
            jwt.sign({ id: user[0]._id }, "payload", async (err, token) => {
              if (err) {
                res.status(200).send({ msg: error });
              } else {
                res.status(200).send({ msg: "User Logined Succesfully", token });
              }
            });
          } else {
            res.status(200).send({ msg: "Password Is Wrong" });
          }
        });
      }
    } catch (error) {
      res.status(400).send({ msg: error.message });
    }
  }

  //Get User
const getUserbyID = async (req, res) => {
  const { id } = req.params;
  try {
    let user = await UserModel.findById(id);
    res.status(200).send({ user });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
}


//Update User
const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    let user = await UserModel.findByIdAndUpdate(id,req.body);
    res.status(200).send({ user });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
}


  module.exports = {signupUser , loginUser , getUserbyID , updateUser}