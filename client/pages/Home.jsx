import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/home.css";
import MinifiedReportList from "../components/MinifiedReportList";
import UploadWidget from "../components/UploadWidget";
import SingleIPLookup from "../components/SingleIPLookup";

async function fetchRemainingCredits() {
  return axios
    .get("http://172.16.220.218:3200/getRemainingCredits")
    .then((response) => response.data)
    .catch((error) => console.error(error));
}

async function fetchReports() {
  return axios
    .get("http://172.16.220.218:3200/getReports")
    .then((response) => response.data)
    .catch((error) => console.error(error));
}

export default function Home() {
  const [reports, setReports] = useState([]);
  const [remainingCredits, setRemainingCredits] = useState([]);
  const [remainingQueries, setRemainingQueries] = useState([]);

  useEffect(() => {
    fetchReports().then((data) => {
      setReports(data);
    });
    fetchRemainingCredits().then((data) => {
      console.log(data);
      setRemainingCredits(data.credits_remained);
      setRemainingQueries(data.estimated_queries);
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="home-body">
        <div className="widgets">
          <UploadWidget
            remainingCredits={remainingCredits}
            remainingQueries={remainingQueries}
          />
          <SingleIPLookup />
        </div>
        <div className="widgets">
          <MinifiedReportList data={reports} />
        </div>
      </div>
      <Footer />
    </>
  );
}
