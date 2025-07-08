import React, { useState } from "react";
import Login from "./login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import "./App.css";

function App() {
  const [page, setPage] = useState(localStorage.getItem("token") ? "dashboard" : "login");

  const handleLogout = () => {
    localStorage.removeItem("token");
    setPage("login");
  };

  return (
    <div className="App">
      {page === "login" && <Login onLoginSuccess={() => setPage("dashboard")} />}
      {page === "register" && <Register />}
      {page === "dashboard" && <Dashboard onLogout={handleLogout} />}

      {page !== "dashboard" && (
        <p style={{ textAlign: "center" }}>
          {page === "login" ? "Don't have an account?" : "Already have an account?"}
          <button onClick={() => setPage(page === "login" ? "register" : "login")}>
            {page === "login" ? " Register" : " Login"}
          </button>
        </p>
      )}
    </div>
  );
}

export default App;
