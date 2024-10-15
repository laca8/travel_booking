const express = require("express");
const {
  addEduStatus,
  getEdu,
  deleteEdu,
} = require("../../controllers/admin/eduStatus");
const router = express.Router();
router.route("/").post(addEduStatus).get(getEdu);
router.route("/:id").delete(deleteEdu);
module.exports = router;
