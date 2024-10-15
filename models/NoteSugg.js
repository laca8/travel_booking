const mongoose = require("mongoose");
const noteSchema = new mongoose.Schema(
  {
    suggId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "sugg",
      required: true,
    },
    note: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("noteSugg", noteSchema);
