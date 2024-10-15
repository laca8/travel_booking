const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const register = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(new ApiError("يجب ادخال جميع البيانات", 500));
  }
  const user = await User.findOne({ username: username });
  if (user) {
    return next(new ApiError("هذا الاسم مستخدم بالفعل", 500));
  }
  const newUser = await User.create({
    username,
    password,
  });
  res.status(200).json({ msg: "success", data: newUser });
});

const login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  if (!user) {
    return next(
      new ApiError(" يوجد خطا في جميع البيانات اعد ادخالها مرة اخري", 500)
    );
  }

  const match = await bcrypt.compareSync(password, user.password);
  if (!match) {
    return next(new ApiError("يوجد خطا في البيانات اعد ادخالها مرة اخري", 500));
  }

  return res.status(200).json({ msg: "success", data: user });
});

module.exports = {
  register,
  login,
};
