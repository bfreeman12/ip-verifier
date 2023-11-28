import express from "express";
import multer from "multer";
import getIps from "./getIps.js";
import getIpsByReport from "./getIpsByReport.js";
import saveReport from "./saveReport.js";
import scanIpList from "./scanIpList.js";
import getReports from "./getReports.js";
import getIp from "./getIp.js";

const routes = express.Router();

routes.get("/getIp", getIp);
routes.get("/getIps", getIps);
routes.get("/getReports", getReports);
routes.get("/getIpsByReport", getIpsByReport);

export default routes;
