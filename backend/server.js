const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use('/api/academic-data', require('./routes/academicData'));
app.use('/api/questions', require('./routes/questions'));
app.use('/api/feedback', require('./routes/feedback'));
// app.use('/api/questions', require('./routes/questionRoutes'));

app.use('/api/admin/questions', require('./routes/questionRoutes'));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
