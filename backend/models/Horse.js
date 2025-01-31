const mongoose = require("mongoose");
const horseSchema = new mongoose.Schema(
  {
    userId: {
      required: "true",
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    name: {
      type: String,
      required: [true, "من فضلك ادخل الاسم"],
    },
    sex: {
      type: String,
    },
    color: {
      type: String,
    },
    stable: {
      type: String,
    },

    type: {
      type: String,
    },
    age: {
      type: String,
    },
    ship_num: {
      type: String,
    },
    horse_owner: {
      type: String,
    },
    image: {
      type: String,
    },
    champions: {
      type: String,
    },
    buying: {
      type: Boolean,
      default: false,
    },
    pulse: {
      type: String,
    },
    eye: {
      type: String,
    },
    blood: {
      type: String,
    },
    heat: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("horse", horseSchema);
