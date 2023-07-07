const express = require("express");
const { Connection } = require("./config/db.js");
const dotenv = require("dotenv").config();
const {userRouter} = require("./router/userRoute.js");

const cors = require("cors");
const app = express();

//Cors is used to avoid error in frontend and backend 

app.use(cors());

//this express.json is used to get the data from the fronted in json  parsed format

app.use(express.json());

//this index.js file is used to start the server and and so we that we can connect to database and get data

app.use('/user',userRouter)

const PORT = process.env.PORT || 8080;

const username=process.env.DB_USERNAME;
const  password=process.env.DB_PASSWORD;

Connection(username, password)
.then(()=>{
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
})

