const express = require('express');
const router = express.Router();
const AcademicData = require('../models/AcademicData');

// Add Academic Data
router.post('/', async (req, res) => {
  try {
    const data = new AcademicData(req.body);
    await data.save();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Academic Data
router.get('/', async (req, res) => {
  const data = await AcademicData.find();
  res.json(data);
});

module.exports = router;
