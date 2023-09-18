import React, { useState } from "react";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/reports.css";

const Reports = () => {
  const [data, setData] = useState({
    0: {
      date: "12/12/1212",
      label: "this is a label",
      link: "this is a link",
      banana: "banana",
      threat:'low'
    },
    1: {
      date: "12/12/1212",
      label: "this is a label",
      link: "this is a link",
      banana: "banana",
      threat:'low'
    },
    2: {
      date: "12/12/1212",
      label: "this is a label",
      link: "this is a link",
      banana: "banana",
      threat:'low'
    },
    3: {
      date: "12/12/1212",
      label: "this is a label",
      link: "this is a link",
      banana: "banana",
      threat:'low'
    },
    4: {
      date: "12/12/1212",
      label: "this is a label",
      link: "this is a link",
      banana: "banasdadana",
      threat:'high'
    },
    5: {
      date: "12/12/1212",
      label: "this is a label",
      link: "this is a link",
      banana: "banana",
      threat:'low'
    },
  });

  const removeElement = (e) => {
    e.preventDefault();
    const targetIndex = e.target.id;

    const newData = { ...data };
    delete newData[targetIndex];

    setData(newData);
  };

  return (
    <div className="entries">
      {Object.keys(data).map((key, index) => {
        const entry = data[key];
        return (
          <div className="entry" key={index}>
            <p>{entry.date}</p>
            <p>{entry.label}</p>
            <p>{entry.link}</p>
            <p>{entry.banana}</p>
            <p>{entry.threat}</p>

            <button id={key} onClick={(e) => removeElement(e)}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
export default Reports;
