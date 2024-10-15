const express = require("express");
const {
  addPlace,
  getPlace,
  deletePlace,
} = require("../../controllers/admin/place");
const router = express.Router();
router.route("/").post(addPlace).get(getPlace);
router.route("/:id").delete(deletePlace);
module.exports = router;
