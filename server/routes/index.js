import express from "express";
import multer from "multer";
import getIps from "./getIps.js";
import getIpsByReport from "./getUniqueReportIps.js";
import getIpsByReportScannedIps from "../../archive/getIpsByReportScannedIps.js";
import saveReport from "./saveReport.js";
import scanIpList from "./scanIpList.js";
import getReports from "./getReports.js";
import getIp from "./getIp.js";
import getReport from "./getReport.js";
import handleFileUpload from "./handleFileUpload.js";

const routes = express.Router();

routes.get("/scanIpList", scanIpList);
routes.get("/getIp", getIp);
routes.get("/getIps", getIps);
routes.get("/getReport", getReport);
routes.get("/getReports", getReports);
routes.get("/getIpsByReport", getIpsByReport);
routes.get("/getIpsByReportScannedIps", getIpsByReportScannedIps);
routes.post("/handleFileUpload", handleFileUpload);

export default routes;
