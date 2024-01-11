import React, { useState } from "react";
import "../styles/single-ip-lookup.css";
import axios from "axios";

export default function SingleIPLookup() {
  const [lookupIP, setLookupIP] = useState();
  const [ipData, setIpData] = useState();

  async function postIpAddresses(ipAddress) {
    return axios
      .post("http://172.16.220.218:3200/handleFileUpload", {
        ips: ipAddress,
      })
      .then((response) => {
        response.data;
        console.log(response);
        setIpData(response.data);
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
    return (
      <div className="information-panel panel">
        <h1>Information</h1>
        {entries}
      </div>
    );
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
              <p>Risk Score:{"0" || ipData.data}</p>
            </div>
            <div className="block">
              <h3>Blacklists</h3>
              <p>Detection Rate:</p>
              <p>Total Detections:</p>
            </div>
          </div>
          <div className="half">
            <div className="block">
              <h3>Anonymity</h3>
              <p>Proxy:</p>
              <p>Web Proxy:</p>
              <p>Hosting:</p>
              <p>VPN:</p>
              <p>Tor Node:</p>
            </div>
            <div className="block">
              <h3>Information</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
