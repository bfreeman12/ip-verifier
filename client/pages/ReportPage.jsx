import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ReportData from "../components/ReportData";
import Navbar from "../components/Navbar";
import axios from "axios";

import "../styles/report-page.css";
import Footer from "../components/Footer";

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
    .get(`http://localhost:3200/getReport`, {
      params: {
        uid: uid,
      },
    })
    .then((response) => response.data)
    .catch((error) => console.error(error));
}
async function fetchIp(ip) {
  return axios
    .get("http://localhost:3200/getIp", {
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

  useEffect(() => {
    fetchReport(uid).then(async (data) => {
      console.log(data);
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
        <h1>Report {uid}</h1>
        <div className="ip-report">
          <ReportData ips={ips} />
        </div>
      </div>
      <Footer />
    </>
  );
}
