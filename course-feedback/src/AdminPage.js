import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminPage() {
  const [academicYear, setAcademicYear] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [questions, setQuestions] = useState([{ text: "" }]);
  const [existing, setExisting] = useState([]);

  const academicYears = ["2019-23", "2020-24", "2021-25", "2022-26"];
  const years = [1, 2, 3, 4];
  const semesters = ["1st Sem", "2nd Sem"];
  const audiences = ["student", "parent", "alumni"];

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = () => {
    axios.get("http://localhost:5000/api/admin/questions")
      .then(res => setExisting(res.data))
      .catch(err => console.error(err));
  };

  const addQuestionField = () => {
    setQuestions([...questions, { text: "" }]);
  };

  const removeQuestionField = index => {
    const updated = [...questions];
    updated.splice(index, 1);
    setQuestions(updated);
  };

  const handleQuestionChange = (index, value) => {
    const updated = [...questions];
    updated[index].text = value;
    setQuestions(updated);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (questions.some(q => !q.text.trim())) {
      alert("Please fill all question fields");
      return;
    }
    const payload = {
      targetAudience,
      academicYear,
      year,
      semester,
      subject,
      questions
    };
    axios.post("http://localhost:5000/api/admin/questions", payload)
      .then(() => {
        alert("Questions saved successfully!");
        fetchQuestions();
        setQuestions([{ text: "" }]);
        setAcademicYear("");
        setYear("");
        setSemester("");
        setSubject("");
        setTargetAudience("");
      })
      .catch(err => console.error(err));
  };

  const handleDelete = id => {
    if (!window.confirm("Delete this question set?")) return;
    axios.delete(`http://localhost:5000/api/admin/questions/${id}`)
      .then(() => {
        alert("Deleted!");
        fetchQuestions();
      })
      .catch(err => console.error(err));
  };

  const selectStyle = { margin: "5px", padding: "5px" };
  const inputStyle = { margin: "5px", padding: "5px", width: "300px" };

  return (
    <div>
      <h2>Admin Page - Manage Feedback Questions</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div>
          <select style={selectStyle} value={targetAudience} onChange={e => setTargetAudience(e.target.value)} required>
            <option value="">Select Audience</option>
            {audiences.map(a => <option key={a}>{a}</option>)}
          </select>
          <select style={selectStyle} value={academicYear} onChange={e => setAcademicYear(e.target.value)}>
            <option value="">Academic Year</option>
            {academicYears.map(y => <option key={y}>{y}</option>)}
          </select>
          <select style={selectStyle} value={year} onChange={e => setYear(e.target.value)}>
            <option value="">Year</option>
            {years.map(y => <option key={y}>{y}</option>)}
          </select>
          <select style={selectStyle} value={semester} onChange={e => setSemester(e.target.value)}>
            <option value="">Semester</option>
            {semesters.map(s => <option key={s}>{s}</option>)}
          </select>
          <input
            style={inputStyle}
            placeholder="Subject"
            value={subject}
            onChange={e => setSubject(e.target.value)}
          />
        </div>
        <h4>Feedback Questions</h4>
        {questions.map((q, idx) => (
          <div key={idx}>
            <input
              style={inputStyle}
              placeholder={`Question ${idx + 1}`}
              value={q.text}
              onChange={e => handleQuestionChange(idx, e.target.value)}
              required
            />
            <button type="button" onClick={() => removeQuestionField(idx)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={addQuestionField}>Add Question</button><br />
        <button type="submit" style={{ marginTop: "10px", padding: "6px 12px" }}>Save Questions</button>
      </form>

      <h3>Existing Question Sets</h3>
      {existing.map(q => (
        <div key={q._id} style={{ border: "1px solid #ccc", margin: "5px", padding: "10px" }}>
          <strong>{q.targetAudience.toUpperCase()}</strong><br/>
          {q.academicYear && `Academic: ${q.academicYear}, Year: ${q.year}, Semester: ${q.semester}, Subject: ${q.subject}`}
          <ul>
            {q.questions.map((qq, i) => <li key={i}>{qq.text}</li>)}
          </ul>
          <button onClick={() => handleDelete(q._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default AdminPage;
