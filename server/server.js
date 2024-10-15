const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const globalError = require("./middlewares/errorhandler");
dotenv.config({ path: "./config/config.env" });
const connDb = require("./config/db");
const reportRoute = require("./routes/reportRoute");
const suggRoute = require("./routes/suggestionRoute");
const noteRoute = require("./routes/noteRoute");
const userRoute = require("./routes/userRoute");
const noteSuggRoute = require("./routes/noteSuggRoute");
const ApiError = require("./utils/apiError");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*", credentials: true }));
connDb();
app.use("/api/report", reportRoute);
app.use("/api/sugg", suggRoute);
app.use("/api/note", noteRoute);
app.use("/api/user", userRoute);
app.use("/api/note/sugg", noteSuggRoute);
app.use("/api/eduLevel", require("./routes/admin/eduLevel"));
app.use("/api/eduStatus", require("./routes/admin/eduStatus"));
app.use("/api/marrideStatus", require("./routes/admin/marrideStatus"));
app.use("/api/outWork", require("./routes/admin/outWork"));
app.use("/api/workType", require("./routes/admin/workType"));
app.use("/api/disable", require("./routes/admin/disable"));
app.use("/api/city", require("./routes/admin/city"));
app.use("/api/place", require("./routes/admin/place"));
app.use("/api/shiek", require("./routes/admin/shiek"));
app.use("*", (req, res, next) => {
  next(new ApiError("this route not found", 404));
});

app.use(globalError);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/clients/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "clients", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Api is running...");
  });
}
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running at port ${PORT}...`);
});
