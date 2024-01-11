import FileUpload from "../components/FileUpload";
import React from "react";

export default function UploadWidget({ remainingCredits, remainingQueries }) {
  return (
    <div className="upload">
      <div className="body-header">
        <p>Please upload a file to get started</p>
      </div>
      <div>
        <FileUpload />
      </div>
      <div className="upload-subtitle">
        <p>
          you have <b>{remainingCredits}</b> credits left,
        </p>
        <p>
          or approximately <b>{remainingQueries}</b> queries.
        </p>
      </div>
    </div>
  );
}
