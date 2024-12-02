const express = require("express");
const clubCtrl = require("../controller/club");
const { protect } = require("../middleware/auth");
const router = express.Router();
router.post("/", protect, clubCtrl.addClub);
router.get("/", protect, clubCtrl.getClub);
router.put("/", protect, clubCtrl.editClub);
router.delete("/", protect, clubCtrl.deleteClub);
module.exports = router;
