const mongoose = require("mongoose");
const Booking = require("../models/Booking");
const Notification = require("../models/Notification");
const User = require("../models/User");
const Invoice = require("../models/Invoice");
const Service = require("../models/Service");
const Accessory = require("../models/Accessory");
const calculateDiscount = require("../utils/discountEngine");

// ================= CREATE BOOKING =================
exports.createBooking = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const {
      customerName,
      vehicleId,
      vehicleName,
      serviceDate,
      customerNote,
      serviceIds = [],
      accessoryIds = [],
    } = req.body;

    if (!vehicleId || !vehicleName || !serviceDate) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    if (serviceIds.length === 0 && accessoryIds.length === 0) {
      return res.status(400).json({
        message: "Please select at least one service or accessory",
      });
    }

    // ================= FETCH SERVICES =================
    const dbServices = await Service.find({
      _id: { $in: serviceIds },
    });

    const selectedServices = dbServices.map((s) => ({
      serviceId: s._id,
      name: s.name,
      minPrice: s.minPrice,
      maxPrice: s.maxPrice,
      finalPrice: null,
    }));

    // ================= FETCH ACCESSORIES =================
    const dbAccessories = await Accessory.find({
      _id: { $in: accessoryIds },
    });

    const selectedAccessories = dbAccessories.map((a) => ({
      accessoryId: a._id,
      name: a.name,
      minPrice: a.minPrice,
      maxPrice: a.maxPrice,
      installationTime: a.installationTime,
      finalPrice: null,
    }));

    // ================= CALCULATIONS =================
    const servicesTotal = dbServices.reduce(
      (sum, s) => sum + s.minPrice,
      0
    );

    const accessoriesTotal = dbAccessories.reduce(
      (sum, a) => sum + a.minPrice,
      0
    );

    const subTotal = servicesTotal + accessoriesTotal;

    const tax = subTotal * 0.02; // 2% tax
    const totalAmount = subTotal + tax;

    // ================= CREATE BOOKING =================
    const booking = await Booking.create({
      user: req.user.id,
      customerName,
      membership: user?.membership || "None",
      vehicle: vehicleId,
      vehicleName,
      services: selectedServices,
      accessories: selectedAccessories,
      serviceDate,
      customerNote,
      subTotal,
      tax,
      totalAmount,
      status: "Pending",
      statusHistory: [
        {
          status: "Pending",
          updatedAt: new Date(),
        },
      ],
    });

    // ================= NOTIFICATION =================
    await Notification.create({
      user: req.user.id,
      message: `Booking created for ${booking.vehicleName}`,
    });

    res.status(201).json(booking);

  } catch (err) {
    console.error("Create booking error:", err);
    res.status(500).json({
      message: "Booking failed",
    });
  }
};


// ================= USER BOOKINGS =================
exports.getBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user.id })
    .populate("vehicle")
    .sort({ createdAt: -1 });

  res.json(bookings);
};

// ================= DELETE BOOKINGS =================
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    await booking.deleteOne();

    await Notification.create({
      user: booking.user,
      message: `Your booking for ${booking.vehicleName} is deleted.`
    });

    res.json({ message: "Booking deleted successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Delete failed" });
  }
};


// ================= ADMIN BOOKINGS =================
exports.getAllBookingsAdmin = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email phone membership address")
      .populate("vehicle")
      .populate("services.serviceId")       // ✅ correct populate
      .populate("accessories.accessoryId")  // ✅ if you added accessories same way
      .sort({ createdAt: -1 });

    res.json(bookings);

  } catch (err) {
    console.error("Admin bookings error:", err);
    res.status(500).json({ message: "Failed to load bookings" });
  }
};

// SET FINAL PRICES (Bulk Save From Admin Panel)

exports.setFinalPrices = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const { services = [], accessories = [] } = req.body;

    // Update services
    services.forEach((s, i) => {
      if (booking.services[i]) {
        booking.services[i].finalPrice = Number(s.finalPrice || 0);
      }
    });

    // Update accessories
    accessories.forEach((a, i) => {
      if (booking.accessories && booking.accessories[i]) {
        booking.accessories[i].finalPrice = Number(a.finalPrice || 0);
      }
    });

    // 🔥 Calculate totals ONLY here (one time)
    const serviceTotal = booking.services.reduce(
      (sum, s) => sum + Number(s.finalPrice || 0),
      0
    );

    const accessoryTotal = booking.accessories?.reduce(
      (sum, a) => sum + Number(a.finalPrice || 0),
      0
    ) || 0;

    booking.subTotal = serviceTotal + accessoryTotal;
    booking.tax = booking.subTotal * 0.02;
    booking.totalAmount = booking.subTotal + booking.tax;

    booking.status = "Diagnosis";

    await booking.save();

    await Notification.create({
      user: booking.user,
      message: `Final pricing updated for ${booking.vehicleName} and moved to Diagnosis stage.`
    });

    res.json(booking);

  } catch (err) {
    console.error("Set final prices error:", err);
    res.status(500).json({ message: "Failed to update prices" });
  }
};

// UPDATE SINGLE SERVICE PRICE
exports.updateServicePrice = async (req, res) => {
  try {
    const { id } = req.params;
    const { index, finalPrice } = req.body;

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (!booking.services[index]) {
      return res.status(400).json({ message: "Invalid service index" });
    }

    booking.services[index].finalPrice = Number(finalPrice);

    await booking.save();

    await Notification.create({
      user: booking.user,
      message: `Service price updated for ${booking.vehicleName}`
    });

    res.json({ message: "Service price updated" });

  } catch (err) {
    console.error("Service price update error:", err);
    res.status(500).json({ message: "Failed to update service price" });
  }
};

// UPDATE SINGLE ACCESSORY PRICE
exports.updateAccessoryPrice = async (req, res) => {
  try {
    const { id } = req.params;
    const { index, finalPrice } = req.body;

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (!booking.accessories || !booking.accessories[index]) {
      return res.status(400).json({ message: "Invalid accessory index" });
    }

    booking.accessories[index].finalPrice = Number(finalPrice);

    await booking.save();

    await Notification.create({
      user: booking.user,
      message: `Accessory price updated for ${booking.vehicleName}`
    });

    res.json({ message: "Accessory price updated" });

  } catch (err) {
    console.error("Accessory price update error:", err);
    res.status(500).json({ message: "Failed to update accessory price" });
  }
};

// ================= UPDATE BOOKING STATUS =================
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const statusFlow = [
      "Pending",
      "Diagnosis",
      "Service In Progress",
      "Invoice Generated",
      "Completed",
      "Cancelled"
    ];

    const currentIndex = statusFlow.indexOf(booking.status);
    const newIndex = statusFlow.indexOf(status);

    if (newIndex === -1) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    // 🚫 Prevent backward movement
    if (newIndex < currentIndex) {
      return res.status(400).json({
        message: "Cannot move booking status backward."
      });
    }

    // 🚫 Prevent skipping steps
    if (newIndex > currentIndex + 1) {
      return res.status(400).json({
        message: `You must move to "${statusFlow[currentIndex + 1]}" first.`
      });
    }

    // 🚫 Prevent manual completion
    if (status === "Completed") {
      return res.status(400).json({
        message: "Booking is completed automatically after payment."
      });
    }

    // 🚫 Prevent modifying completed booking
    if (booking.status === "Completed") {
      return res.status(400).json({
        message: "Completed bookings cannot be modified."
      });
    }

    // ================= INVOICE GENERATION =================
    if (status === "Invoice Generated") {
      const existingInvoice = await Invoice.findOne({
        booking: booking._id,
      });
      if (!existingInvoice) {
        const user = await User.findById(booking.user);
        const discountData = calculateDiscount(booking, user);
        const finalAmount =
        booking.subTotal -
        discountData.amount +
        booking.tax;
        
        await Invoice.create({
          user: booking.user,
          booking: booking._id,
          customerName: booking.customerName,
          vehicleName: booking.vehicleName,
          serviceDate: booking.serviceDate,
          
          services: booking.services.map((s) => ({
            name: s.name,
            price: s.finalPrice || s.minPrice,
          })),
          
          accessories:
          booking.accessories?.map((a) => ({
            name: a.name,
            price: a.finalPrice || a.minPrice,
          })) || [],
          
          subTotal: booking.subTotal,
          tax: booking.tax,
          discount: discountData.amount,
          discountPercentage: discountData.percentage,
          finalAmount: booking.subTotal - discountData.amount + booking.tax,
          status: "Unpaid",
        });
      }
    }

    booking.status = status;
    booking.statusHistory.push({
      status: status,
      updatedAt: new Date(),
    });
    await booking.save();

    await Notification.create({
      user: booking.user,
      message: `Booking status updated to "${status}" for ${booking.vehicleName}`
    });

    res.json(booking);

  } catch (err) {
    console.error("Status update error:", err);
    res.status(500).json({ message: "Status update failed" });
  }
};

// ================= GET ALL SERVICE HISTORY =================
exports.getServiceHistory = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    // Get completed bookings of user
    const bookings = await Booking.find({
      user: userId,
      status: "Completed",
    }).sort({ createdAt: -1 });

    if (!bookings.length) {
      return res.json([]);
    }

    const bookingIds = bookings.map((b) => b._id);

    const invoices = await Invoice.find({
      booking: { $in: bookingIds },
      status: "Paid",
    });

    // Group by vehicleName (safe version)
    const vehicleMap = {};

    bookings.forEach((booking) => {
      const invoice = invoices.find(
        (i) => i.booking.toString() === booking._id.toString()
      );

      const vehicleKey = booking.vehicleName;

      if (!vehicleMap[vehicleKey]) {
        vehicleMap[vehicleKey] = {
          vehicle: {
            _id: vehicleKey,
            brand: booking.vehicleName,
            model: "",
          },
          totalSpent: 0,
          history: [],
        };
      }

      const amount = invoice ? invoice.finalAmount : 0;

      vehicleMap[vehicleKey].history.push({
        _id: booking._id,
        serviceDate: booking.serviceDate,
        services: booking.services || [],
        accessories: booking.accessories || [],
        invoiceAmount: amount,
      });

      vehicleMap[vehicleKey].totalSpent += amount;
    });

    res.json(Object.values(vehicleMap));
  } catch (err) {
    console.error("Service history error:", err);
    res.status(500).json({
      message: "Failed to fetch service history",
    });
  }
};
