import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ReportData from "../components/ReportData";
import Navbar from "../components/Navbar";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

import "../styles/report-page.css";
import Footer from "../components/Footer";

function fetchIps() {
  return axios
    .get("http://172.16.220.218:3200/getIps")
    .then((response) => response.data)
    .catch((error) => console.error(error));
}

export default function AllIps() {
  let { uid } = useParams();
  const [ips, setIps] = useState([]);

  useEffect(() => {
    fetchIps().then((data) => {
      setIps(data);
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="report-body">
        <header className="reports-header">
          <FontAwesomeIcon icon={faList} className="fa-icon" />
          <h1>All Scanned IPs</h1>
        </header>
        <div className="ip-report">
          <ReportData ips={ips} />
        </div>
      </div>
      <Footer />
    </>
  );
}
