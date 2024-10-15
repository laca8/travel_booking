const Disable = require("../../models/admin/disable");
const asyncHandler = require("express-async-handler");

const addDisable = asyncHandler(async (req, res) => {
  const { title } = req.body;
  const newEdu = await Disable.create({ title });
  res.status(200).json({ msg: "success", data: newEdu });
});
const getDisable = asyncHandler(async (req, res, next) => {
  const edus = await Disable.find({});

  res.json({ msg: "success", data: edus });
});

const deleteDisable = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const report = await Disable.findOneAndDelete({ _id: id });
  res.status(200).json({ msg: "success" });
});
module.exports = {
  addDisable,
  getDisable,
  deleteDisable,
};
