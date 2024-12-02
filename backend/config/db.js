const mongoose = require("mongoose");
const path = require("path");

const db = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ahmed:VernA2525@cluster0.2qrrr0b.mongodb.net/فروسية?retryWrites=true&w=majority"
    );
    console.log("db connected");
  } catch (err) {
    console.log(err);
  }
};
module.exports = db;
