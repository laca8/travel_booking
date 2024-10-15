const express = require("express");
const { getNotes, addNote } = require("../controllers/noteReport");
const router = express.Router();
router.route("/").post(addNote);
router.route("/:reportId").get(getNotes);
module.exports = router;
