const Train = require("../models/Train");
const addTrain = async (req, res) => {
  const { num, type, distance, time } = req.body;
  // console.log(req.body);

  try {
    if (!num || !type || !distance || !time) {
      return res.status(400).json({ message: "يجب ادخال جميع الحقول" });
    }
    const newTrain = await Train.create({
      num,
      type,
      distance,
      time,
    });
    return res.status(201).json({ data: newTrain });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};
const getTrains = async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          type: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const trains = await Train.find({ ...keyword });

    return res.status(201).json({ data: trains });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};
const getTrain = async (req, res) => {
  try {
    const train = await Train.findOne({ _id: req.params.id });

    return res.status(201).json({ data: train });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};
const editTrain = async (req, res) => {
  try {
    const train = await Train.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );

    return res.status(201).json({ data: train });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};
const deleteTrain = async (req, res) => {
  try {
    const train = await Train.findByIdAndDelete({ _id: req.params.id });

    return res.status(201).json("تم حذف التدريب");
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};
module.exports = { addTrain, getTrain, editTrain, deleteTrain, getTrains };
