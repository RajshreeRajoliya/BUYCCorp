
const postInventory = async (req, res) => {
    try {
      let newInventoryModal = InventoryModel(req.body);
      await newInventoryModal.save();
      res.status(200).send({ msg: "Deal Added Successs" });
    } catch (error) {
      res.send({ error });
    }
  }

  module.exports = { postInventory }