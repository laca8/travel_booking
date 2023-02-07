const Booking = require("../models/Booking");
const Tour = require("../models/Tour");
const createBooking = async (req, res) => {
  try {
    const newBooking = new Booking({ ...req.body });
    const savedBooking = await newBooking.save();

    res.json(savedBooking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getAllBooking = async (req, res) => {
  try {
    const books = await Booking.find({})
      .populate("reviews")
      .skip(page * 8)
      .limit(8);

    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = {
  createBooking,
  getAllBooking,
  getBooking,
};
