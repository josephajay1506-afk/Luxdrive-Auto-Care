const ContactMessage = require("../models/ContactMessage");

// ================= SUBMIT MESSAGE =================
exports.submitMessage = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const msg = await ContactMessage.create({
      name,
      email,
      phone,
      message,
      user: req.user?.id || null
    });

    res.json({ message: "Message sent successfully", msg });

  } catch (err) {
    console.error("Contact submit error:", err);
    res.status(500).json({ message: "Failed to send message" });
  }
};


// ================= ADMIN VIEW =================
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await ContactMessage
      .find()
      .sort({ createdAt: -1 });

    res.json(messages);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load messages" });
  }
};


// ================= DELETE =================
exports.deleteMessage = async (req, res) => {
  await ContactMessage.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
