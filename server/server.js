// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Resume = require('./models/resume');

const app = express();
const PORT = process.env.PORT || 5000;

// Replace the placeholder values in the connection string
const mongoDBConnectionString = 'mongodb+srv://tanmay:tanmay@resume.294anwz.mongodb.net/';

mongoose.connect(mongoDBConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Confirm connection to MongoDB Atlas
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB Atlas');
});

app.use(express.json());
app.use(cors());

// Create a new resume
app.post('/resumes', async (req, res) => {
  try {
    const newResume = new Resume(req.body);
    await newResume.save();
    res.json(newResume);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
