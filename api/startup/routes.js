const express = require("express");
const cors = require("cors");
const contextService = require("request-context");
const httpContext = require("express-http-context");
const auth = require("../middleware/auth");

const search = require("../routes/search");
const error = require("../middleware/error");
const connect = require("../routes/connect");
const reports = require("../routes/reports");
const sendMail = require("../routes/sendMail");
const activity = require("../routes/activity");
const getAssets = require("../routes/getAssets");
const fileUpload = require("../routes/fileUpload");
const deleteAsset = require("../routes/deleteAsset");
const verifyAsset = require("../routes/verifyAsset");
const saveAssetsList = require("../routes/saveAssetsList");
const saveEmployeesList = require("../routes/saveEmployeesList");
const deleteEmployee = require("../routes/deleteEmployee");
const getEmployees = require("../routes/getEmployees");
const searchEmployee = require("../routes/searchEmployee");

module.exports = function (app) {
  app.use(cors());
  app.use(express.json({ limit: "50mb" }));
  app.use(contextService.middleware("request"));
  app.all("*", auth, (req, res, next) => {
    contextService.set("request:user", req.user);
    next();
  });
  app.use("/connect", connect);
  app.use("/reports", reports);
  app.use("/sendMail", sendMail);
  app.use("/activity", activity);
  
  // Assets Routes
  app.use("/search", search);
  app.use("/getAssets", getAssets);
  app.use("/imageUpload", fileUpload);
  app.use("/deleteAsset", deleteAsset);
  app.use("/verifyAsset", verifyAsset);
  app.use("/saveAssets", saveAssetsList);
  
  // Employees Routes
  app.use("/searchEmployees", searchEmployee);
  app.use("/saveEmployees", saveEmployeesList);
  app.use("/getEmployees", getEmployees);
  app.use("/deleteEmployee", deleteEmployee);

  app.use(error);
};
