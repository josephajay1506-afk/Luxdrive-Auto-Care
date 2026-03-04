const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    /* ================= USER ================= */
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    customerName: {
      type: String,
      required: true,
    },

    membership: {
      type: String,
      default: "None",
    },

    /* ================= VEHICLE ================= */
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },

    vehicleName: {
      type: String,
      required: true,
    },

    customerNote: {
      type: String,
      default: "",
    },

    /* ================= SERVICES ================= */
    services: [
      {
        serviceId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Service",
        },
        name: String,
        minPrice: Number,
        maxPrice: Number,
        installationTime: String, // optional if you calculate in frontend
        finalPrice: {
          type: Number,
          default: null,
        },
      },
    ],

    /* ================= ACCESSORIES ================= */
    accessories: [
      {
        accessoryId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Accessory",
        },
        name: String,
        minPrice: Number,
        maxPrice: Number,
        installationTime: {
          type: String,
          required: false,
        },
        finalPrice: {
          type: Number,
          default: null,
        },
      },
    ],

    /* ================= SCHEDULING ================= */
    serviceDate: {
      type: String,
      required: true,
    },

    /* ================= PRICING ================= */
    subTotal: {
      type: Number,
      default: 0,
    },

    tax: {
      type: Number,
      default: 0,
    },

    discount: {
      type: Number,
      default: 0,
    },

    totalAmount: {
      type: Number,
      default: 0,
    },

    /* ================= STATUS ================= */
   status: {
  type: String,
  enum: [
    "Pending",
    "Diagnosis",
    "Service In Progress",
    "Invoice Generated",
    "Completed",
    "Cancelled"
  ],
  default: "Pending",
},
 statusHistory: [
      {
        status: {
          type: String,
          required: true,
        },
        updatedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
