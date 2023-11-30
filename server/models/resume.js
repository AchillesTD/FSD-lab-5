// server/models/Resume.js
const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  professionalSummary: String,
  education: String,
  experienceInternships: String,
  skills: [String],
  careerObjective: String,
  dob: String,
});

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;
