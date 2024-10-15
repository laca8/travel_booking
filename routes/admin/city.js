const express = require("express");
const {
  addCity,
  getCity,
  deleteCity,
  updateCity,
  getCityId,
} = require("../../controllers/admin/city");
const router = express.Router();
router.route("/").post(addCity).get(getCity);
router.route("/:id").delete(deleteCity).put(updateCity).get(getCityId);
module.exports = router;
