const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    tourName: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    photo: {
      type: Number,
      required: true,
    },
    guestSize: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    bookAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("booking", bookingSchema);
