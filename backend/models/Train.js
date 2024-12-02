const mongoose = require("mongoose");
const trainSchema = new mongoose.Schema(
  {
    num: {
      type: String,
      required: [true, "من فضلك ادخل رقم التدريب"],
    },
    distance: {
      type: String,
      required: [true, "من فضلك ادخل المسافة"],
    },
    time: {
      type: String,
      required: [true, "من فضلك ادخل  الوقت"],
    },
    type: {
      type: String,
      required: [true, "من فضلك ادخل نوع الخطوة"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("train", trainSchema);
