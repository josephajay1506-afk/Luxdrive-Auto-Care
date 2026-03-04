const Accessory = require("../models/Accessory");

exports.getAccessories = async (req, res) => {
  try {
    const accessories = await Accessory.find().sort({ createdAt: -1 });
    res.json(accessories);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch accessories" });
  }
};

exports.createAccessory = async (req, res) => {
  try {
    const accessory = await Accessory.create(req.body);
    res.status(201).json(accessory);
  } catch (err) {
    res.status(400).json({ message: "Accessory creation failed" });
  }
};
