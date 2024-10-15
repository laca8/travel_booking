const express = require("express");
const {
  addLevelWork,
  getLeveLWork,
  deleteLevelWork,
} = require("../../controllers/admin/eduLevel");
const router = express.Router();
router.route("/").post(addLevelWork).get(getLeveLWork);
router.route("/:id").delete(deleteLevelWork);
module.exports = router;
