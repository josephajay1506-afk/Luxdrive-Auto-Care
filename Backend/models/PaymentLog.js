const mongoose = require("mongoose");

const paymentLogSchema = new mongoose.Schema(
  {
    invoiceId: { type: mongoose.Schema.Types.ObjectId, ref: "Invoice" },
    razorpay_order_id: String,
    razorpay_payment_id: String,
    razorpay_signature: String,
    amount: Number,

    status: {
      type: String,
      enum: ["success", "failed"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PaymentLog", paymentLogSchema);
