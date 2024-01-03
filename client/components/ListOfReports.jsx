import React from "react";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import formatDate from "../functions/formatDate";

function ListOfReports(data) {
  let formattedContent;

  function removeElement(e) {
    e.preventDefault();
    const targetIndex = e.target.id;
    const newData = { ...data };
    delete newData[targetIndex];
    setData(newData);
  }

  function TableHeader() {
    return (
      <div className="report header">
        {/* <p></p> */}
        <button></button>
        <p>Date</p>
        <p className="report-name">Report Name</p>
        <p>Highest Level of Threat</p>
        <p>No. of IPs Scanned</p>
        <p>Expiration</p>
        <a></a>
      </div>
    );
  }

  function formatReport(reportData) {
    let content;
    content = Object.keys(reportData).map((key, index) => {
      const report = reportData[key];

      return (
        <div className="report" key={index}>
          <button id={key} onClick={(e) => removeElement(e)}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
          <p>{formatDate(report.dateofreport)}</p>
          <p className="report-name">{report.reportname}</p>
          <p>{report.highestlevelofthreat}</p>
          <p>{report.noofipsscanned}</p>
          <p>{report.expirationdate}</p>
          <Link key={report.uid} to={`/report/${report.uid}`}>
            <p>View Report</p>
          </Link>
        </div>
      );
    });

    return content;
  }

  formattedContent =
    Object.keys(data).length > 0
      ? formatReport(data.data)
      : "No entries found.";

  return (
    <>
      <TableHeader />
      <div>{formattedContent}</div>
    </>
  );
}
export default ListOfReports;
