const mongoose = require("mongoose");
const eduStatusSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("eduStatus", eduStatusSchema);
