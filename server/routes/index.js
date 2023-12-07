import express from "express";
import multer from "multer";
import getIps from "./getIps.js";
import getIpsByReport from "./getUniqueReportIps.js";
import getIpsByReportScannedIps from "./getIpsByReportScannedIps.js";
import saveReport from "./saveReport.js";
import scanIpList from "./scanIpList.js";
import getReports from "./getReports.js";
// import getReport from "./getReport.js";
import getIp from "./getIp.js";

const routes = express.Router();

routes.get("/scanIpList", scanIpList);
routes.get("/getIp", getIp);
routes.get("/getIps", getIps);
routes.get("/getReports", getReports);
routes.get("/getIpsByReport", getIpsByReport);
routes.get("/getIpsByReportScannedIps", getIpsByReportScannedIps);
// routes.get("/getReport", getReport);

export default routes;
