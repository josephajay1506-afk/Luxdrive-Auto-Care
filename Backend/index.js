const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load env FIRST
require("dotenv").config();

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
