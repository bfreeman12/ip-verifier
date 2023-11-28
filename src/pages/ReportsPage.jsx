import React from "react";
import Navbar from "../components/Navbar";
import Reports from "../components/Reports";
import { useState, useEffect } from "react";
import axios from "axios";

import "../styles/report-page.css";

function fetchReports() {
  return axios
    .get("http://localhost:3200/getReports")
    .then((response) => response.data)
    .catch((error) => console.error(error));
}

export default function ReportPage() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports().then((data) => {
      setReports(data);
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="report-body">
        <h1>Reports</h1>
        <div className="ip-report">
          <Reports data={reports} />
        </div>
      </div>
    </>
  );
}
