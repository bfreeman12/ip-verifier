import React, { useState, useEffect } from "react";
import { postIpAddresses } from "../functions/apifetch";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import "../styles/upload.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

  useEffect(() => {
    if (data.length != 0) {
      postIpAddresses(data);
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
