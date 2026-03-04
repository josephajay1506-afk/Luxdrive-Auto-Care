const express = require("express");
const router = express.Router();
const {
  getAllStages,
  createStage,
  bookTuningStage,
} = require("../controllers/tuningController");

// GET all stages
router.get("/", getAllStages);

// Admin create
router.post("/", createStage);

// Book stage
router.post("/book", bookTuningStage);

module.exports = router;
