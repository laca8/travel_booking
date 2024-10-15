const express = require("express");
const {
  addOutWork,
  getOutWork,
  deleteOutWork,
} = require("../../controllers/admin/outWork");
const router = express.Router();
router.route("/").post(addOutWork).get(getOutWork);
router.route("/:id").delete(deleteOutWork);
module.exports = router;
