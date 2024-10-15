const mongoose = require("mongoose");
const placeSchema = new mongoose.Schema(
  {
    place: {
      type: String,
      required: true,
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "city",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("place", placeSchema);
