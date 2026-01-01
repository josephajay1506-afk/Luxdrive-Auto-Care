const Booking = require("../models/Booking");

exports.createBooking = async (req, res) => {
  const booking = await Booking.create({
    user: req.user._id,
    ...req.body
  });
  res.json(booking);
};

exports.getBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate("vehicle");
  res.json(bookings);
};
