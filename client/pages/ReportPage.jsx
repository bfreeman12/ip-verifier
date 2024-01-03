import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ReportData from "../components/ReportData";
import Navbar from "../components/Navbar";
import axios from "axios";

import "../styles/report-page.css";
import Footer from "../components/Footer";

async function fetchReport(uid) {
  return axios
    .get(`http://localhost:3200/getReport`, {
      params: {
        uid: uid,
      },
    })
    .then((response) => response.data)
    .catch((error) => console.error(error));
}

export default function ReportPage() {
  let { uid } = useParams();
  const [ips, setIps] = useState([]);

  useEffect(() => {
    fetchReport(uid).then((data) => {
      console.log(data);
      setIps(data);
    });
  }, []);

  return (
    <>
      <Navbar />
      {/* <div className="report-body">
        <h1>Report {uid}</h1>
        <div className="ip-report">
          <ReportData ips={ips} />
        </div>
      </div> */}
      <Footer />
    </>
  );
}
