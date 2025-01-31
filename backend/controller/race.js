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
    pulse,
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
      !num_rounds ||
      !pulse
    ) {
      return res.status(400).json({ message: "يجب ادخال جميع الحقول" });
    }
    const newRace = await Race.create({
      date,
      pulse,
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
  const { knight, horse, num, entries } = req.body;
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
        entries,
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
const editStagesRace = async (req, res) => {
  const { entries } = req.body;
  // console.log(entries);

  try {
    const raceExist = await Race.findById({ _id: req.params.id });

    const race = await Race.findByIdAndUpdate(
      { _id: req.params.id },
      {
        entries,
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
const getReportHorse = async (req, res) => {
  const { horse } = req.params;
  console.log(horse);
  try {
    const raceExist = await Race.find({});
    // console.log(
    //   raceExist.map((x) =>
    //     x.entries.map((y) => y.riders.filter((z) => z.horseName == horse))
    //   )
    // );

    const exist = raceExist.flatMap((x) =>
      x.entries.flatMap((y) =>
        y.riders.flatMap((z) => {
          if (z.horseName == horse) {
            return {
              date: x.date,
              disRounds: [y.distance],
              distance: x.distance,
              address: x.address,
              num_rounds: x.num_rounds,
              qualified: y.riders
                .filter((x) => x.horseName == horse)
                .map((x) => x.qualified),
              totalRiding: y.riders
                .filter((x) => x.horseName == horse)
                .map((x) => x.totalRiding),
            };
          }
        })
      )
    );

    // console.log(exist);
    res.send(exist);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};
module.exports = {
  addRace,
  getRace,
  editRace,
  deleteRace,
  getRaces,
  editStagesRace,
  getReportHorse,
};
