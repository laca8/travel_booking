const express = require("express");
const knightCtrl = require("../controller/knight");
const { upload } = require("../controller/knight");
const { protect } = require("../middleware/auth");
const router = express.Router();
router
  .route("/")
  .post(protect, knightCtrl.upload.single("image"), knightCtrl.addKnight);
router.get("/", protect, knightCtrl.getKnight);
router.put("/", protect, upload.single("image"), knightCtrl.editKnight);
router.delete("/", protect, knightCtrl.deleteKnight);
module.exports = router;
