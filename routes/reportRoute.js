const express = require("express");
const {
  getReports,
  addReport,
  getReport,
  updateReport,
} = require("../controllers/report");
const router = express.Router();
router.route("/").get(getReports).post(addReport);
router.route("/:id").get(getReport).put(updateReport);
module.exports = router;
