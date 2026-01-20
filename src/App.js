// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import StudentPage from "./pages/StudentPage";
import WardenPage from "./pages/WardenPage";
import "./App.css";

function App() {
  const [requests, setRequests] = useState([]);

  const addRequest = (request) => {
    setRequests([request, ...requests]); // Newest first
  };

  const updateStatus = (id, status) => {
    setRequests(
      requests.map((req) =>
        req.id === id ? { ...req, status } : req
      )
    );
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={
                <div className="welcome-page">
                  <h1>Welcome to AI Gate Pass System</h1>
                  <p>Select Student Portal to apply or Warden Portal to review requests</p>
                </div>
              } 
            />
            <Route 
              path="/student" 
              element={<StudentPage addRequest={addRequest} />} 
            />
            <Route 
              path="/warden" 
              element={<WardenPage requests={requests} updateStatus={updateStatus} />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;