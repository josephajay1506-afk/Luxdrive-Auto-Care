const mongoose = require("mongoose");

const accessorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    minPrice: { type: Number, required: true },
    maxPrice: { type: Number, required: true },
    installationTime: { type: String, required: false }, // e.g. "2-4 hours"
    skillLevel: {
      type: String,
      enum: ["Certified", "Senior", "Master"],
      default: "Certified"
    },
    difficulty: {
      type: String,
      enum: ["Basic", "Standard", "Advanced", "Expert"],
      default: "Standard"
    },
    recommendedFor: {
      type: [String], // e.g. ["Stage 1", "Stage 2"]
      default: []
    },
    isPopular: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Accessory", accessorySchema);
