import React, { useState, useEffect } from "react";
import { postIpAddresses } from "../functions/apifetch";
import Papa from "papaparse";

const allowedExtensions = ["csv"];

const FileUpload = () => {
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {

    if (e.target.files.length) {
      const inputFile = e.target.files[0];
      const fileExtension = inputFile?.type.split("/")[1];
      if (!allowedExtensions.includes(fileExtension)) {
        setError("Please input a csv file");
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
    <div>
      <label>
        Enter CSV File
      </label>
      <input
        onChange={handleFileChange}
        id="csvInput"
        name="file"
        type="File"
        accept=".csv"
      />
      <div>
        <button onClick={handleParse}>Parse</button>
      </div>
      <textarea value={data}></textarea>
    </div>
  );
};

export default FileUpload;
