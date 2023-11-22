import saveReportToDatabase from "../api/saveReportToDatabase.js";
import saveIpToDatabase from "../api/saveIpToDatabase.js";
import scanIpList from "./scanIpList.js";
import { v4 as uuidv4 } from "uuid";

export default function saveReport(scannedIpList) {
  let reportUID = uuidv4();
  let expirationDate = new Date(new Date().setMonth(new Date().getMonth() + 3));
  let highestRisk = 0;

  let currentReport = {
    uid: reportUID,
    dateOfReport: new Date(),
    reportName: reportUID,
    expirationDate: expirationDate.toDateString(),
    highestLevelOfThreat: 0,
    ipsScanned: scannedIpList.length,
  };

  for (const scannedIp of scannedIpList) {
    let currentScannedIp = {
      reportuid: reportUID,
      ip: scannedIp.data.report.ip,
      blacklists: scannedIp.data.report.blacklists,
      information: scannedIp.data.report.information,
      anonymity: scannedIp.data.report.anonymity,
      risk_score: scannedIp.data.report.risk_score.result,
    };
    if (currentScannedIp.risk_score > highestRisk)
      highestRisk = currentScannedIp.risk_score;
    saveIpToDatabase(currentScannedIp, reportUID);
  }
  currentReport.highestLevelOfThreat = highestRisk;
  saveReportToDatabase(currentReport);
}

saveReport(await scanIpList(["8.8.8.8", "8.8.4.4", "9.9.9.9"]));

// console.log(new Date(new Date().setMonth(new Date().getMonth() + 3)));
