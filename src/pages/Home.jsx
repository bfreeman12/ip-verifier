import React, { useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FileUpload from "../components/FileUpload";
import "../styles/home.css";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="body">
        <div className="body-header">
          <h5>Please upload a file to get started</h5>
        </div>
        <div className="file-uploader">
          <FileUpload />
        </div>
      </div>
      <Footer />
    </>
  );
}
