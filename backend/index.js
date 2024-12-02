const express = require("express");
const path = require("path");
const db = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoute = require("./routes/users");
const knightRoute = require("./routes/knight");
const clubRoute = require("./routes/club");
const horseRoute = require("./routes/horse");
const raceRoute = require("./routes/race");
const trainRoute = require("./routes/train");
const app = express();
db();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*", credentials: true }));
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("api running....");
});
app.use("/api/auth", userRoute);
app.use("/api/knight", knightRoute);
app.use("/api/club", clubRoute);
app.use("/api/horse", horseRoute);
app.use("/api/train", trainRoute);
app.use("/api/race", raceRoute);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server running at ${PORT}.....`);
});
