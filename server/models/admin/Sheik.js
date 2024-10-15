const mongoose = require("mongoose");
const shiekSchema = new mongoose.Schema(
  {
    shiek: {
      type: [String],
      required: true,
    },
    place: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "place",
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
module.exports = mongoose.model("shiek", shiekSchema);
