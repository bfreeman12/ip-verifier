import express from "express";
import multer from "multer";
import getIps from "./getIps.js";
import getIpsByReport from "./getIpsByReport.js";
import saveReport from "./saveReport.js";
import scanIpList from "./scanIpList.js";
import getReports from "./getReports.js";

const routes = express.Router();

routes.get("/getIps", getIps);
routes.get("/getReports", getReports);

export default routes;
