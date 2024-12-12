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
const noteRoute = require("./routes/notes");
const app = express();
db();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", userRoute);
app.use("/api/knight", knightRoute);
app.use("/api/club", clubRoute);
app.use("/api/horse", horseRoute);
app.use("/api/train", trainRoute);
app.use("/api/race", raceRoute);
app.use("/api/note", noteRoute);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Api is running...");
  });
}
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server running at ${PORT}.....`);
});
