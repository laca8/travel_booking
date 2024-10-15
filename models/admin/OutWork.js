const mongoose = require("mongoose");
const workOutSchema = new mongoose.Schema(
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
module.exports = mongoose.model("workOut", workOutSchema);
