const {InventoryModel} = require("../model/inventory.model.js")

const postInventory = async (req, res) => {
    try {
      let newInventoryModal = InventoryModel(req.body);
      await newInventoryModal.save();
    return  res.status(200).send({ msg: "Deal Added Successs" });
    } catch (error) {
      res.send({ error });
    }
  }



  const getInventory = async (req, res) => {
    // const search="Honda"
    const { order, filter, search } = req.query;
    try {
      if (filter === "price") {
        let deals;
        //if order is desc then we are sorting the data and sending on fronted on the basis of price in descending order
  
        if (order == "desc") {
          deals = await InventoryModel.find({})
            .populate("oemId")
            .sort({ price: -1 });
          console.log(deals);
        } else {
          //else if  then we are sorting the data and sending on fronted on the basis of price in ascending price
          deals = await InventoryModel.find({})
            .populate("oemId")
            .sort({ price: 1 });
        }
  
        res.status(200).send({ deals });
      } else if (filter == "mileage") {
        let deals = await InventoryModel.find({}).populate("oemId").lean();
  
        if (order == "desc") {
          //if data order is descegin and filter is mileage than we are populated the oem model so that
          //we can get the desired mileage data from the realation oemId and sort on the basis of the data
          //this will lean the data in plain js object and after sorting we can send to frontend
  
          deals.sort((a, b) => b.oemId.mileage - a.oemId.mileage);
        } else {
          deals.sort((a, b) => a.oemId.mileage - b.oemId.mileage);
        }
  
        res.status(200).send({ deals });
      } else if (filter === "colors") {
        //this is used for colors filter as we have populated oemId and mathing the colors with regex query
        //having opitons i which enable case sensitive searching
  
        let deals = await InventoryModel.find({}).populate({
          path: "oemId",
          match: { colors: { $regex: order, $options: "i" } },
        });
        //math will return the documnets which are  not found allso but wich null so we are filtering and sending on frontend
        deals = deals.filter((deal) => deal.oemId !== null);
  
        res.status(200).send({ deals });
      } else {
        let deals = await InventoryModel.find({}).populate({
          path: "oemId",
        });
  
        res.status(200).send({ deals });
      }
    } catch (error) {
      res.status(500).send({ msg: error.message });
    }
  }


  const getinventoryById = async (req, res) => {
    const { id } = req.params;
  
    try {
      let deals = await InventoryModel.findById(id);
      res.status(200).send({ deals });
    } catch (error) {
      res.status(500).send({ msg: error.message });
    }
  }
  
  

  module.exports = { postInventory , getInventory ,getinventoryById}