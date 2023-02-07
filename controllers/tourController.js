const Tour = require("../models/Tour");
const createTour = async (req, res) => {
  try {
    const newTour = new Tour(req.body);
    const savedTour = await newTour.save();
    res.json(savedTour);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const updateTour = async (req, res) => {
  const id = req.params.id;
  try {
    const updateTour = await Tour.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.json(updateTour);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.json("Delete successful");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getTours = async (req, res) => {
  const page = parseInt(req.query.page);
  try {
    const tours = await Tour.find({})
      .populate("reviews")
      .skip(page * 8)
      .limit(8);

    res.json(tours);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id).populate("reviews");
    res.json(tour);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getTourBySearch = async (req, res) => {
  try {
    const city = new RegExp(req.query.cit, "i");
    const distance = parseInt(req.query.distance);
    const maxGroupSize = parseInt(req.query.maxGroupSize);

    const tours = await Tour.find({
      city,
      distance: { $gte: distance },
      maxGroupSize: { $gte: maxGroupSize },
    }).populate("reviews");
    res.json(tours);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getFeaturedTour = async (req, res) => {
  try {
    const tours = await Tour.find({
      featured: true,
    }).populate("reviews");
    res.json(tours);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getTourCount = async (req, res) => {
  try {
    const toursCount = await Tour.estimatedDocumentCount();
    res.json(toursCount);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = {
  getTourCount,
  createTour,
  updateTour,
  deleteTour,
  getTour,
  getTours,
  getTourBySearch,
  getFeaturedTour,
};
