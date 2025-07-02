import React, { useState, useEffect } from "react";
import axios from "axios";

function StudentFeedback() {
  const [academicYear, setAcademicYear] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [details, setDetails] = useState({
    name: "",
    rollNumber: "",
    department: ""
  });

  const academicYears = ["2019-23", "2020-24", "2021-25", "2022-26"];
  const years = [1, 2, 3, 4];
  const semesters = ["1st Sem", "2nd Sem"];

  useEffect(() => {
    if (academicYear && year && semester) {
      axios
        .get("http://localhost:5000/api/academic-data")
        .then(res => {
          const academic = res.data.find(a => a.academicYear === academicYear);
          if (academic) {
            const yr = academic.years.find(y => y.year === Number(year));
            if (yr) {
              const sem = yr.semesters.find(s => s.semester === semester);
              if (sem) setSubjects(sem.subjects);
            }
          }
        })
        .catch(err => console.log(err));
    }
  }, [academicYear, year, semester]);

  useEffect(() => {
    if (subject) {
      axios
        .get("http://localhost:5000/api/questions", {
          params: {
            targetAudience: "student",
            academicYear,
            year,
            semester,
            subject
          }
        })
        .then(res => {
          if (res.data.length > 0) {
            setQuestions(res.data[0].questions);
          }
        })
        .catch(err => console.log(err));
    }
  }, [subject]);

  const handleSubmit = e => {
    e.preventDefault();
    const payload = {
      targetAudience: "student",
      details: {
        ...details,
        academicYear,
        year,
        semester,
        subject
      },
      responses: questions.map(q => ({
        questionText: q.text,
        answer: answers[q._id] || ""
      }))
    };
    axios
      .post("http://localhost:5000/api/feedback", payload)
      .then(() => alert("Feedback submitted successfully!"))
      .catch(err => console.log(err));
  };

  const inputStyle = { margin: "5px", padding: "5px", width: "250px" };

  return (
    <div>
      <h2>Student Feedback Form</h2>
      <form onSubmit={handleSubmit}>
        <h4>Student Details</h4>
        <input
          style={inputStyle}
          placeholder="Name"
          value={details.name}
          onChange={e => setDetails({ ...details, name: e.target.value })}
        />
        <input
          style={inputStyle}
          placeholder="Roll Number"
          value={details.rollNumber}
          onChange={e => setDetails({ ...details, rollNumber: e.target.value })}
        />
        <input
          style={inputStyle}
          placeholder="Department"
          value={details.department}
          onChange={e => setDetails({ ...details, department: e.target.value })}
        />

        <h4>Course Selection</h4>
        <select style={inputStyle} value={academicYear} onChange={e => setAcademicYear(e.target.value)}>
          <option value="">Select Academic Year</option>
          {academicYears.map(y => <option key={y}>{y}</option>)}
        </select>
        <select style={inputStyle} value={year} onChange={e => setYear(e.target.value)}>
          <option value="">Select Year</option>
          {years.map(y => <option key={y}>{y}</option>)}
        </select>
        <select style={inputStyle} value={semester} onChange={e => setSemester(e.target.value)}>
          <option value="">Select Semester</option>
          {semesters.map(s => <option key={s}>{s}</option>)}
        </select>
        <select style={inputStyle} value={subject} onChange={e => setSubject(e.target.value)}>
          <option value="">Select Subject</option>
          {subjects.map(s => <option key={s.name}>{s.name}</option>)}
        </select>

        {questions.length > 0 && (
          <>
            <h4>Feedback Questions</h4>
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
          </>
        )}

        <button type="submit" style={{ marginTop: "10px", padding: "8px 16px" }}>
          Submit Feedback
        </button>
      </form>
    </div>
  );
}

export default StudentFeedback;
