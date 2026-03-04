const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    customerName: { type: String, required: true },
    membership: { type: String, default: "None" },
    vehicleName: { type: String, required: true },
    serviceDate: { type: String, required: true },

    // ✅ Services
    services: [
      {
        name: String,
        price: Number,
      },
    ],

    // ✅ Accessories
    accessories: [
      {
        name: String,
        price: Number,
      },
    ],

    subTotal: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    discountPercentage: { type: Number, default: 0 },
    finalAmount: { type: Number, default: 0 },

    status: {
      type: String,
      enum: ["Unpaid", "Paid"],
      default: "Unpaid",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invoice", invoiceSchema);
