const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  createBooking,
  getBookings,
  deleteBooking,
  getServiceHistory,
  getAllBookingsAdmin,
  setFinalPrices,
  updateAccessoryPrice,
  updateBookingStatus
} = require("../controllers/bookingController");


// ================= USER =================

router.post("/", auth, createBooking);

router.get("/", auth, getBookings);

router.delete("/:id", auth, deleteBooking);

router.get("/service-history", auth, getServiceHistory);

// ================= ADMIN =================

router.get("/admin", auth, admin, getAllBookingsAdmin);

router.put("/admin/:id/set-prices", auth, admin, setFinalPrices);

router.put("/:id/accessory-price", auth, admin, updateAccessoryPrice);

router.put("/admin/:id/status", auth, admin, updateBookingStatus);

module.exports = router;
