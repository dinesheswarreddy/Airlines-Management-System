import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./HomePage";
import StudentFeedback from "./StudentFeedback";
import ParentFeedback from "./ParentFeedback";
import AlumniFeedback from "./AlumniFeedback";
import AdminPage from "./AdminPage";

function App() {
  return (
    <Router>
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/student-feedback" element={<StudentFeedback />} />
          <Route path="/parent-feedback" element={<ParentFeedback />} />
          <Route path="/alumni-feedback" element={<AlumniFeedback />} />
          <Route path="/admin" element={<AdminPage />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
