import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Dashboard({ onLogout }) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("https://mern-login-system.onrender.com/api/auth/dashboard"
      , {
        headers: { Authorization: token },
      })
      .then((res) => setMessage(res.data.message))
      .catch((err) => {
        Swal.fire("Session Expired", "Logging you out...", "warning");
        setTimeout(onLogout, 3000);
      });
  }, [onLogout]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    Swal.fire("Logged Out", "You have been logged out.", "success");
    onLogout();
  };

  return (
    <div className="login-container">
      <h2>Dashboard</h2>
      <p>{message}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
