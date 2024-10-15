const express = require("express");
const { getNotes, addNote } = require("../controllers/noteSugg");
const router = express.Router();
router.route("/").post(addNote);
router.route("/:suggId").get(getNotes);
module.exports = router;
