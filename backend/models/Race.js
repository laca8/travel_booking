const mongoose = require("mongoose");
const raceSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: [true, "من فضلك ادخل تاريخ المسابقة"],
    },
    distance: {
      type: Number,
      required: [true, "من فضلك ادخل المسافة"],
    },
    address: {
      type: String,
      required: [true, "من فضلك ادخل مكان المسابقة"],
    },
    min_speed: {
      type: Number,
      required: [true, "من فضلك ادخل الحد الأدنى للسرعة"],
    },
    max_speed: {
      type: Number,
      required: [true, "من فضلك ادخل الحد الأقصى للسرعة"],
    },
    vite_time: {
      type: String,
      required: [true, "من فضلك ادخل vite time"],
    },
    rest_time: {
      type: String,
      required: [true, "من فضلك ادخل rest time"],
    },

    num_rounds: {
      type: Number,
      required: [true, "من فضلك ادخل عدد المراحل"],
    },
    rounds: [{}],
    players: [],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("race", raceSchema);
