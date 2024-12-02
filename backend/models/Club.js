const mongoose = require("mongoose");
const clubSchema = new mongoose.Schema(
  {
    userId: {
      required: "true",
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    name: {
      type: String,
      required: [true, "من فضلك ادخال الاسم"],
    },
    club_owner: {
      type: String,
      required: [true, "من فضلك ادخل اسم مالك النادي"],
    },
    phone: {
      type: String,
      required: [true, "من فضلك ادخل رقم التليفون"],
    },
    manager: {
      type: String,
      required: [true, "من فضلك ادخل اسم المدير"],
    },
    address: {
      type: String,
      required: [true, " من فضلك ادخل عنوان النادي "],
    },
    website: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("club", clubSchema);
