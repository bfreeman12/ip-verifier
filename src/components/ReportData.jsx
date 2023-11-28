import React from "react";
import formatDate from "../functions/formatDate";

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
        <div className="report" key={index}>
          <p>{formatDate(scan.dateofscan)}</p>
          <p>{scan.ip}</p>
          <p>{scan.blacklists.detections}</p>
          <p>{scan.risk_score}</p>
          <p>{formatDate(scan.expirationdate)}</p>
        </div>
      );
    });

    return content;
  }

  formattedContent =
    Object.keys(ips).length > 0 ? formatScanReport(ips) : "No entries found.";

  return (
    <>
      {/* horrible practice. This first report is a spacer. */}
      <div className="report"></div>
      <TableHeader />
      <div>{formattedContent}</div>
    </>
  );
}
export default ReportData;
