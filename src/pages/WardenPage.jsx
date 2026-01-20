import React from "react";
import RequestList from "../components/RequestList";

function WardenPage({ requests, updateStatus }) {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Warden Portal</h1>
        <p>Review and manage gate pass requests with AI assistance</p>
      </div>
      <RequestList requests={requests} updateStatus={updateStatus} />
    </div>
  );
}

export default WardenPage;