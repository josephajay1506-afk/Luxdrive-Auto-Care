const Invoice = require("../models/Invoice");

exports.getUserInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({ user: req.user.id })
      .populate("booking")
      .sort({ createdAt: -1 });

    res.json(invoices);


  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch invoices" });
  }
};

exports.getAllInvoices = async (req, res) => {
  const invoices = await Invoice.find()
    .populate("user", "name membership")
    .populate("booking");

  res.json(invoices);
};
