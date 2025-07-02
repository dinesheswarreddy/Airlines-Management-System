const express = require('express');
const router = express.Router();
const FeedbackQuestion = require('../models/FeedbackQuestion');
const AcademicData = require('../models/AcademicData');

// Create Feedback Questions & Ensure AcademicData is updated
router.post('/', async (req, res) => {
  const { targetAudience, academicYear, year, semester, subject, questions } = req.body;

  try {
    // 1️⃣ Create the FeedbackQuestion
    const newQuestion = new FeedbackQuestion({
      targetAudience,
      academicYear,
      year,
      semester,
      subject,
      questions
    });

    await newQuestion.save();

    // 2️⃣ Update AcademicData: insert subject if not exists
    await AcademicData.findOneAndUpdate(
      { academicYear },
      {
        $setOnInsert: { academicYear },
        $addToSet: {
          "years.$[y].semesters.$[s].subjects": { name: subject }
        }
      },
      {
        upsert: true,
        arrayFilters: [
          { "y.year": year },
          { "s.semester": semester }
        ],
        new: true
      }
    ).then(async (result) => {
      // If no matching year/semester found, we need to handle nested arrays manually
      if (!result) {
        // Find the doc again
        let doc = await AcademicData.findOne({ academicYear });

        if (!doc) {
          // If no academicYear document exists, create fresh
          const newAcademic = new AcademicData({
            academicYear,
            years: [
              {
                year,
                semesters: [
                  {
                    semester,
                    subjects: [{ name: subject }]
                  }
                ]
              }
            ]
          });
          await newAcademic.save();
        } else {
          // If academicYear exists but missing year/semester
          let yearBlock = doc.years.find(y => y.year === year);
          if (!yearBlock) {
            // Add year with semester + subject
            doc.years.push({
              year,
              semesters: [
                {
                  semester,
                  subjects: [{ name: subject }]
                }
              ]
            });
          } else {
            let semBlock = yearBlock.semesters.find(s => s.semester === semester);
            if (!semBlock) {
              // Add semester with subject
              yearBlock.semesters.push({
                semester,
                subjects: [{ name: subject }]
              });
            } else {
              // Finally, add subject if needed
              if (!semBlock.subjects.find(sub => sub.name === subject)) {
                semBlock.subjects.push({ name: subject });
              }
            }
          }
          await doc.save();
        }
      }
    });

    res.status(201).json(newQuestion);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
