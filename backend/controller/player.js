const Player = require("../models/Player");
const multer = require("multer");
const path = require("path");

const addPlayer = async (req, res) => {
  const { knight, horse } = req.body;
  // console.log(req.file);
  // console.log(req.user);

  try {
    if (!knight || !horse) {
      return res.status(400).json({ message: "يجب ادخال جميع الحقول" });
    }

    const newKnight = await Player.create({
      knight,
      horse,
    });
    return res.status(201).json({ data: newKnight });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const getPlayers = async (req, res) => {
  try {
    const knights = await Player.find({});

    return res.status(201).json({ data: knights });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const deletePlayer = async (req, res) => {
  try {
    const knightExist = await Player.findOne({ _id: req.params.id });
    if (!knightExist) {
      return res.status(400).json({ message: "لم تقم باضافة فارس من قبل" });
    }
    const knight = await Player.findOneAndDelete({ _id: req.params.id });

    return res.status(201).json("تم حذف الفارس");
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};
module.exports = {
  addPlayer,
  getPlayers,
  deletePlayer,
};
