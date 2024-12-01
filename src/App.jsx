import React, { useState, useEffect } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Sidebar from "./Components/sidebar/sidebar";
import { Route, Routes, useNavigate } from "react-router-dom";
import Add from "./Pages/Add/Add";
import List from "./Pages/List/List";
import Orders from "./Pages/Order/Orders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLogin from "./Components/Login/AdminLogin";

const App = () => {
  const url = "https://e-commerce-project-backend-psi.vercel.app";
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = () => {
    // Clear the token and reset authentication state
    localStorage.removeItem("adminToken");
    setIsAuthenticated(false);
    navigate("/"); // Redirect to login
  };

  return (
    <>
      <ToastContainer />
      {isAuthenticated ? (
        <div>
          <Navbar onLogout={handleLogout} />
          <hr />
          <div className="app-content">
            <Sidebar />
            <Routes>
              <Route path="/add" element={<Add url={url} />} />
              <Route path="/list" element={<List url={url} />} />
              <Route path="/orders" element={<Orders url={url} />} />
            </Routes>
          </div>
        </div>
      ) : (
        <AdminLogin setIsAuthenticated={setIsAuthenticated} />
      )}
    </>
  );
};

export default App;
