import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ListOfReports from "../components/ListOfReports";
import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/report-page.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";

const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;
const PORT = import.meta.env.VITE_PORT;

export default function ReportPage() {
  const [reports, setReports] = useState([]);

  async function fetchReports() {
    return axios
      .get(`http://${SERVER_HOST}:${PORT}/getReports`)
      .then((response) => response.data)
      .catch((error) => console.error(error));
  }

  const deleteReport = async (reportId) => {
    if (window.confirm("Are you sure you would like to delete this report?")) {
      try {
        await axios.post(`http://${SERVER_HOST}:${PORT}/deleteReport`, {
          uid: reportId,
        });
        // Update the reports state after deletion
        let newReports = await fetchReports();
        setReports(newReports);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchReports().then((data) => {
      setReports(data);
    });
  }, []);
  return (
    <>
      <Navbar />
      <div className="report-body">
        <header className="reports-header">
          <FontAwesomeIcon icon={faFile} className="fa-icon" />
          <h1>Reports</h1>
        </header>
        <div className="ip-report">
          <ListOfReports reports={reports} deleteReport={deleteReport} />
        </div>
      </div>
      <Footer />
    </>
  );
}
