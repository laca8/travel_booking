const WorkType = require("../../models/admin/WorkType");
const asyncHandler = require("express-async-handler");

const addWorkType = asyncHandler(async (req, res) => {
  const { title } = req.body;
  const newEdu = await WorkType.create({ title });
  res.status(200).json({ msg: "success", data: newEdu });
});
const getWorkType = asyncHandler(async (req, res, next) => {
  const edus = await WorkType.find({});

  res.json({ msg: "success", data: edus });
});

const deleteWorkType = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const report = await WorkType.findOneAndDelete({ _id: id });
  res.status(200).json({ msg: "success" });
});
module.exports = {
  addWorkType,
  getWorkType,
  deleteWorkType,
};
