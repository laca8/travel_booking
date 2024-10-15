const Place = require("../../models/admin/Place");
const asyncHandler = require("express-async-handler");

const addPlace = asyncHandler(async (req, res) => {
  const { place, city } = req.body;
  const newEdu = await Place.create({ place, city });
  res.status(200).json({ msg: "success", data: newEdu });
});
const getPlace = asyncHandler(async (req, res, next) => {
  const edus = await Place.find({}).populate({
    path: "city",
    select: "city-_id",
  });

  res.json({ msg: "success", data: edus });
});

const deletePlace = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const report = await Place.findOneAndDelete({ _id: id });
  res.status(200).json({ msg: "success" });
});
module.exports = {
  addPlace,
  getPlace,
  deletePlace,
};
