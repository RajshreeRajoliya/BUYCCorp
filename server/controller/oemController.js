const {oemSpecsModel} = require("../model/oem_specs.model.js")
const getSpecs = async (req, res) => {
    const { search } = req.query;
    try {
      if (search) {
      
        let specs = await oemSpecsModel.find({
          $or: [
            { nameOfModel: { $regex: search, $options: "i" } },
            { yearOfModel: { $regex: search, $options: "i" } },
            { colors: { $regex: search, $options: "i" } },
          ],
        });
        res.status(200).send({ specs });
      } else {
        let specs = await oemSpecsModel.find({});
        res.send({ specs });
      }
    } catch (error) {
      res.send({ error });
    }
  }

  const postSpecs = async(req,res)=>{
    const {nameOfModel,yearOfModel,newPriceOfVehicle,colors, mileage,power,maxSpeed,img} = req.body;
    try {
              let newOemModel = oemSpecsModel({nameOfModel,yearOfModel,newPriceOfVehicle,colors, mileage,power,maxSpeed,img});
               await newOemModel.save();
         res.status(200).send("New Model Added")
      }
     catch (error) {
      res.status(400).send({ msg: error.message });
    }
  }


 module.exports = { getSpecs,postSpecs }