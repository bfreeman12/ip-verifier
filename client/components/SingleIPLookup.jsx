import React, { useState, useEffect } from "react";
import "../styles/single-ip-lookup.css";
import axios from "axios";

export default function SingleIPLookup() {
  let isReportPopulated = false;
  const [lookupIP, setLookupIP] = useState();

  const [ipData, setIpData] = useState([]);
  const [anonymity, setAnonymity] = useState({
    is_hosting: false,
    is_proxy: false,
    is_tor: false,
    is_vpn: false,
    is_webproxy: false,
  });
  const [blacklists, setBlacklists] = useState({
    detection_rate: "No Data",
    detections: "No Data",
  });
  const [engines, setEngines] = useState([]);
  const [information, setInformation] = useState([]);
  const [riskScore, setRiskScore] = useState("No Data");

  async function postIpAddresses(ipAddress) {
    return axios
      .post("http://172.16.220.218:3200/handleFileUpload", {
        ips: ipAddress,
      })
      .then((response) => {
        response.data;
        console.log(response.data.data[0]);
        setIpData(response.data.data[0]);
        if (typeof response.data.data[0].risk_score == "object") {
          setRiskScore(response.data.data[0].risk_score.result);
        } else {
          setRiskScore(response.data.data[0].risk_score);
        }
        setAnonymity(response.data.data[0].anonymity);
        setBlacklists(response.data.data[0].blacklists);
        setEngines(response.data.data[0].blacklists.engines);
        setInformation(response.data.data[0].information);
      })
      .catch((error) => console.error(error));
  }

  function InformationPanel() {
    let entries = [];
    Object.entries(information).forEach((entry) => {
      let infoEntry = (
        <p>
          {entry[0]}: {entry[1]}
        </p>
      );
      entries.push(infoEntry);
    });
    return <div>{entries}</div>;
  }

  return (
    <div className="widget-wrapper">
      <div className="single-ip-lookup">
        <h3>Single IP Lookup</h3>
        <div className="form">
          <input
            type="text"
            name="ip-text"
            id="ip-text"
            onBlur={(e) => {
              setLookupIP(e.target.value);
            }}
          ></input>
          <button onClick={() => postIpAddresses([lookupIP])}>Query IP</button>
        </div>
        <div className="whole">
          <div className="half">
            <div className="block">
              <h3>Basic Information</h3>
              <p>Risk Score: {riskScore}</p>
            </div>
            <div className="block">
              <h3>Blacklists</h3>
              <p>Detection Rate: {blacklists.detection_rate}</p>
              <p>Total Detections: {blacklists.detections}</p>
            </div>
          </div>
          <div className="half">
            <div className="block">
              <h3>Anonymity</h3>
              <p>Proxy: {anonymity.is_proxy.toString()}</p>
              <p>Web Proxy: {anonymity.is_webproxy.toString()}</p>
              <p>Hosting: {anonymity.is_hosting.toString()}</p>
              <p>VPN: {anonymity.is_vpn.toString()}</p>
              <p>Tor Node: {anonymity.is_tor.toString()}</p>
            </div>
            <div className="block">
              <h3>Information</h3>
              <InformationPanel />
            </div>
          </div>
        </div>
        <h5>View Report</h5>
      </div>
    </div>
  );
}
