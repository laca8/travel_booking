const mongoose = require("mongoose");
const notesSchema = new mongoose.Schema(
  {
    userId: {
      required: "true",
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    question: {
      type: String,
      required: [true, "من فضلك ادخل استفسارك"],
    },
    answer: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("note", notesSchema);
