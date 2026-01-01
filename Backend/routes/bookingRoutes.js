const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  createBooking,
  getBookings
} = require("../controllers/bookingController");

const router = express.Router();

router.post("/", protect, createBooking);
router.get("/", protect, getBookings);

module.exports = router;
