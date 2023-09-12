import React, { useState, useEffect } from "react";
import { postIpAddresses } from "../functions/apifetch";
import "../styles/upload.css";

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
    postIpAddresses(data);
  }, [data]);

  return (
    <div className="file-upload-container">
      <input
        type="file"
        name="file"
        id="file"
        accept=".txt"
        onChange={handleFileChange}
      />
      <button onClick={handleParse}>Parse</button>
    </div>
  );
};

export default FileUpload;
