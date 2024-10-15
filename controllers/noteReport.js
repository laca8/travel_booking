const NoteReport = require("../models/NoteReport");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const addNote = asyncHandler(async (req, res, next) => {
  const { reportId, note } = req.body;
  if (!reportId || !note) {
    return next(new ApiError("يجب ادخال البيانات", 500));
  }
  const newNote = await NoteReport.create({ reportId, note });
  res.status(200).json({ msg: "success", data: newNote });
});

const getNotes = asyncHandler(async (req, res, next) => {
  const { reportId } = req.params;
  const notes = await NoteReport.find({ reportId: reportId }); //.populate({path: "reportId", });
  if (!notes) {
    return next(new ApiError("لا يوجد بيانات", 500));
  }
  res.status(200).json({ msg: "success", result: notes.length, data: notes });
});
module.exports = {
  addNote,
  getNotes,
};
