const Shiek = require("../../models/admin/Sheik");
const asyncHandler = require("express-async-handler");

const addShiek = asyncHandler(async (req, res) => {
  const { place, city, shiek } = req.body;
  const newEdu = await Shiek.create({ shiek, place, city });
  res.status(200).json({ msg: "success", data: newEdu });
});
const getShiek = asyncHandler(async (req, res, next) => {
  const edus = await Shiek.find({})
    .populate({
      path: "place",
      select: "place-_id",
    })
    .populate({ path: "city", select: "city-_id" });

  res.json({ msg: "success", data: edus });
});

const deleteShiek = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const report = await Shiek.findOneAndDelete({ _id: id });
  res.status(200).json({ msg: "success" });
});
module.exports = {
  addShiek,
  getShiek,
  deleteShiek,
};
