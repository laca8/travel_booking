const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const createToken = (payload) => {
  return jwt.sign({ userId: payload }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.EXPIRE_TIME,
  });
};
const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "يجب ادخال جميع الحقول" });
    }

    if (name.length < 3) {
      return res
        .status(400)
        .json({ message: " من فضلك يجب ادخال 3 احرف  علي الاقل في حقل الاسم" });
    }
    if (password.length < 6) {
      return res.status(400).json({
        message: " من فضلك يجب ادخال 6 احرف  علي الاقل في حقل الرقم السري",
      });
    }
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: "الايميل مستخدم من قبل" });
    }
    const newUser = await User.create({
      name,
      email,
      password,
    });

    const userCreated = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    };

    const token = createToken(newUser._id);
    return res.status(201).json({ data: userCreated, token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "يجب ادخال جميع الحقول" });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "يوجد خطأ في الايميل او الرقم السري" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res
        .status(400)
        .json({ message: "يوجد خطأ في الايميل او الرقم السري" });
    }
    const userCreated = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    };

    const token = createToken(user._id);
    res.status(201).json({ data: userCreated, token });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
};

module.exports = { register, login };
