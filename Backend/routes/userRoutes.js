const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

// UPDATE PROFILE
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "phone address city state pincode name email"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user); // 🔑 THIS IS THE FIX
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
});


// FETCH PROFILE
router.put("/profile", authMiddleware, async (req, res) => {
  const { phone, address, city, state, pincode, name } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) {  
      return res.status(404).json({ message: "User not found" });
    }
    user.phone = phone || user.phone;
    user.address = address || user.address;
    user.city = city || user.city;
    user.state = state || user.state;
    user.pincode = pincode || user.pincode;
    user.name = name || user.name;
    await user.save();
    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update profile" });
  }
});

module.exports = router;