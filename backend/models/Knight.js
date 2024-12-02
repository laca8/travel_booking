const mongoose = require("mongoose");
const knightSchema = new mongoose.Schema(
  {
    userId: {
      required: "true",
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    name: {
      type: String,
      required: [true, "من فضلك ادخل الاسم"],
      minLength: [3, "من فضلك يجب ادخال 3 احرف علي الاقل"],
    },
    sex: {
      type: String,
      required: [true, "من فضلك ادخل النوع"],
    },
    phone: {
      type: String,
      required: [true, "من فضلك ادخل رقم التليفون"],
    },
    stable: {
      type: String,
      required: [true, "من فضلك ادخل الاسطبل"],
    },
    age: {
      type: String,
      required: [true, "من فضلك ادخل تاريخ الميلاد"],
    },
    address: {
      type: String,
      required: [true, "من فضلك ادخل  العنوان"],
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("knight", knightSchema);
