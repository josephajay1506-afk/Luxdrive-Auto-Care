const Tuning = require("../models/Tuning");

// ================= GET ALL STAGES =================
exports.getAllStages = async (req, res) => {
  try {
    const stages = await Tuning.find().sort({ stage: 1 });
    res.json(stages);
  } catch (err) {
    console.error("Tuning Fetch Error:", err);
    res.status(500).json({ message: "Failed to load tuning stages" });
  }
};

// ================= CREATE STAGE (Admin Use) =================
exports.createStage = async (req, res) => {
  try {
    const stage = await Tuning.create(req.body);
    res.status(201).json(stage);
  } catch (err) {
    console.error("Tuning Create Error:", err);
    res.status(400).json({ message: "Failed to create stage" });
  }
};

// ================= BOOK TUNING =================
exports.bookTuningStage = async (req, res) => {
  try {
    const { stageId, customerName, vehicle, contact } = req.body;

    if (!stageId || !customerName || !vehicle) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const stage = await Tuning.findById(stageId);
    if (!stage) {
      return res.status(404).json({ message: "Stage not found" });
    }

    // Here you can integrate booking logic or create booking record

    res.json({
      message: "Performance consultation request submitted successfully",
      stage: stage.stage,
    });
  } catch (err) {
    console.error("Tuning Booking Error:", err);
    res.status(500).json({ message: "Booking failed" });
  }
};
