const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true }
});

const feedbackQuestionSchema = new mongoose.Schema({
  targetAudience: {
    type: String,
    enum: ["student", "parent", "alumni"],
    required: true
  },
  academicYear: { type: String },  // Required for student, optional for parent/alumni
  year: { type: Number },
  semester: { type: String },
  subject: { type: String }, // Subject the questions belong to
  questions: [questionSchema]
}, { timestamps: true });

module.exports = mongoose.model('FeedbackQuestion', feedbackQuestionSchema);
