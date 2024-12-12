const Notes = require("../models/Notes");
const addNote = async (req, res) => {
  const { question } = req.body;
  // console.log(req.body);

  try {
    const note = await Notes.create({
      question,
      userId: req.user._id,
    });
    return res.status(201).json({ data: note });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};
const getNotes = async (req, res) => {
  try {
    const notes = await Notes.find({})
      .sort({ createdAt: -1 })
      .populate({ path: "userId", select: "name -_id" });
    // if (!club) {
    //   return res.status(400).json({ message: "لم تقم باضافة نادي من قبل" });
    // }
    return res.status(201).json({ data: notes });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};
const editNotes = async (req, res) => {
  console.log(req.body.answer);

  try {
    const notes = await Notes.findByIdAndUpdate(
      { _id: req.params.id },
      {
        answer: req.body.answer,
      },
      {
        new: true,
      }
    );
    // if (!club) {
    //   return res.status(400).json({ message: "لم تقم باضافة نادي من قبل" });
    // }
    return res.status(201).json({ data: notes });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};
module.exports = { addNote, getNotes, editNotes };
