const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "يجب عليك ادخال اسم المستخم"],
      minlength: [3, "يجب ادخال  اسم  يحتوي علي 3 احراف علي الاقل"],
    },
    password: {
      type: String,
      required: [true, "يجب عليك ادخال كلمة السر"],
      minlength: [6, "يجب ادخال كلمة سر تحتوي علي 6 احراف او ارقام علي الاقل"],
    },
    isAdmin: {
      type: String,
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
