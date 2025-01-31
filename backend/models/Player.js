const mongoose = require("mongoose");
const playerSchema = new mongoose.Schema(
  {
    knight: {
      type: String,
      required: [true, "من فضلك ادخل اسم الفارس"],
    },
    horse: {
      type: String,
      required: [true, "من فضلك ادخل اسم الخيل"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("player", playerSchema);
