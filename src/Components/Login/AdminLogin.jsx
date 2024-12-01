import React, { useState } from "react";
import "./AdminLogin.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const AdminLogin = ({ setIsAuthenticated }) => {
  const url =
    "https://e-commerce-project-backend-psi.vercel.app/api/user/admin"; // Admin login endpoint

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();

    try {
      // Send login request to the admin endpoint
      const response = await axios.post(url, data);

      if (response.data.success) {
        // Store token and set authentication state
        localStorage.setItem("adminToken", response.data.token);
        setIsAuthenticated(true); // Notify App.jsx about successful login
        toast.success("Login successful!");
      } else {
        toast.error(response.data.message); // Show error message
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>Admin Login</h2>
          <img
            onClick={() => setIsAuthenticated(false)} // Close login popup
            src={assets.order_icon}
            alt="Close"
          />
        </div>

        <div className="login-popup-inputs">
          <input
            type="email"
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            placeholder="Enter your Admin Email"
            required
          />
          <input
            type="password"
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            placeholder="Enter your Admin Password"
            required
          />
        </div>
        <button type="submit" className="login-popup-submit-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
