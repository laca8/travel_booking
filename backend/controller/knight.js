const Knight = require("../models/Knight");
const multer = require("multer");
const path = require("path");
// Configure multer for file storage
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

const addKnight = async (req, res) => {
  const { name, sex, phone, stable, age, address, image } = req.body;
  // console.log(req.file);
  // console.log(req.user);

  try {
    if (!name || !sex || !phone || !stable || !age || !address) {
      return res.status(400).json({ message: "يجب ادخال جميع الحقول" });
    }
    if (name.length < 3) {
      return res
        .status(400)
        .json({ message: " من فضلك يجب ادخال 3 احرف  علي الاقل في حقل الاسم" });
    }
    const newKnight = await Knight.create({
      name,
      address,
      sex,
      phone,
      stable,
      age,
      image: req?.file?.filename,
      userId: req.user._id,
    });
    return res.status(201).json({ data: newKnight });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};
const getKnight = async (req, res) => {
  try {
    const knight = await Knight.findOne({ userId: req.user._id });
    // if (!knight) {
    //   return res.status(400).json({ message: "لم تقم باضافة فارس من قبل" });
    // }
    return res.status(201).json({ data: knight });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};
const editKnight = async (req, res) => {
  try {
    //console.log(req?.file);
    const { name, sex, phone, stable, age, address, image } = req.body;

    const knightExist = await Knight.findOne({ userId: req.user._id });
    if (!knightExist) {
      return res.status(400).json({ message: "لم تقم باضافة فارس من قبل" });
    }
    const knight = await Knight.findOneAndUpdate(
      { userId: req.user._id },
      {
        name,
        address,
        sex,
        phone,
        stable,
        age,
        image: req.file && req?.file?.filename,
      },
      {
        new: true,
      }
    );

    return res.status(201).json({ data: knight });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};
const deleteKnight = async (req, res) => {
  try {
    const knightExist = await Knight.findOne({ userId: req.user._id });
    if (!knightExist) {
      return res.status(400).json({ message: "لم تقم باضافة فارس من قبل" });
    }
    const knight = await Knight.findOneAndDelete({ userId: req.user._id });

    return res.status(201).json("تم حذف الفارس");
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};
module.exports = { upload, addKnight, getKnight, editKnight, deleteKnight };
