const Service = require("../models/Service");

// ================= GET ALL SERVICES =================
// Used by AddBooking page service catalog
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ name: 1 });
    res.json(services);
  } catch (err) {
    console.error("Get services error:", err);
    res.status(500).json({ message: "Failed to load services" });
  }
};

// ================= CREATE SERVICE (ADMIN) =================
exports.createService = async (req, res) => {
  try {
    const { name, minPrice, maxPrice, category } = req.body;

    if (!name || minPrice == null || maxPrice == null) {
      return res.status(400).json({
        message: "Name, minPrice and maxPrice are required",
      });
    }

    const service = await Service.create({
      name,
      minPrice,
      maxPrice,
      category: category || "General",
    });

    res.status(201).json(service);

  } catch (err) {
    console.error("Create service error:", err);

    if (err.code === 11000) {
      return res.status(400).json({
        message: "Service with this name already exists",
      });
    }

    res.status(500).json({ message: "Failed to create service" });
  }
};
