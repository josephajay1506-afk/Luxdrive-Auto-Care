const Razorpay = require("razorpay");
const User = require("../models/User");
const Notification = require("../models/Notification");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});


// ================= CREATE ORDER =================

exports.createMembershipOrder = async (req, res) => {
  try {

    const amount = Number(req.body.amount);

    if (!amount || amount <= 0) {
      return res.status(400).json({
        message: "Valid amount required"
      });
    }

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "membership_" + Date.now(),
    });

    res.json(order);

  } catch (err) {

    console.error("Razorpay order error:", err);

    res.status(500).json({
      message: "Order creation failed"
    });

  }
};

// ================= PURCHASE / ACTIVATE MEMBERSHIP =================

exports.purchaseMembership = async (req, res) => {
  try {

    const { membership } = req.body;

    if (!membership) {
      return res.status(400).json({
        message: "Membership plan required"
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const now = new Date();
    let expiry = new Date(now);

    // ✅ FIXED EXPIRY LOGIC (handles emojis + variations)

    if (membership.toLowerCase().includes("select")) {
      expiry.setMonth(expiry.getMonth() + 3);
    } 
    else if (membership.toLowerCase().includes("prestige")) {
      expiry.setMonth(expiry.getMonth() + 6);
    } 
    else if (membership.toLowerCase().includes("imperial")) {
      expiry.setFullYear(expiry.getFullYear() + 1);
    } 
    else {
      expiry.setMonth(expiry.getMonth() + 3);
    }

    // ================= UPDATE USER =================

    user.membership = {
      plan: membership,
      startDate: now,
      expiryDate: expiry,
      isActive: true
    };

    await user.save();

    // ================= CREATE NOTIFICATION =================

    await Notification.create({
      user: user._id,
      message: `Your ${membership} has been activated 👑`,
      type: "membership",
      read: false
    });

    // ================= RESPONSE =================

    res.status(200).json({
      message: "Membership activated successfully",
      membership: user.membership
    });

  } catch (err) {

    console.error("Membership activation error:", err);

    res.status(500).json({
      message: "Membership activation failed"
    });

  }
};

// ================= GET USER MEMBERSHIP =================

exports.getMyMembership = async (req, res) => {
  try {

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json({
      membership: user.membership
    });

  } catch (err) {

    console.error("Fetch membership error:", err);

    res.status(500).json({
      message: "Failed to fetch membership"
    });

  }
};