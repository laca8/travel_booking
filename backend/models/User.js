const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "من فضلك ادخل الاسم"],
      minLength: [3, "من فضلك يجب ادخال 3 احرف  علي الاقل"],
    },
    email: {
      type: String,
      required: [true, "من فضلك ادخل الايميل"],
      unique: [true, "الايميل مستخدم من قبل"],
    },
    password: {
      type: String,
      required: [true, "من فضلك ادخل الرقم السري"],
      minLength: [6, "من فضلك يجب ادخال 6 احرف او ارقام علي الاقل"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  //3lshan lw hat3ml update email or name not password
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
module.exports = mongoose.model("user", userSchema);
