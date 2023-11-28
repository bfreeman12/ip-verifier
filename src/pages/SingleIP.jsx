import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import "../styles/single-ip.css";

function fetchIp(ip) {
  return axios
    .get("http://localhost:3200/getIp", {
      params: {
        ip: ip,
      },
    })
    .then((response) => response.data)
    .catch((error) => console.error(error));
}

export default function SingleIP() {
  let { ip } = useParams();

  const [ipData, setIpData] = useState([]);

  useEffect(() => {
    fetchIp(ip).then((data) => {
      setIpData(data[0]);
      console.log(data);
    });
  }, []);

  console.log(ipData);

  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="content-container">
          <div>
            <h1>
              {ipData.ip} {ipData.risk_score}
            </h1>
            <h3>uid: {ipData.uid}</h3>
            <h3>report uid: {ipData.reportuid}</h3>
            <h3>date scanned: {ipData.dateofscan}</h3>
            <h3>expiration date: {ipData.expirationdate}</h3>
          </div>

          <div>
            <h1>Anonymity</h1>
            <h3>{JSON.stringify(ipData.anonymity)}</h3>
          </div>

          <div>
            <h1>Blacklists</h1>
            <h3>{JSON.stringify(ipData.blacklists)}</h3>
          </div>

          <div>
            <h1>Information</h1>
            <h3>{JSON.stringify(ipData.information)}</h3>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
