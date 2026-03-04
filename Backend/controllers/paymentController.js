const Razorpay = require("razorpay");
const crypto = require("crypto");
const Invoice = require("../models/Invoice");
const Booking = require("../models/Booking");
const Notification = require("../models/Notification");
const PaymentLog = require("../models/PaymentLog");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// ================= CREATE ORDER =================
exports.createOrder = async (req, res) => {
  try {
    const { invoiceId } = req.body;

    if (!invoiceId) {
      return res.status(400).json({ message: "Invoice ID is required" });
    }

    const invoice = await Invoice.findById(invoiceId);

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    if (invoice.status === "Paid") {
      return res.status(400).json({ message: "Invoice already paid" });
    }

    const amount = Number(invoice.finalAmount);

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid invoice amount" });
    }

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // convert to paise
      currency: "INR",
      receipt: `invoice_${invoice._id}`,
    });

    res.json({ order });

  } catch (err) {
    console.error("Create Order Error:", err);
    res.status(500).json({ message: "Order creation failed" });
  }
};

// ================= VERIFY PAYMENT =================
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      invoiceId,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    const invoice = await Invoice.findById(invoiceId);
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    // ❌ Signature invalid
    if (expectedSignature !== razorpay_signature) {
      await PaymentLog.create({
        invoiceId,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        amount: invoice.finalAmount,
        status: "failed",
      });

      return res.status(400).json({ message: "Invalid signature" });
    }

    // ✅ SUCCESS
    invoice.status = "Paid";
    invoice.paymentId = razorpay_payment_id;
    invoice.paidAt = new Date(); // Store payment time
    await invoice.save();

    // ✅ AUTO COMPLETE BOOKING
    const booking = await Booking.findById(invoice.booking);
    if (booking && booking.status === "Invoice Generated") {

      booking.status = "Completed";

      booking.statusHistory = booking.statusHistory || [];
      booking.statusHistory.push({
        status: "Completed",
        timestamp: new Date(),
      });
      
      await booking.save();

      await Notification.create({
        user: booking.user,
        message: `Payment received. Your booking for ${booking.vehicleName} is now Completed ✅`
      });
    }

    await PaymentLog.create({
      invoiceId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount: invoice.finalAmount,
      status: "success",
    });

    res.json({ message: "Payment verified successfully" });

  } catch (err) {
    console.error("Verify Payment Error:", err);
    res.status(500).json({ message: "Payment verification failed" });
  }
};
