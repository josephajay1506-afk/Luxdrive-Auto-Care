const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  month: String,
  services: Number
});

module.exports = mongoose.model("Report", reportSchema);
