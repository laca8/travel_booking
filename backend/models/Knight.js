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
    },
    phone: {
      type: String,
    },
    stable: {
      type: String,
    },
    age: {
      type: String,
    },
    address: {
      type: String,
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
