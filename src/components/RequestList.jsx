// src/components/RequestList.jsx
import React from "react";
import { getAISuggestion } from "./AIHelper";

function RequestList({ requests, updateStatus }) {
  // Remove the unused import reference or use it
  // If you want to use formatDistanceToNow, uncomment below:
  // const formatTime = (timestamp) => {
  //   return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  // };

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved": return "status-approved";
      case "Rejected": return "status-rejected";
      case "Pending": return "status-pending";
      default: return "";
    }
  };

  const getSuggestionColor = (suggestion) => {
    switch (suggestion) {
      case "Approve": return "suggestion-approve";
      case "Reject": return "suggestion-reject";
      default: return "suggestion-review";
    }
  };

  return (
    <div className="warden-panel">
      <div className="panel-header">
        <h2>👮‍♂️ Warden Control Panel</h2>
        <div className="stats">
          <span className="stat-total">Total: {requests.length}</span>
          <span className="stat-pending">Pending: {requests.filter(r => r.status === "Pending").length}</span>
          <span className="stat-approved">Approved: {requests.filter(r => r.status === "Approved").length}</span>
        </div>
      </div>

      {requests.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h3>No Gate Pass Requests</h3>
          <p>Waiting for students to submit applications...</p>
        </div>
      ) : (
        <div className="requests-grid">
          {requests.map((req) => {
            const aiSuggestion = getAISuggestion(req.reason);
            return (
              <div key={req.id} className="request-card">
                <div className="card-header">
                  <div className="student-info">
                    <h3>{req.name}</h3>
                    <span className="room-badge">Room: {req.roomNo}</span>
                  </div>
                  <div className={`status-badge ${getStatusColor(req.status)}`}>
                    {req.status}
                  </div>
                </div>

                <div className="card-content">
                  <div className="info-row">
                    <span className="info-label">📞 Contact:</span>
                    <span className="info-value">{req.contact}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">🕒 Out Time:</span>
                    <span className="info-value">{req.outTime}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">🔙 In Time:</span>
                    <span className="info-value">{req.inTime}</span>
                  </div>

                  <div className="reason-section">
                    <h4>Reason:</h4>
                    <p className="reason-text">{req.reason}</p>
                  </div>

                  <div className="ai-section">
                    <h4>🤖 AI Analysis:</h4>
                    <div className="ai-suggestion">
                      <span className={`suggestion-badge ${getSuggestionColor(aiSuggestion.suggestion)}`}>
                        {aiSuggestion.suggestion}
                      </span>
                      <span className="confidence">({aiSuggestion.confidence} Confidence)</span>
                    </div>
                    <p className="ai-reason">{aiSuggestion.reason}</p>
                  </div>
                </div>

                <div className="card-actions">
                  <button 
                    onClick={() => updateStatus(req.id, "Approved")}
                    className="action-btn approve-btn"
                    disabled={req.status !== "Pending"}
                  >
                    ✅ Approve
                  </button>
                  <button 
                    onClick={() => updateStatus(req.id, "Rejected")}
                    className="action-btn reject-btn"
                    disabled={req.status !== "Pending"}
                  >
                    ❌ Reject
                  </button>
                  <button 
                    onClick={() => updateStatus(req.id, "Pending")}
                    className="action-btn reset-btn"
                    disabled={req.status === "Pending"}
                  >
                    ↩️ Reset
                  </button>
                </div>

                <div className="card-footer">
                  <span className="timestamp">Applied: {req.date}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default RequestList;