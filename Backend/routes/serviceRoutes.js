const express = require("express");
const router = express.Router();
const {
  getAllServices,
  createService
} = require("../controllers/serviceController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Public (for booking page)
router.get("/", authMiddleware, getAllServices);

// Admin create services
router.post("/", authMiddleware, adminMiddleware, createService);

module.exports = router;
