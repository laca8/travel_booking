const OutWork = require("../../models/admin/OutWork");
const asyncHandler = require("express-async-handler");

const addOutWork = asyncHandler(async (req, res) => {
  const { title } = req.body;
  const newEdu = await OutWork.create({title});
  res.status(200).json({ msg: "success", data: newEdu });
});
const getOutWork = asyncHandler(async (req, res, next) => {
  const edus = await OutWork.find({});

  res.json({ msg: "success", data: edus });
});

const deleteOutWork = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const report = await OutWork.findOneAndDelete({ _id: id });
  res.status(200).json({ msg: "success" });
});
module.exports = {
  addOutWork,
  getOutWork,
  deleteOutWork,
};
