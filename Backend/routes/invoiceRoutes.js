const express = require("express");
const router = express.Router();
const { getUserInvoices, getAllInvoices } = require("../controllers/invoiceController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getUserInvoices);
router.get("/admin", authMiddleware, getAllInvoices);

module.exports = router;
