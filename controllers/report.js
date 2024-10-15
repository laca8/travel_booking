const Report = require("../models/Report");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const addReport = asyncHandler(async (req, res) => {
  const reports = await Report.find();
  console.log(reports.length);
  var dt = new Date();
  var year = dt.getFullYear().toString().slice(-2);
  var month = (dt.getMonth() + 1).toString().padStart(2, "0");
  var day = dt.getDate().toString().padStart(2, "0");
  var t = (reports.length + 1).toString().padStart(3, "0");
  //console.log(`${year}${month}${day}${t + 1}`);
  const numReport = `${year}${month}${day}${t}.`;
  const {
    name,
    phone,
    age,
    id,
    report,
    connName,
    connCity,
    connId,
    connJop,
    connPhone,
    connPlace,
    connShiek,
    connRelation,
    connType,
    connAge,
    nameUser,
    communicationReport,
    eduLevel,
    eduStatus,
    marridStatus,
    workStatus,
    typeWork,
    outWork,
    healthInsure,
    finSupport,
    city,
    place,
    shiek,
    type,
    dis,
    reason,
    side,
  } = req.body;
  //console.log(req.body);
  const newReport = new Report({
    name,
    phone,
    age,
    id,
    numReport,
    report,
    connName,
    connCity,
    connShiek,

    connId,
    connJop,
    connPhone,
    connPlace,
    connRelation,
    connType,
    connAge,
    city,
    place,
    shiek,
    nameUser,
    communicationReport,
    eduLevel,
    eduStatus,
    marridStatus,
    workStatus,
    typeWork,
    outWork,
    healthInsure,
    finSupport,

    type,
    dis,
    reason,
    side,
  });
  await newReport.save();
  res.status(200).json({ msg: "success", data: newReport });
});
const getReport = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const report = await Report.findById({ _id: id });
  if (!report) {
    return next(new ApiError("لا يوجد بلاغ يتماشي مع هذه البيانات"));
  }
  res.json({ msg: "success", data: report });
});
const getReports = asyncHandler(async (req, res) => {
  if (req.query) {
    var mongooseQuery = Report.find(req.query);
  }
  //console.log(req.query);

  //execute query
  const reports = await mongooseQuery;

  res.status(200).json({
    msg: "success",
    results: reports.length,
    data: reports,
  });
});
const updateReport = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    imp,
    side,
    eduStatus,
    eduLevel,
    workStatus,
    outWork,
    typeWork,
    marridStatus,
    finSupport,
    healthInsure,
    connName,
    connCity,
    connId,
    connJop,
    connPhone,
    connPlace,
    connRelation,
    connType,
    connAge,
    connShiek,
    name,
    phone,
    city,
    place,
    type,
    ids,
    dis,
    reason,
    age,
  } = req.body;
  const report = await Report.findOneAndUpdate(
    { _id: id },
    {
      imp,
      side,
      eduStatus,
      eduLevel,
      workStatus,
      outWork,
      typeWork,
      marridStatus,
      finSupport,
      healthInsure,
      connName,
      connCity,
      connId,
      connJop,
      connPhone,
      connPlace,
      connRelation,
      connType,
      connAge,
      connShiek,
      name,
      phone,
      city,
      place,
      type,
      ids,
      dis,
      reason,
      age,
    },
    {
      new: true,
    }
  );
  //console.log(req.body);
  res.status(200).json({ msg: true, data: report });
});
module.exports = {
  addReport,
  getReports,
  getReport,
  updateReport,
};
