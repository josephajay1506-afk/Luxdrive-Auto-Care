const User = require("../models/User");
const Razorpay = require("razorpay");
const Invoice = require("../models/Invoice");
const Booking = require("../models/Booking");

// ================= GET ALL USERS (NO ADMINS) =================
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" })
      .select("-password")
      .sort({ createdAt: -1 });

    const fixed = users.map(u => {
      const obj = u.toObject();

      return {
        ...obj,

        // ✅ joined fallback if timestamps missing
        createdAt: obj.createdAt || u._id.getTimestamp(),

        // ✅ membership date fallbacks
        membershipStart: obj.membershipStart || null,
        membershipExpiry: obj.membershipExpiry || null,

        // ✅ ensure fields always exist for frontend
        phone: obj.phone || "",
        address: obj.address || "",
        city: obj.city || "",
        state: obj.state || "",
        pincode: obj.pincode || "",
        membership: obj.membership || "None"
      };
    });

    res.json(fixed);

  } catch (err) {
    console.error("Admin get users error:", err);
    res.status(500).json({ message: "Failed to load users" });
  }
};

exports.getAllBookings = async (req, res) => {
  try {

    const bookings = await Booking.find()
      .populate("vehicle")
      .sort({ serviceDate: 1 });

    res.json(bookings);

  } catch (err) {
    console.error("Booking fetch error:", err);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

// ================= GET REVENUE STATS =================
exports.getRevenueStats = async (req, res) => {
  try {

    // ===== TOTAL REVENUE (only paid invoices)
    const totalRevenueAgg = await Invoice.aggregate([
      { $match: { status: "Paid" } },
      {
        $group: {
          _id: null,
          total: { $sum: "$finalAmount" }
        }
      }
    ]);

    const totalRevenue = totalRevenueAgg[0]?.total || 0;


    // ===== PAID COUNT
    const paidCount = await Invoice.countDocuments({
      status: "Paid"
    });


    // ===== UNPAID COUNT
    const unpaidCount = await Invoice.countDocuments({
      status: "Unpaid"
    });


    // ===== AVERAGE INVOICE VALUE
    const averageInvoiceValue =
      paidCount > 0 ? Math.round(totalRevenue / paidCount) : 0;


    // ===== MONTHLY REVENUE (group by month)
    const monthlyRevenueRaw = await Invoice.aggregate([
      {
        $match: { status: "Paid" }
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          revenue: { $sum: "$finalAmount" }
        }
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1
        }
      }
    ]);


    // ===== FORMAT MONTHLY DATA FOR CHART
    const monthlyRevenue = monthlyRevenueRaw.map((m) => ({
      month: `${m._id.year}-${m._id.month}`,
      revenue: m.revenue
    }));


    // ===== PROFIT CALCULATION
    const estimatedCost = totalRevenue * 0.7;
    const estimatedProfit = totalRevenue - estimatedCost;

    const profitMargin =
      totalRevenue > 0
        ? ((estimatedProfit / totalRevenue) * 100).toFixed(2)
        : 0;


    // ===== FINAL RESPONSE
    res.json({
      totalRevenue,
      estimatedCost,
      estimatedProfit,
      profitMargin,
      averageInvoiceValue,
      paidCount,
      unpaidCount,
      monthlyRevenue
    });

  } catch (err) {

    console.error("Revenue Error:", err);

    res.status(500).json({
      message: "Revenue calculation failed"
    });

  }
};

exports.getRevenueAnalytics = async (req, res) => {
  try {

    const invoices = await Invoice.find({
      status: "Paid"
    }).sort({ createdAt: 1 });

    const revenueData = invoices.map((invoice, index) => ({
      booking: `Invoice ${index + 1}`,
      amount: invoice.finalAmount   // ✅ REAL paid amount
    }));

    res.json(revenueData);

  } catch (err) {
    console.error("Revenue analytics error:", err);
    res.status(500).json({ message: "Analytics failed" });
  }
};

exports.getProfitAnalytics = async (req, res) => {
  try {

    const invoices = await Invoice.find({ status: "Paid" });

    const data = invoices.map((invoice, index) => ({
      booking: `Invoice ${index + 1}`,
      profit: Math.round(invoice.finalAmount * 0.30)
    }));

    res.json(data);

  } catch (err) {
    res.status(500).json({ message: "Profit analytics error" });
  }
};

exports.getDailyRevenue = async (req, res) => {
  try {

    const invoices = await Invoice.find({ status: "Paid" });

    const revenueMap = {};

    invoices.forEach((i) => {

      const date = new Date(i.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short" });

      if (!revenueMap[date]) {
        revenueMap[date] = 0;
      }

      revenueMap[date] += i.finalAmount;

    });

    const result = Object.keys(revenueMap).map(date => ({
      date,
      revenue: revenueMap[date]
    }));

    res.json(result);

  } catch (err) {
    res.status(500).json({ message: "Daily revenue error" });
  }
};

exports.getServicePopularity = async (req, res) => {
  try {

    const bookings = await Booking.find({ status: "Completed" });

    const serviceCount = {};

    bookings.forEach((b) => {
      b.services.forEach((s) => {
        if (!serviceCount[s.name]) {
          serviceCount[s.name] = 0;
        }

        serviceCount[s.name]++;
      });
    });

    const result = Object.keys(serviceCount).map((service) => ({
      service,
      count: serviceCount[service]
    }));

    res.json(result);

  } catch (err) {
    res.status(500).json({ message: "Service popularity error" });
  }
};