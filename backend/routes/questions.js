const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// Add Question Set
router.post('/', async (req, res) => {
  const questionSet = new Question(req.body);
  await questionSet.save();
  res.json(questionSet);
});

// Get Questions (with filters)
router.get('/', async (req, res) => {
  const query = req.query;
  const questions = await Question.find(query);
  res.json(questions);
});

module.exports = router;
