import saveReportToDatabase from "../api/saveReportToDatabase.js";
import saveIpToDatabase from "../api/saveIpToDatabase.js";
import { v4 as uuidv4 } from "uuid";
import formatDate from "../../client/functions/formatDate.js";
import deleteIpFromDatabase from "../api/deleteIpFromDatabase.js";

function isIpExpired(ip) {
  return new Date(ip.expirationdate).valueOf() < new Date(new Date()).valueOf();
}
function isIpInDatabase(ip) {
  if (ip.uid) return true;
  else return false;
}
async function replaceIpInDatabase(ip, reportUID, expirationDate) {
  await deleteIpFromDatabase(ip.uid);
  const currentScannedIp = {
    reportuid: reportUID,
    dateofscan: new Date(),
    expirationdate: expirationDate,
    ...ip,
    risk_score: ip.riskScore,
  };
  saveIpToDatabase(currentScannedIp, reportUID);
}

export default async function saveReport(scannedIpList) {
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
    console.log(scannedIp.ip, scannedIp.uid);
    let riskScore = 0;
    currentReport.scannedIps.push(scannedIp.ip);
    if (typeof scannedIp.risk_score == "object") {
      riskScore = parseInt(scannedIp.risk_score.result);
    } else {
      riskScore = parseInt(scannedIp.risk_score);
    }
    highestRisk = Math.max(highestRisk, riskScore);

    if (isIpInDatabase(scannedIp) && isIpExpired(scannedIp)) {
      replaceIpInDatabase(scannedIp, reportUID, expirationDate);
    }

    if (!isIpInDatabase(scannedIp)) {
      const currentScannedIp = {
        reportuid: reportUID,
        dateofscan: new Date(),
        expirationdate: new Date(
          new Date().setMonth(new Date().getMonth() + 3)
        ).toDateString(),
        ...scannedIp,
        risk_score: riskScore,
      };
      saveIpToDatabase(currentScannedIp, reportUID);
    }
  });

  currentReport.highestLevelOfThreat = highestRisk;
  if (scannedIpList.length > 1) saveReportToDatabase(currentReport);
}
