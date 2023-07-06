const express = require("express");
const { ConnectDB } = require("./config/db.js");
require("dotenv").config();

const cors = require("cors");
const app = express();

//this cors is used to avoid error on frontend that both the server and frontend are not same error

app.use(cors());

//this express.json is used to get the data from the fronted in json  parsed format

app.use(express.json());

//this index.js file is used to start the server and and so we that we can connect to database and get data
app.listen(3000, async () => {
    try {
      console.log('Server is Started at PORT 3000');
  
      await ConnectDB;
  
      console.log("Data Base Is Connected to Server");
    } catch (error) {
      console.log(error);
    }
  });
  