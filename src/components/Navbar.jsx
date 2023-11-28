import React from "react";
import { Link, Outlet } from "react-router-dom";
import AirForce from "../media/AirForceLogo.png";
import "../styles/navbar.css";
export default function Navbar() {
  return (
    <>
      <nav className="navbar">
        <div className="header-image-container">
          <img className="logo" src={AirForce} alt="US Air Force Logo" />
        </div>
        <h2 className="header">IP Verification Tool</h2>
        <div className="links">
          <Link className="link" to="/">
            Home
          </Link>
          <Link className="link" to="/reports">
            Reports
          </Link>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
