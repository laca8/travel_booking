const LevelWork = require("../../models/admin/LevelWork");
const asyncHandler = require("express-async-handler");

const addLevelWork = asyncHandler(async (req, res) => {
  const { title } = req.body;
  const newEdu = await LevelWork.create({ title });
  res.status(200).json({ msg: "success", data: newEdu });
});
const getLeveLWork = asyncHandler(async (req, res, next) => {
  const edus = await LevelWork.find({});

  res.json({ msg: "success", data: edus });
});

const deleteLevelWork = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const report = await LevelWork.findOneAndDelete({ _id: id });
  res.status(200).json({ msg: "success" });
});
module.exports = {
  addLevelWork,
  getLeveLWork,
  deleteLevelWork,
};
