const NoteSugg = require("../models/NoteSugg");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const addNote = asyncHandler(async (req, res, next) => {
  const { suggId, note } = req.body;
  if (!suggId || !note) {
    return next(new ApiError("يجب ادخال البيانات", 500));
  }
  const newNote = await NoteSugg.create({
    note,
    suggId,
  });

  res.status(201).json({ msg: "success", data: newNote });
});

const getNotes = asyncHandler(async (req, res, next) => {
  const { suggId } = req.params;
  const notes = await NoteSugg.find({ suggId: suggId }); //.populate({path: "suggId", });
  if (!notes) {
    return next(new ApiError("لا يوجد بيانات", 500));
  }
  res.status(200).json({ msg: "success", result: notes.length, data: notes });
});
module.exports = {
  addNote,
  getNotes,
};
