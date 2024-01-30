import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ReportData from "../components/ReportData";
import Navbar from "../components/Navbar";
import axios from "axios";
// import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

import "../styles/report-page.css";
import Footer from "../components/Footer";
// import updateReport from "../../server/routes/updateReport";

const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;
const PORT = import.meta.env.VITE_PORT;

function formatListOfIPs(text) {
  if (text == undefined) {
    console.log("text is undefined");
  } else {
    let items = text.slice(1, -1).split(",");
    return items.map((item) => item.replace(/"/g, "").trim());
  }
}

async function fetchReport(uid) {
  return axios
    .get(`http://${SERVER_HOST}:${PORT}/getReport`, {
      params: {
        uid: uid,
      },
    })
    .then((response) => response.data)
    .catch((error) => console.error(error));
}
async function fetchIp(ip) {
  return axios
    .get(`http://${SERVER_HOST}:${PORT}/getIp`, {
      params: {
        ip: ip,
      },
    })
    .then((response) => response.data)
    .catch((error) => console.error(error));
}

export default function ReportPage() {
  let { uid } = useParams();
  const [ips, setIps] = useState([]);
  const [reportName, setReportName] = useState([]);
  const [rawReportData, setReportData] = useState([]);

  const deleteReport = async (reportId) => {
    if (window.confirm("Are you sure you would like to delete this report?")) {
      try {
        await axios.post("http://${SERVER_HOST}:${PORT}/deleteReport", {
          uid: reportId,
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  async function handleReportDelete(reportuid) {
    await deleteReport(reportuid);
    window.location.href = "/reports/";
  }

  async function handleNameChange(reportuid) {
    let newReportName = prompt("Input new report name");
    if (newReportName == undefined) return;
    try {
      await axios.patch("http://${SERVER_HOST}:${PORT}/updateReport", {
        params: {
          uid: reportuid,
          reportName: newReportName,
        },
      });
    } catch (error) {
      console.error(error);
    }
    setReportName(newReportName);
  }

  useEffect(() => {
    fetchReport(uid).then(async (data) => {
      console.log(data);
      setReportName(data.reportname);
      setReportData(data);
      let listOfIPs = ["8.8.8.8"];
      if (data != undefined) {
        listOfIPs = formatListOfIPs(data.scannedips);
      }
      //This was ChatGPT. Don't @ me.
      const listOfIPDataPromises = listOfIPs.map((ip) => fetchIp(ip));
      const resolvedIPData = await Promise.all(listOfIPDataPromises);
      const refinedIPData = resolvedIPData.map((array) => array[0]);
      //end of ChatGPT.
      setIps(refinedIPData);
      console.log(refinedIPData);
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="report-body">
        <header>
          <div>
            <div className="report-name-block">
              <h1>{reportName}</h1>
              <h4>{rawReportData.uid}</h4>
            </div>
            <FontAwesomeIcon
              icon={faPenToSquare}
              onClick={() => {
                handleNameChange(rawReportData.uid);
              }}
              className="fa-icon"
            />
          </div>
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => {
              handleReportDelete(rawReportData.uid);
            }}
            className="fa-icon"
          />
        </header>

        <div className="ip-report">
          <ReportData ips={ips} />
        </div>
      </div>
      <Footer />
    </>
  );
}
