const express = require("express");
const { oemSpecsModel } = require("../model/oem_specs.model.js");
const { getSpecs,postSpecs } = require("../controller/oemController.js");
const oemSpecsRouter = express.Router();

//Route is used to search the specifications of oem model

oemSpecsRouter.get("/getspecs", getSpecs);
oemSpecsRouter.post("/postspecs" , postSpecs)
  
  module.exports = { oemSpecsRouter };
  