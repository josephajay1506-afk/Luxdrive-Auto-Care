const Vehicle = require("../models/Vehicle");

exports.addVehicle = async (req, res) => {
  const vehicle = await Vehicle.create({
    user: req.user._id,
    ...req.body
  });
  res.json(vehicle);
};

exports.getVehicles = async (req, res) => {
  const vehicles = await Vehicle.find({ user: req.user._id });
  res.json(vehicles);
};

exports.deleteVehicle = async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id);
  if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

  if (vehicle.user.toString() !== req.user._id.toString())
    return res.status(401).json({ message: "Not authorized" });

  await vehicle.deleteOne();
  res.json({ message: "Vehicle removed successfully" });
};
