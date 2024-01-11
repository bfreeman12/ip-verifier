import React from "react";
import formatDate from "../functions/formatDate";
import { Link } from "react-router-dom";

function ReportData(ips) {
  let formattedContent = [];

  function TableHeader() {
    return (
      <div className="report header">
        {/* <p></p> */}
        <p>Date</p>
        <p>IP Address Scanned</p>
        <p>No. of Detections</p>
        <p>Risk Score</p>
        <p>Expiration</p>
      </div>
    );
  }

  function formatScanReport(scannedIPs) {
    // console.log(scannedIPs, scannedIPs.ips);
    let content;
    content = Object.keys(scannedIPs.ips).map((key, index) => {
      let threatLevel = "low-threat";
      const scan = scannedIPs.ips[key];
      if (scan.risk_score > 1 && scan.risk_score <= 33) {
        threatLevel = "mid-threat";
      }
      if (scan.risk_score > 33 && scan.risk_score <= 66) {
        threatLevel = "high-threat";
      }
      if (scan.risk_score > 66 && scan.risk_score <= 100) {
        threatLevel = "crit-threat";
      }
      return (
        <Link key={scan.ip} to={`/single-ip/${scan.ip}/`}>
          <div className="report">
            <p>{formatDate(scan.dateofscan)}</p>
            <p>{scan.ip}</p>
            <p>{scan.blacklists.detections}</p>
            <p className={threatLevel}>{scan.risk_score}</p>
            <p>{formatDate(scan.expirationdate)}</p>
          </div>
        </Link>
      );
    });

    return content;
  }

  formattedContent =
    Object.keys(ips).length > 0 ? formatScanReport(ips) : "No entries found.";

  return (
    <>
      <TableHeader />
      <div>{formattedContent}</div>
    </>
  );
}
export default ReportData;
