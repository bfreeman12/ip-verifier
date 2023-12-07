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
    noOfIpsScanned: scannedIpList.length,
    scannedIps: [],
  };

  for (const scannedIp of scannedIpList) {
    if (scannedIp.risk_score > highestRisk) highestRisk = scannedIp.risk_score;
    try {
      console.log("NEW ip", scannedIp.data.report.ip);
      currentReport.scannedIps.push(scannedIp.data.report.ip);
      let currentScannedIp = {
        reportuid: reportUID,
        dateofscan: new Date(),
        expirationdate: expirationDate,
        ip: scannedIp.data.report.ip,
        blacklists: scannedIp.data.report.blacklists,
        information: scannedIp.data.report.information,
        anonymity: scannedIp.data.report.anonymity,
        risk_score: scannedIp.data.report.risk_score.result,
      };
      saveIpToDatabase(currentScannedIp, reportUID);
    } catch {
      console.log("ip in DB", scannedIp[0].ip);
      currentReport.scannedIps.push(scannedIp[0].ip);
    }
  }

  currentReport.highestLevelOfThreat = highestRisk;
  saveReportToDatabase(currentReport);
}

saveReport(
  await scanIpList(["14.14.15.16", "8.8.8.10", "2.2.2.69", "9.8.7.6"])
);
