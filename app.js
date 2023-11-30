import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    professionalSummary: '',
    education: '',
    skills: '',
    careerObjective: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Perform actions with the form data (e.g., send to the server)
      console.log('Form data submitted:', formData);
    }
  };

  const validateForm = () => {
    for (const key in formData) {
      if (formData[key].trim() === '') {
        alert('All fields are required');
        return false;
      }
    }
    return true;
  };

  return (
    <div>
      <header>
        <h1>Resume Builder</h1>
      </header>

      <form onSubmit={handleSubmit}>
        <label htmlFor="professionalSummary">Professional Summary</label>
        <textarea
          id="professionalSummary"
          name="professionalSummary"
          value={formData.professionalSummary}
          onChange={handleChange}
          rows="4"
          placeholder="Enter your professional summary..."
        ></textarea>

        <label htmlFor="education">Education</label>
        <input
          type="text"
          id="education"
          name="education"
          value={formData.education}
          onChange={handleChange}
          placeholder="Enter your education qualifications..."
        />

        <label htmlFor="skills">Skills</label>
        <textarea
          id="skills"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          rows="4"
          placeholder="Enter your academic and non-academic skills..."
        ></textarea>

        <label htmlFor="careerObjective">Career Objective</label>
        <textarea
          id="careerObjective"
          name="careerObjective"
          value={formData.careerObjective}
          onChange={handleChange}
          rows="4"
          placeholder="Enter your career objective..."
        ></textarea>

        <button type="submit">Generate Resume</button>
      </form>
    </div>
  );
}

export default App;
