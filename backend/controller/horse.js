const Horse = require("../models/Horse");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Files will be stored in 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

// File filter function
const fileFilter = (req, file, cb) => {
  // Accept only specific file types
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1 * 1024 * 1024, // 5MB file size limit
  },
});
const addHorse = async (req, res) => {
  const {
    name,
    sex,
    color,
    stable,
    type,
    age,
    ship_num,
    horse_owner,
    image,
    champions,
    buying,
    pulse,
    eye,
    blood,
    heat,
  } = req.body;

  try {
    if (!name) {
      return res.status(400).json({ message: "يجب ادخال جميع الحقول" });
    }
    const newHorse = await Horse.create({
      name,
      sex,
      color,
      stable,
      type,
      age,
      ship_num,
      horse_owner,
      image: req.file.filename,
      champions,
      buying,
      pulse,
      eye,
      blood,
      heat,

      userId: req.user._id,
    });
    return res.status(201).json({ data: newHorse });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};
const getHorse = async (req, res) => {
  try {
    const horse = await Horse.find({ userId: req.user._id });
    // if (!horse) {
    //   return res.status(400).json({ message: "لم تقم باضافة اي خيل من قبل " });
    // }
    return res.status(201).json({ data: horse });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};
const getHorses = async (req, res) => {
  const { color, sex, type } = req.query;
  const filter = { buying: true };
  if (color) {
    filter.color = color;
  }
  if (sex) {
    filter.sex = sex;
  }
  if (type) {
    filter.type = type;
  }
  // console.log(filter);

  try {
    const horses = await Horse.find(filter);
    // if (!horse) {
    //   return res.status(400).json({ message: "لم تقم باضافة اي خيل من قبل " });
    // }
    return res.status(201).json({ data: horses });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};
const editHorse = async (req, res) => {
  try {
    const horseExist = await Horse.findById({ userId: req.user._id });
    if (!horseExist) {
      return res.status(400).json({ message: "لم تقم باضافة اي خيل من قبل" });
    }
    const horse = await Horse.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );

    return res.status(201).json({ data: horse });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};
const deleteHorse = async (req, res) => {
  try {
    const horseExist = await Horse.findById({ _id: req.params.id });
    if (!horseExist) {
      return res.status(400).json({ message: "لم تقم باضافة نادي من قبل" });
    }
    const horse = await Horse.findByIdAndDelete({ _id: req.params.id });

    return res.status(201).json("تم حذف الخيل");
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};
module.exports = {
  addHorse,
  getHorse,
  editHorse,
  deleteHorse,
  upload,
  getHorses,
};
