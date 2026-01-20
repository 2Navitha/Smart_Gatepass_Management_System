import React from "react";
import StudentForm from "../components/StudentForm";

function StudentPage({ addRequest }) {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Student Portal</h1>
        <p>Apply for gate pass to leave the hostel premises</p>
      </div>
      <StudentForm addRequest={addRequest} />
    </div>
  );
}

export default StudentPage;