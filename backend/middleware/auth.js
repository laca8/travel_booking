const jwt = require("jsonwebtoken");
const User = require("../models/User");
const protect = async (req, res, next) => {
  let token;
  //check if token exist
  try {
    if (req.headers.authorization && req.headers.authorization) {
      token = req.headers.authorization;
    }
    if (!token) {
      return res.status(500).json({ message: "من فضلك قم بتسجيل الدخول" });
    }
    //verify token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    //check if user exists
    const currentUser = await User.findById(decoded.userId);
    if (!currentUser) {
      return res.status(500).json({ message: "لا يوجد مستخدم بهذي البيانات" });
    }
    req.user = currentUser;
    //console.log(req.user);
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};
const allowTo = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return res
      .status(500)
      .json({ message: "user is not allow to access this route" });
  }
  next();
};
module.exports = {
  protect,
  allowTo,
};
