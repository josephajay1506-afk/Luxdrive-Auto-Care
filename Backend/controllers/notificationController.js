const Notification = require("../models/Notification");

exports.getNotifications = async (req, res) => {
  const notifications = await Notification.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json(notifications);
};

exports.getUnreadCount = async (req, res) => {
  const count = await Notification.countDocuments({ user: req.user.id, read: false });
  res.json({ count });
};

exports.markAsRead = async (req, res) => {
  await Notification.updateMany({ user: req.user.id }, { read: true });
  res.json({ message: "All marked as read" });
};
