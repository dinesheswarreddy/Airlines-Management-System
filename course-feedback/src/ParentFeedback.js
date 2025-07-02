import React, { useState, useEffect } from "react";
import axios from "axios";

function ParentFeedback() {
  const [details, setDetails] = useState({
    parentName: "",
    studentRollNumber: "",
    relationship: ""
  });
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/questions", { params: { targetAudience: "parent" } })
      .then(res => {
        if (res.data.length > 0) setQuestions(res.data[0].questions);
      });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    const payload = {
      targetAudience: "parent",
      details,
      responses: questions.map(q => ({
        questionText: q.text,
        answer: answers[q._id] || ""
      }))
    };
    axios.post("http://localhost:5000/api/feedback", payload).then(() => alert("Feedback submitted!"));
  };

  const inputStyle = { margin: "5px", padding: "5px", width: "250px" };

  return (
    <div>
      <h2>Parent Feedback Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          style={inputStyle}
          placeholder="Parent Name"
          value={details.parentName}
          onChange={e => setDetails({ ...details, parentName: e.target.value })}
        />
        <input
          style={inputStyle}
          placeholder="Student Roll Number"
          value={details.studentRollNumber}
          onChange={e => setDetails({ ...details, studentRollNumber: e.target.value })}
        />
        <input
          style={inputStyle}
          placeholder="Relationship"
          value={details.relationship}
          onChange={e => setDetails({ ...details, relationship: e.target.value })}
        />

        {questions.map(q => (
          <div key={q._id}>
            <label>{q.text}</label><br/>
            <input
              style={{ ...inputStyle, width: "400px" }}
              value={answers[q._id] || ""}
              onChange={e => setAnswers({ ...answers, [q._id]: e.target.value })}
            />
          </div>
        ))}
        <button type="submit" style={{ marginTop: "10px", padding: "8px 16px" }}>
          Submit Feedback
        </button>
      </form>
    </div>
  );
}

export default ParentFeedback;
