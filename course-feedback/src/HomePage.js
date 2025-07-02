import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const buttonStyle = {
    margin: "10px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px"
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Course Feedback System</h1>
      <Link to="/student-feedback">
        <button style={buttonStyle}>Student Feedback</button>
      </Link>
      <Link to="/parent-feedback">
        <button style={buttonStyle}>Parent Feedback</button>
      </Link>
      <Link to="/alumni-feedback">
        <button style={buttonStyle}>Alumni Feedback</button>
      </Link>
      <Link to="/admin">
        <button style={buttonStyle}>Admin</button>
      </Link>
    </div>
  );
}

export default HomePage;
