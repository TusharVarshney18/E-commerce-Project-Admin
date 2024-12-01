import React from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";

const Navbar = ({ onLogout }) => {
  return (
    <div className="navbar">
      <img className="logo" src={assets.logo} alt="Logo" />
      <div className="navbar-right">
        <img className="profile" src={assets.profile_image} alt="Profile" />
        <button onClick={onLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
