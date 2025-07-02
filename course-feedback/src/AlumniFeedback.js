import React, { useState, useEffect } from "react";
import axios from "axios";

function AlumniFeedback() {
  const [details, setDetails] = useState({
    alumniName: "",
    batch: "",
    email: ""
  });
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/questions", { params: { targetAudience: "alumni" } })
      .then(res => {
        if (res.data.length > 0) setQuestions(res.data[0].questions);
      });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    const payload = {
      targetAudience: "alumni",
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
      <h2>Alumni Feedback Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          style={inputStyle}
          placeholder="Alumni Name"
          value={details.alumniName}
          onChange={e => setDetails({ ...details, alumniName: e.target.value })}
        />
        <input
          style={inputStyle}
          placeholder="Batch"
          value={details.batch}
          onChange={e => setDetails({ ...details, batch: e.target.value })}
        />
        <input
          style={inputStyle}
          placeholder="Email"
          value={details.email}
          onChange={e => setDetails({ ...details, email: e.target.value })}
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

export default AlumniFeedback;
