const express = require("express");
const horseCtrl = require("../controller/horse");
const { protect, allowTo } = require("../middleware/auth");
const router = express.Router();
router.post("/", protect, horseCtrl.upload.single("image"), horseCtrl.addHorse);
router.get("/", protect, horseCtrl.getHorse);
router.get("/all", protect, horseCtrl.getHorses);
router.put(
  "/:id",
  protect,
  horseCtrl.upload.single("image"),
  horseCtrl.editHorse
);
router.delete("/:id", protect, horseCtrl.deleteHorse);
module.exports = router;
