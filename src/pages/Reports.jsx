import React from "react";
import Navbar from "../components/Navbar";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/reports.css";

export default function Reports() {
  return (
    <>
      <Navbar />

      <div className="body">
        <h1>Reports</h1>
        <div className="entries">
          <div className="entry">
            <p>12/12/1212</p>
            <p>this is label</p>
            <a>this is link</a>
            <p>banana</p>
            <FontAwesomeIcon icon={faTrashAlt} />
          </div>
          <div className="entry">
            <p>12/12/1212</p>
            <p>this is label</p>
            <a>this is link</a>
            <p>banana</p>
            <FontAwesomeIcon icon={faTrashAlt} />
          </div>
          <div className="entry">
            <p>12/12/1212</p>
            <p>this is label</p>
            <a>this is link</a>
            <p>banana</p>
            <FontAwesomeIcon icon={faTrashAlt} />
          </div>
          <div className="entry">
            <p>12/12/1212</p>
            <p>this is label</p>
            <a>this is link</a>
            <p>banana</p>
            <FontAwesomeIcon icon={faTrashAlt} />
          </div>
          <div className="entry">
            <p>12/12/1212</p>
            <p>this is label</p>
            <a>this is link</a>
            <p>banana</p>
            <FontAwesomeIcon icon={faTrashAlt} />
          </div>
          <div className="entry">
            <p>12/12/1212</p>
            <p>this is label</p>
            <a>this is link</a>
            <p>banana</p>
            <FontAwesomeIcon icon={faTrashAlt} />
          </div>
          <div className="entry">
            <p>12/12/1212</p>
            <p>this is label</p>
            <a>this is link</a>
            <p>banana</p>
            <FontAwesomeIcon icon={faTrashAlt} />
          </div>
          <div className="entry">
            <p>12/12/1212</p>
            <p>this is label</p>
            <a>this is link</a>
            <p>banana</p>
            <FontAwesomeIcon icon={faTrashAlt} />
          </div>
          <div className="entry">
            <p>12/12/1212</p>
            <p>this is label</p>
            <a>this is link</a>
            <p>banana</p>
            <FontAwesomeIcon icon={faTrashAlt} />
          </div>
          <div className="entry">
            <p>12/1212</p>
            <p>this is label</p>
            <a>this is link</a>
            <p>banana</p>
            <FontAwesomeIcon icon={faTrashAlt} />
          </div>
        </div>
      </div>
    </>
  );
}
