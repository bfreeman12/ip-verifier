import React, { useState, useEffect } from "react";
import "../styles/single-ip-lookup.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;
const PORT = import.meta.env.VITE_PORT;

export default function SingleIPLookup() {
  //   let isReportPopulated = false;
  const [isReportPopulated, setIsReportPopulated] = useState(false);
  const [lookupIP, setLookupIP] = useState("8.8.8.8");
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

  function validateIP(ipAddress) {
    const ipRegex = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/;

    const regexLocalhost = /^(127\.)/;
    const regexPrivateNetwork10 = /^(10\.)/;
    const regexPrivateNetwork172 = /^(172\.(1[6-9]|2[0-9]|3[0-1])\.)/;
    const regexPrivateNetwork192 = /^(192\.168\.)/;
    const regexPrivateNetwork131 = /^(131\.14\.)/;
    const regexAPIPA = /^(169\.254\.)/;
    const regexMulticast = /^(22[4-9]|23[0-9])\./;
    const regexFutureUse = /^(24[0-9]|25[0-5])\./;
    const regexBroadcast = /^(255\.255\.255\.255)/;

    const ipRegexes = [
      regexLocalhost,
      regexPrivateNetwork10,
      regexPrivateNetwork172,
      regexPrivateNetwork192,
      regexPrivateNetwork131,
      regexAPIPA,
      regexMulticast,
      regexFutureUse,
      regexBroadcast,
    ];

    let isPublic = true;
    let isIPV4 = true;

    console.log(ipAddress.split(""));

    // if (ipAddress.split("")[0] == "f") isIPV4 = false;
    if (!ipRegex.test(ipAddress)) isIPV4 = false;

    if (ipRegexes.some((regex) => regex.test(ipAddress))) {
      isPublic = false;
    }

    if (isPublic && isIPV4) return true;
    else {
      console.log("invalid ip");
      return false;
    }
  }

  async function postIpAddresses(ipAddress) {
    if (validateIP(ipAddress[0])) {
      return axios
        .post(`http://${SERVER_HOST}:${PORT}/handleFileUpload`, {
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
          setIsReportPopulated(true);
        })
        .catch((error) => console.error(error));
    } else {
      alert(
        "Invalid IP. Please try entering a more valid IPV4 IP next time. I'm not very good at input validation, so if you mess around enough, you might crash my server. Please don't do that! (•̀з•́)"
      );
    }
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

  function ResourcesPanel() {
    if (isReportPopulated) {
      return (
        <div className="list">
          <a href={`https://otx.alienvault.com/indicator/ip/${ipData.ip}`}>
            Link to Alienvault
          </a>
          <a href={`https://search.dnslytics.com/ip/${ipData.ip}`}>
            Link to DNSlytics
          </a>
          <a href="https://www.url2png.com/">Link to URL2PNG</a>
          <a href="https://www.urlscan.io/">Link to URLScan.io</a>
          <a href={`https://www.virustotal.com/gui/ip-address/${ipData.ip}`}>
            Link to VirusTotal
          </a>
        </div>
      );
    } else {
      return <p>No data given</p>;
    }
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
          <button onClick={() => postIpAddresses([lookupIP])}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
        <div className="whole">
          <div className="half">
            <div className="block">
              <h3>Basic Information</h3>
              <p>Risk Score: {riskScore}</p>
            </div>
            <div className="block">
              <h3>Resources</h3>
              <ResourcesPanel />
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
