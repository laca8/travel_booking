const MarridStatus = require("../../models/admin/MarridStatus");
const asyncHandler = require("express-async-handler");

const addMarridStatus = asyncHandler(async (req, res) => {
  const { title } = req.body;
  const newEdu = await MarridStatus.create({title});
  res.status(200).json({ msg: "success", data: newEdu });
});
const getMarridStatus = asyncHandler(async (req, res, next) => {
  const edus = await MarridStatus.find({});

  res.json({ msg: "success", data: edus });
});

const deleteMarridStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const report = await MarridStatus.findOneAndDelete({ _id: id });
  res.status(200).json({ msg: "success" });
});
module.exports = {
  addMarridStatus,
  getMarridStatus,
  deleteMarridStatus,
};
