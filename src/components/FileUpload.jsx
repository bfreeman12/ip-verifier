import React, { useState, useEffect } from "react";
import { postIpAddresses } from "../functions/apifetch";
import Papa from "papaparse";
import "../styles/upload.css";

const allowedExtensions = ["csv"];

const FileUpload = () => {
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files.length) {
      const inputFile = e.target.files[0];
      const fileExtension = inputFile?.type.split("/")[1];
      if (!allowedExtensions.includes(fileExtension)) {
        return;
      }
      setFile(inputFile);
    }
  };

  const handleParse = (e) => {
    e.preventDefault();

    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          const dataArray = [];
          const valuesArray = [];

          results.data.map((rows) => {
            valuesArray.push(Object.values(rows));
          });

          valuesArray.map((value) => {
            value.map((val) => {
              dataArray.push(val);
            });
          });
          let uniqueData = [...new Set(dataArray)];

          setData(uniqueData);
        },
      });
    }
  };

  useEffect(() => {
    postIpAddresses(data);
  }, [data]);

  return (
    <div className="file-upload-container">
      <input type="file" name="file" id="file" accept=".csv" />
      <button onClick={handleParse}>Parse</button>
    </div>
  );
};

export default FileUpload;
