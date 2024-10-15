const express = require("express");
const {
  addShiek,
  getShiek,
  deleteShiek,
} = require("../../controllers/admin/shiek");
const router = express.Router();
router.route("/").post(addShiek).get(getShiek);
router.route("/:id").delete(deleteShiek);
module.exports = router;
