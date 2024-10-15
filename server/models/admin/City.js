const mongoose = require("mongoose");
const citySchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    shiek: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("city", citySchema);
