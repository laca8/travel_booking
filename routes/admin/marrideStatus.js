const express = require("express");
const {
  addMarridStatus,
  getMarridStatus,
  deleteMarridStatus,
} = require("../../controllers/admin/marrideStatus");
const router = express.Router();
router.route("/").post(addMarridStatus).get(getMarridStatus);
router.route("/:id").delete(deleteMarridStatus);
module.exports = router;
