// src/components/StudentForm.jsx
import React, { useState } from "react";


function StudentForm({ addRequest }) {
  const [formData, setFormData] = useState({
    name: "",
    roomNo: "",
    outTime: "",
    inTime: "",
    reason: "",
    contact: ""
  });

  const getCurrentDateTime = () => {
    const now = new Date();
    // Format: YYYY-MM-DDTHH:mm (for datetime-local input)
    return now.toISOString().slice(0, 16);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get current date and time
    const now = new Date();
    const formattedDate = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    const newRequest = {
      id: Date.now(),
      ...formData,
      date: formattedDate,
      status: "Pending",
    };
    
    addRequest(newRequest);
    setFormData({
      name: "",
      roomNo: "",
      outTime: "",
      inTime: "",
      reason: "",
      contact: ""
    });
    alert("Gate Pass Submitted Successfully!");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="student-form-container">
      <div className="form-header">
        <h2>🎓 Gate Pass Application</h2>
        <p>Fill in the details to apply for a gate pass</p>
      </div>

      <form onSubmit={handleSubmit} className="gate-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="roomNo">Room Number *</label>
            <input
              id="roomNo"
              name="roomNo"
              type="text"
              placeholder="e.g., A-101"
              value={formData.roomNo}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="outTime">Out Time *</label>
            <input
              id="outTime"
              name="outTime"
              type="datetime-local"
              value={formData.outTime}
              onChange={handleChange}
              min={getCurrentDateTime()}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="inTime">Expected In Time *</label>
            <input
              id="inTime"
              name="inTime"
              type="datetime-local"
              value={formData.inTime}
              onChange={handleChange}
              min={formData.outTime || getCurrentDateTime()}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="contact">Contact Number *</label>
          <input
            id="contact"
            name="contact"
            type="tel"
            placeholder="Enter your contact number"
            value={formData.contact}
            onChange={handleChange}
            pattern="[0-9]{10}"
            title="Please enter a 10-digit phone number"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="reason">Reason for Going Out *</label>
          <textarea
            id="reason"
            name="reason"
            placeholder="Describe in detail why you need to go out..."
            value={formData.reason}
            onChange={handleChange}
            rows="4"
            required
          />
          <small className="hint">Tip: Mentioning specific reasons like "medical emergency" or "family function" helps in faster approval.</small>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            ✨ Submit Application
          </button>
          <button type="button" className="clear-btn" onClick={() => setFormData({
            name: "",
            roomNo: "",
            outTime: "",
            inTime: "",
            reason: "",
            contact: ""
          })}>
            Clear Form
          </button>
        </div>
      </form>
    </div>
  );
}

export default StudentForm;