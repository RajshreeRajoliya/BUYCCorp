const express = require("express");
const { InventoryModel } = require("../model/inventory.model.js");
const { oemSpecsModel } = require("../model/oem_specs.model.js");

const invetoryRouter = express.Router();
const {postInventory} = require("../controller/inventoryController.js");

//Post route used to add new inventory or deal document to the inventory collection

invetoryRouter.post("/addinventory", postInventory);

module.exports = {invetoryRouter}