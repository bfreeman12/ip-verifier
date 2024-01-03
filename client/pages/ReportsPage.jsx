import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ListOfReports from "../components/ListOfReports";
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
          <ListOfReports data={reports} />
        </div>
      </div>
      <Footer />
    </>
  );
}
