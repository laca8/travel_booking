const express = require("express");
const router = express.Router();
const {
  login,
  register,
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} = require("../controllers/userController");
router.post("/login", login);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", getUser);
router.get("/", getUsers);
router.post("/register", register);

module.exports = router;
