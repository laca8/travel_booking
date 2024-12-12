const express = require("express");
const notes = require("../controller/note");
const { protect } = require("../middleware/auth");
const router = express.Router();
router.post("/", protect, notes.addNote);
router.get("/", protect, notes.getNotes);
router.put("/:id", protect, notes.editNotes);
module.exports = router;
