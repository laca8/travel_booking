const express = require("express");
const {
  addWorkType,
  getWorkType,
  deleteWorkType,
} = require("../../controllers/admin/workType");
const router = express.Router();
router.route("/").post(addWorkType).get(getWorkType);
router.route("/:id").delete(deleteWorkType);
module.exports = router;
