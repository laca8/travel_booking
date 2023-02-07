const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: "email is already exists" });
    }
    user = await new User({
      name,
      email,
      password,
    });
    await user.save();
    const token = await jwt.sign({ _id: user._id }, "laca", {
      expiresIn: "3d",
    });
    const docs = {
      name: user.name,
      email: user.email,
      _id: user._id,
      isAdmin: user.isAdmin,
    };
    return res.json({ user: docs, token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "invalid credintials" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "invalid credintials" });
    }
    const token = await jwt.sign({ _id: user._id }, "laca", {
      expiresIn: "3d",
    });
    const docs = {
      name: user.name,
      email: user.email,
      _id: user._id,
      isAdmin: user.isAdmin,
    };
    return res.json({ user: docs, token });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.json(updateUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json("Delete successful");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getUsers = async (req, res) => {
  const page = parseInt(req.query.page);
  try {
    const users = await User.find({})
      .skip(page * 8)
      .limit(8);

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = {
  register,
  login,
  updateUser,
  deleteUser,
  getUser,
  getUsers,
};
