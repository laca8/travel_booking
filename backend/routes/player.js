const express = require("express");
const knightCtrl = require("../controller/player");
const { protect, allowTo } = require("../middleware/auth");
const router = express.Router();
router.route("/").post(knightCtrl.addPlayer);
router.get("/", knightCtrl.getPlayers);
router.delete("/:id", knightCtrl.deletePlayer);
module.exports = router;
