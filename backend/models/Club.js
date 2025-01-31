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
    },
    phone: {
      type: String,
    },
    manager: {
      type: String,
    },
    address: {
      type: String,
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
