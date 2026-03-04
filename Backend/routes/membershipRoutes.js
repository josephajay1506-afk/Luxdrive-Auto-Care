const express = require("express");
const router = express.Router();

const {
  createMembershipOrder,
  purchaseMembership,
  getMyMembership
} = require("../controllers/membershipController");

const authMiddleware = require("../middleware/authMiddleware");


// ================= CREATE MEMBERSHIP ORDER =================

router.post("/create-order", authMiddleware, createMembershipOrder);


// ================= PURCHASE MEMBERSHIP =================

router.post("/purchase", authMiddleware, purchaseMembership);


// ================= GET USER MEMBERSHIP =================

router.get("/my-membership", authMiddleware, getMyMembership);


module.exports = router;