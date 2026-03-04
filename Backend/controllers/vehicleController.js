const Vehicle = require("../models/Vehicle");
const Notification = require("../models/Notification");

// ➕ ADD VEHICLE
exports.addVehicle = async (req, res) => {
  try {
    const { brand, model, registrationNumber } = req.body;

    if (!brand || !model || !registrationNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const vehicle = await Vehicle.create({
      brand,
      model,
      registrationNumber,
      user: req.user.id
    });

    // 🔔 Notification
    await Notification.create({
      user: req.user.id,
      message: `Vehicle ${vehicle.brand} ${vehicle.model} added successfully`
    });

    return res.status(201).json(vehicle);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// 📄 GET USER VEHICLES
exports.getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ user: req.user.id });
    return res.json(vehicles);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// 🗑️ DELETE VEHICLE
exports.deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    // 🔔 Notification
    await Notification.create({
      user: req.user.id,
      message: `Vehicle ${vehicle.brand} ${vehicle.model} deleted`
    });

    await vehicle.deleteOne();

    return res.json({ message: "Vehicle deleted successfully" });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
