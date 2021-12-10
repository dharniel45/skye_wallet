import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";


function Navbar() {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container">
        <Link to={"/tutorials"} className="navbar-brand">
          Skye Wallet
        </Link>
        <div className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link to={"/tutorials"} className="nav-link">
              Users
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Create Profile
            </Link>
          </li>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
