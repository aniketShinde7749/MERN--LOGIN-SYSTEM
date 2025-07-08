import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://mern-login-system.onrender.com/api/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);

      Swal.fire("Success", "Login successful", "success");
      onLoginSuccess();
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Login failed", "error");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
