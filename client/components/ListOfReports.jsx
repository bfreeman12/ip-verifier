import React, { useState } from "react";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import formatDate from "../functions/formatDate";
import axios from "axios";

const ListOfReports = ({ reports, deleteReport }) => {
  const [editableReportName, setEditableReportName] = useState();
  let formattedContent;

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
    console.log(reportData);

    content = Object.keys(reportData).map((key, index) => {
      const report = reportData[key];
      let threatLevel = "low-threat";
      if (
        report.highestlevelofthreat > 1 &&
        report.highestlevelofthreat <= 33
      ) {
        threatLevel = "mid-threat";
      }
      if (
        report.highestlevelofthreat > 33 &&
        report.highestlevelofthreat <= 66
      ) {
        threatLevel = "high-threat";
      }
      if (
        report.highestlevelofthreat > 66 &&
        report.highestlevelofthreat <= 100
      ) {
        threatLevel = "crit-threat";
      }

      const handleNameChange = async (reportUid, newName) => {
        if (
          window.confirm("Are you sure you would like to rename this report?")
        ) {
          try {
            await axios.patch("http://172.16.220.218:3200/updateReport", {
              params: {
                uid: reportUid,
                reportName: newName,
              },
            });
          } catch (error) {
            console.error(error);
          }
        }
      };

      return (
        <div className="report" key={index}>
          <button
            id={key}
            onClick={() => {
              deleteReport(report.uid);
            }}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
          <p>{formatDate(report.dateofreport)}</p>
          <p
            id={report.uid}
            className="report-name"
            contentEditable="true"
            onBlur={(e) => {
              setEditableReportName(e.target.innerText);
            }}
            suppressContentEditableWarning={true}
          >
            {report.reportname || editableReportName}
          </p>
          <button
            onClick={() => handleNameChange(report.uid, editableReportName)}
          >
            ✓
          </button>
          <p className={threatLevel}>{report.highestlevelofthreat}</p>
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
    reports && Object.keys(reports).length > 0
      ? formatReport(reports)
      : "No entries found.";

  return (
    <>
      <TableHeader />
      <div>{formattedContent}</div>
    </>
  );
};
export default ListOfReports;
