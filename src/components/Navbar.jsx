// src/components/Navbar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <div className="logo">🎯</div>
        <h1>AI Gate Pass System</h1>
      </div>
      <div className="nav-links">
        <Link 
          to="/" 
          className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
        >
          🏠 Home
        </Link>
        <Link 
          to="/student" 
          className={`nav-link ${location.pathname === '/student' ? 'active' : ''}`}
        >
          👨‍🎓 Student Portal
        </Link>
        <Link 
          to="/warden" 
          className={`nav-link ${location.pathname === '/warden' ? 'active' : ''}`}
        >
          👮‍♂️ Warden Portal
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;