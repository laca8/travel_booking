const express = require("express");
const {
  getSuggestion,
  addSuggestion,
  getSuggestions,
  updateSuggestion,
} = require("../controllers/suggs");
const router = express.Router();
router.route("/").get(getSuggestions).post(addSuggestion);
router.route("/:id").get(getSuggestion).put(updateSuggestion);
module.exports = router;
