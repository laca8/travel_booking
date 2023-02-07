const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const tour = require("./routes/tour");
const user = require("./routes/user");
const review = require("./routes/review");
const booking = require("./routes/booking");
const path = require("path");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "config/config.env" });
connectDB();
app.use(express.json());
app.use(
  cors({
    origin: true,
    credintials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.send("this is from backend");
  console.log(__dirname);
});

//router
app.use("/api/tour", tour);
app.use("/api/user", user);
app.use("/api/review", review);
app.use("/api/booking", booking);
//build
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Api is running...");
  });
}
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
