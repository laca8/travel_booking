const EduStatus = require("../../models/admin/EduStatus");
const asyncHandler = require("express-async-handler");

const addEduStatus = asyncHandler(async (req, res) => {
  const { title } = req.body;
  const newEdu = await EduStatus.create({title});
  res.status(200).json({ msg: "success", data: newEdu });
});
const getEdu = asyncHandler(async (req, res, next) => {
  const edus = await EduStatus.find({});

  res.json({ msg: "success", data: edus });
});

const deleteEdu = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const report = await EduStatus.findOneAndDelete({ _id: id });
  res.status(200).json({ msg: "success" });
});
module.exports = {
  addEduStatus,
  getEdu,
  deleteEdu,
};
