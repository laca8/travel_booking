const mongoose = require("mongoose");
const dbUrl = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://laca:jae09908@cluster0.gjxhg.mongodb.net/travel_booking?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("db connect");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
module.exports = dbUrl;
