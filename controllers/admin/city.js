const City = require("../../models/admin/City");
const asyncHandler = require("express-async-handler");

const addCity = asyncHandler(async (req, res) => {
  const { city, place, shiek } = req.body;
  const newEdu = await City.create({ city, place, shiek });
  res.status(200).json({ msg: "success", data: newEdu });
});
const getCity = asyncHandler(async (req, res, next) => {
  const edus = await City.find({});

  res.json({ msg: "success", data: edus });
});
const updateCity = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { city, place, shiek } = req.body;
  const report = await City.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  res.status(200).json({ msg: "success", data: report });
});

const deleteCity = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const report = await City.findOneAndDelete({ _id: id });
  res.status(200).json({ msg: "success" });
});
const getCityId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const report = await City.findById({ _id: id });
  res.status(200).json({ msg: "success", data: report });
});
module.exports = {
  addCity,
  getCity,
  deleteCity,
  updateCity,
  getCityId,
};
