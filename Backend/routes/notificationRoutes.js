const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");
const authMiddleware = require("../middleware/authMiddleware");

// 🔔 Get all notifications for logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.user.id
    }).sort({ createdAt: -1 });

    return res.json(notifications);
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch notifications" });
  }
});


// 🔔 Get unread count
router.get("/unread-count", authMiddleware, async (req, res) => {
  try {
    const count = await Notification.countDocuments({
      user: req.user.id,
      read: false
    });

    return res.json({ count });
  } catch (err) {
    return res.status(500).json({ message: "Failed to get unread count" });
  }
});

// 🔔 Get latest notification
router.get("/latest", authMiddleware, async (req, res) => {
  const notification = await Notification.findOne({ user: req.user.id })
    .sort({ createdAt: -1 });
  res.json(notification);
});

// 🔔 Get latest unread notification
router.get("/unread-latest", authMiddleware, async (req, res) => {
  const notification = await Notification.findOne({
    user: req.user.id,
    read: false
  }).sort({ createdAt: -1 });

  res.json(notification);
});


// 🔔 Mark all as read
router.put("/mark-read", authMiddleware, async (req, res) => {
  try {
    await Notification.updateMany(
      { user: req.user.id, read: false },
      { read: true }
    );

    return res.json({ message: "All notifications marked as read" });
  } catch (err) {
    return res.status(500).json({ message: "Failed to mark notifications" });
  }
});

// 🔔 Clear all notifications
router.delete("/clear", authMiddleware, async (req, res) => {
  await Notification.deleteMany({ user: req.user.id });
  res.json({ message: "Notifications cleared" });
});

module.exports = router;