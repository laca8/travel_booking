const express = require("express");
const {
  addDisable,
  getDisable,
  deleteDisable,
} = require("../../controllers/admin/disable");
const router = express.Router();
router.route("/").post(addDisable).get(getDisable);
router.route("/:id").delete(deleteDisable);
module.exports = router;
