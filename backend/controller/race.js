const Club = require("../models/Club");
const Race = require("../models/Race");
const addRace = async (req, res) => {
  const {
    date,
    distance,
    min_speed,
    max_speed,
    vite_time,
    rest_time,
    rounds,
    num_rounds,
    address,
    players,
  } = req.body;
  // console.log(rounds);

  try {
    if (
      !date ||
      !distance ||
      !min_speed ||
      !max_speed ||
      !vite_time ||
      !rest_time ||
      !address ||
      !num_rounds
    ) {
      return res.status(400).json({ message: "يجب ادخال جميع الحقول" });
    }
    const newRace = await Race.create({
      date,
      distance,
      min_speed,
      max_speed,
      vite_time,
      rest_time,
      rounds,
      num_rounds,
      address,
      players,
    });
    return res.status(201).json({ data: newRace });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};
const getRace = async (req, res) => {
  try {
    const race = await Race.findById({ _id: req.params.id });
    return res.status(201).json({ data: race });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};
const getRaces = async (req, res) => {
  try {
    const races = await Race.find({});

    return res.status(201).json({ data: races });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};
const editRace = async (req, res) => {
  const { knight, horse, num } = req.body;
  try {
    const raceExist = await Race.findById({ _id: req.params.id });
    const exist = raceExist.players.find(
      (x) => x.knight == knight && x.horse == horse
    );
    const exitNum = raceExist.players.find((x) => x.num == num);
    if (exitNum) {
      //console.log("تم التسجيل مسبقا ");
      return res.status(400).json({ message: "رقم المتسابق موجود بالفعل" });
    }
    if (exist) {
      //console.log("تم التسجيل مسبقا ");
      return res.status(400).json({ message: "تم التسجيل في المسابقة من قبل" });
    }

    const race = await Race.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          players: {
            num: req.body.num,
            knight: req.body.knight,
            horse: req.body.horse,
          },
        },
      },

      {
        new: true,
      }
    );

    return res.status(201).json({ data: race });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};
const deleteRace = async (req, res) => {
  try {
    const raceExist = await Race.findById({ _id: req.params.id });
    const race = await Race.findByIdAndDelete({ _id: req.params.id });
    return res.status(201).json("تم حذف المسابقة");
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};
module.exports = { addRace, getRace, editRace, deleteRace, getRaces };
