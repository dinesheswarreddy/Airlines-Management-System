const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

const semesterSchema = new mongoose.Schema({
  semester: { type: String, required: true },
  subjects: [subjectSchema]
});

const yearSchema = new mongoose.Schema({
  year: { type: Number, required: true },
  semesters: [semesterSchema]
});

const academicDataSchema = new mongoose.Schema({
  academicYear: { type: String, required: true },
  years: [yearSchema]
});

module.exports = mongoose.model('AcademicData', academicDataSchema);
