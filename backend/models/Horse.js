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
      required: [true, "من فضلك ادخل النوع"],
    },
    color: {
      type: String,
      required: [true, "من فضلك ادخل لون الخيل"],
    },
    stable: {
      type: String,
      required: [true, "من فضلك ادخل الاسطبل"],
    },

    type: {
      type: String,
      required: [true, "من فضلك ادخل نوع الخيل"],
    },
    age: {
      type: String,
      required: [true, "من فضلك ادخل عمر الاسطبل"],
    },
    ship_num: {
      type: String,
      required: [true, "من فضلك ادخل  ship number"],
    },
    horse_owner: {
      type: String,
      required: [true, "من فضلك ادخل اسم مالك النادي"],
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
      required: [true, "من فضلك استكمل باقي بيانات  حالة الخيل"],
    },
    eye: {
      type: String,
      required: [true, "من فضلك استكمل باقي بيانات  حالة الخيل"],
    },
    blood: {
      type: String,
      required: [true, "من فضلك استكمل باقي بيانات  حالة الخيل"],
    },
    heat: {
      type: String,
      required: [true, "من فضلك استكمل باقي بيانات  حالة الخيل"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("horse", horseSchema);
