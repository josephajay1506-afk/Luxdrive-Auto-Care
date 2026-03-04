const Notification = require("../models/Notification");

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.phone = req.body.phone;
    user.address = req.body.address;
    user.city = req.body.city;
    user.state = req.body.state;
    user.pincode = req.body.pincode;

    await user.save();

    // 🔔 Notification
    await Notification.create({
      user: req.user.id,
      message: "Your profile details were updated successfully",
      read: false
    });

    return res.json({ message: "Profile updated successfully" });

  } catch (error) {
    return res.status(500).json({ message: "Failed to update profile" });
  }
};