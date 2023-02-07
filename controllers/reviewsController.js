const Review = require("../models/Review");
const Tour = require("../models/Tour");
const createReview = async (req, res) => {
  const tourId = req.params.tourId;
  try {
    const newReview = new Review({ ...req.body });
    const savedReview = await newReview.save();
    await Tour.findByIdAndUpdate(tourId, {
      $push: { reviews: savedReview._id },
    });
    res.json(savedReview);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createReview,
};
