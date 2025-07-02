const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  answer: { type: String, required: true }
});

const feedbackSchema = new mongoose.Schema({
  targetAudience: { type: String, enum: ['student', 'parent', 'alumni'], required: true },
  
  // For student, these fields will exist; for parent/alumni can be null
  academicYear: { type: String },
  year: { type: Number },
  semester: { type: String },
  subject: { type: String },
  
  details: mongoose.Schema.Types.Mixed,  // Name, email, phone, etc.
  responses: [answerSchema],
  
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
