const express = require("express");
const router = express.Router();
const {
  createTour,
  updateTour,
  deleteTour,
  getTour,
  getTours,
  getTourBySearch,
  getFeaturedTour,
  getTourCount,
} = require("../controllers/tourController");
router.post("/", createTour);
router.put("/:id", updateTour);
router.delete("/:id", deleteTour);
router.get("/:id", getTour);
router.get("/", getTours);
router.get("/search/tours", getTourBySearch);
router.get("/search/featured", getFeaturedTour);
router.get("/search/count", getTourCount);
module.exports = router;
