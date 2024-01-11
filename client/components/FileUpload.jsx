import React, { useState, useEffect } from "react";
// import { postIpAddresses } from "../functions/apifetch";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import "../styles/upload.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const FileUpload = () => {
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files.length) {
      const inputFile = e.target.files[0];
      setFile(inputFile);
    }
  };

  const handleParse = async () => {
    if (!file) {
      alert("Please select a file to parse.");
      return;
    }

    const reader = new FileReader();

    reader.onload = async (e) => {
      const text = e.target.result;
      const lines = text.split("\n");

      const parsedData = lines.map((line) => {
        return line.trim();
      });
      setData(parsedData);
    };
    reader.readAsText(file);
  };

  function validateIPs(ipList) {
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

    let validIPs = [];

    for (let ip of ipList) {
      let isPublic = true;
      let isIPV4 = true;

      if (ip.split("")[0] == "f") isIPV4 = false;

      if (ipRegexes.some((regex) => regex.test(ip))) {
        isPublic = false;
      }

      if (isPublic && isIPV4) validIPs.push(ip);
    }

    return validIPs;
  }

  async function postIpAddresses(ipAddresses) {
    return axios
      .post("http://172.16.220.218:3200/handleFileUpload", {
        ips: ipAddresses,
      })
      .then((response) => response.data)
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    if (data.length != 0) {
      postIpAddresses(validateIPs(data));
    } else {
      console.error("no data");
    }
  }, [data]);

  return (
    <div className="file-upload-container">
      <label>
        <FontAwesomeIcon icon={faUpload} />
        Please upload a file
        <input
          type="file"
          name="file"
          id="file"
          accept=".txt"
          onChange={handleFileChange}
        />
      </label>
      <button onClick={handleParse}>Parse</button>
    </div>
  );
};

export default FileUpload;
