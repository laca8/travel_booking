const express = require("express");
const raceCntrl = require("../controller/race");
const { protect, allowTo } = require("../middleware/auth");
const router = express.Router();
router.post("/", protect, allowTo, raceCntrl.addRace);
router.get("/:id", protect, allowTo, raceCntrl.getRace);
router.get("/", protect, allowTo, raceCntrl.getRaces);
router.put("/:id", protect, allowTo, raceCntrl.editRace);
router.delete("/:id", protect, allowTo, raceCntrl.deleteRace);
module.exports = router;
