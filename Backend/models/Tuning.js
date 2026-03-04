const mongoose = require("mongoose");

const tuningSchema = new mongoose.Schema(
  {
    stage: {
      type: String,
      required: true,
      enum: ["Stage 1", "Stage 2", "Stage 3"],
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    powerGain: {
      type: String, // e.g. "+30-50 HP"
      required: true,
    },
    torqueGain: {
      type: String, // e.g. "+60-90 Nm"
      required: true,
    },
    priceMin: {
      type: Number,
      required: true,
    },
    priceMax: {
      type: Number,
      required: true,
    },
    estimatedTime: {
      type: String, // e.g. "4-6 Hours"
    },
    difficulty: {
      type: String,
      enum: ["Moderate", "Advanced", "Expert"],
    },
    recommendedUpgrades: [
      {
        type: String,
      },
    ],
    dynoIncluded: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tuning", tuningSchema);
