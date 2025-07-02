const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true }
});

const questionSetSchema = new mongoose.Schema({
  targetAudience: { type: String, enum: ['student', 'parent', 'alumni'], required: true },
  academicYear: { type: String },
  year: { type: Number },
  semester: { type: String },
  subject: { type: String },
  questions: [questionSchema]
});

module.exports = mongoose.model('Question', questionSetSchema);
