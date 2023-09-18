import React from "react";
import Navbar from "../components/Navbar";
import Reports from "../components/Reports";
import "../styles/reports-page.css";

export default function ReportPage() {
  return (
    <>
      <Navbar />
      <div className="body">
        <h2>Reports</h2>
        <Reports />
      </div>
    </>
  );
}
