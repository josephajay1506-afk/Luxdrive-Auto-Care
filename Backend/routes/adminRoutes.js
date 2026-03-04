const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const { getAllUsers } = require("../controllers/adminController");
const { getAllBookings } = require("../controllers/adminController");
const { getRevenueStats } = require("../controllers/adminController");
const { getRevenueAnalytics } = require("../controllers/adminController");
const { getProfitAnalytics } = require("../controllers/adminController");
const { getDailyRevenue } = require("../controllers/adminController");
const { getServicePopularity } = require("../controllers/adminController");

// ================= ADMIN USERS ========================
router.get("/users", auth, admin, getAllUsers);

router.get("/bookings", auth, admin, getAllBookings);

// ================= ADMIN REVENUE STATS =================
router.get("/revenue", auth, admin, getRevenueStats);

// ================= ADMIN REVENUE ANALYTICS =============
router.get("/revenue-analytics", auth, admin, getRevenueAnalytics);

router.get("/profit-analytics", auth, admin, getProfitAnalytics);

router.get("/daily-revenue", auth, admin, getDailyRevenue);

router.get("/service-popularity", auth, admin, getServicePopularity);

module.exports = router;
