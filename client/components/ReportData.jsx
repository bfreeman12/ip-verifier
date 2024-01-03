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
      const scan = scannedIPs.ips[key];

      return (
        <Link key={scan.ip} to={`/single-ip/${scan.ip}/`}>
          <div className="report">
            <p>{formatDate(scan.dateofscan)}</p>
            <p>{scan.ip}</p>
            <p>{scan.blacklists.detections}</p>
            <p>{scan.risk_score}</p>
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
