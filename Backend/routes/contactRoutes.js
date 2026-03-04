const router = require("express").Router();

const {
  submitMessage,
  getAllMessages,
  deleteMessage
} = require("../controllers/contactController");

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

// public submit
router.post("/", submitMessage);

// admin panel
router.get("/admin", auth, admin, getAllMessages);
router.delete("/:id", auth, admin, deleteMessage);

module.exports = router;
