const express = require("express");
const router = express.Router();
const {
  createBooking,
  getBooking,
  getAllBooking,
} = require("../controllers/bookingController");
router.post("/", createBooking);
router.get("/:id", getBooking);
router.get("/", getAllBooking);

module.exports = router;
