import saveReportToDatabase from "../api/saveReportToDatabase.js";
import saveIpToDatabase from "../api/saveIpToDatabase.js";
import { v4 as uuidv4 } from "uuid";
import formatDate from "../../client/functions/formatDate.js";

export default function saveReport(scannedIpList) {
  const reportUID = uuidv4();
  const expirationDate = new Date(
    new Date().setMonth(new Date().getMonth() + 3)
  ).toDateString();
  let highestRisk = 0;

  const currentReport = {
    uid: reportUID,
    dateOfReport: new Date(),
    reportName: formatDate(new Date()) + " Report",
    expirationDate,
    highestLevelOfThreat: 0,
    noOfIpsScanned: scannedIpList.length,
    scannedIps: [],
  };

  scannedIpList.forEach((scannedIp) => {
    let isIpInDatabase = false;
    if (scannedIp.length && scannedIp[0].ip) isIpInDatabase = true;

    let ipData;
    let riskScore = 0;
    if (isIpInDatabase) {
      ipData = scannedIp[0];
      riskScore = parseInt(scannedIp[0].risk_score);
    } else {
      ipData = scannedIp.data.report;
      riskScore = parseInt(scannedIp.data.report.risk_score.result);
    }

    highestRisk = Math.max(highestRisk, riskScore);

    currentReport.scannedIps.push(ipData.ip);

    if (!isIpInDatabase) {
      const currentScannedIp = {
        reportuid: reportUID,
        dateofscan: new Date(),
        expirationdate: expirationDate,
        ...ipData,
        risk_score: riskScore,
      };

      saveIpToDatabase(currentScannedIp, reportUID);
    }
  });

  currentReport.highestLevelOfThreat = highestRisk;
  saveReportToDatabase(currentReport);
}

// saveReport(
//   await scanIpList(["14.14.15.16", "8.8.8.10", "2.2.2.69", "9.8.7.6"])
// );
