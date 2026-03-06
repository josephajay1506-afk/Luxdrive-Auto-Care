const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load env FIRST
dotenv.config();

// Debug check
console.log("Razorpay Key:", process.env.RAZORPAY_KEY_ID);

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// runs membership expiry automation
require("./cron/membershipExpiryJob");

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/vehicles", require("./routes/vehicleRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/services", require("./routes/serviceRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));
app.use("/api/invoices", require("./routes/invoiceRoutes"));
app.use("/api/payments", require("./routes/paymentRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/membership", require("./routes/membershipRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/tuning", require("./routes/tuningRoutes"));
app.use("/api/accessories", require("./routes/accessoryRoutes"));

// ================= ROOT ROUTE =================
app.get("/", (req, res) => {
  res.send("🚀 LuxDrive Auto Care API is running successfully");
});

// ================= 404 HANDLER =================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found"
  });
});

// ================= ERROR HANDLER =================
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);

  res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
});

// ================= SERVER =================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
