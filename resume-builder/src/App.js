// src/App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  const educationSuggestions = [
    'HSC',
    'SSC',
    'CBSE 10TH',
    'CBSE 12TH',
    'BTech',
    'BBA',
    'BPharmacy',
    'MBA',
    'Others....',
  ];

  const predefinedSkills = [
    'JavaScript',
    'React',
    'HTML',
    'CSS',
    'Python',
    'Java',
    'Node.js',
    'Copywriting',
    'Proofreading',
    'Videoediting',
    'Photoshop',
    'C++',
    'Freelancer',
    // Add more skills as needed
  ];

  const [formData, setFormData] = useState({
    professionalSummary: '',
    education: '',
    experienceInternships: '',
    skills: [], // Using an array to store multiple skills
    careerObjective: '',
    dob: '',
    skillInputError: '', // Track errors for skill input
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'skillsSelect') {
      // Check if the skill is already selected
      if (formData.skills.includes(value)) {
        setFormData({
          ...formData,
          skillInputError: 'Skill already selected',
        });
      } else {
        // Add the selected skill to the array
        setFormData({
          ...formData,
          skills: [...formData.skills, value],
          skillInputError: '', // Clear skill input error
        });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = [...formData.skills];
    updatedSkills.splice(index, 1);
    setFormData({
      ...formData,
      skills: updatedSkills,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Send a POST request to your backend
        const response = await fetch('http://localhost:5000/resumes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          console.log('Resume submitted successfully');
          // Display a success message
          alert('Resume generated successfully!');
          // Optionally, you can reset the form or perform other actions
          setFormData({
            professionalSummary: '',
            education: '',
            experienceInternships: '',
            skills: [],
            careerObjective: '',
            dob: '',
            skillInputError: '',
          });
        } else {
          console.error('Error submitting resume:', response.statusText);
          // Display an error message
          alert('Error generating resume. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error.message);
        // Display an error message
        alert('Error generating resume. Please try again.');
      }
    }
  };

  const validateForm = () => {
    const requiredFields = ['professionalSummary', 'education', 'experienceInternships', 'skills', 'careerObjective', 'dob'];

    for (const key of requiredFields) {
      if (key === 'skills' && formData[key].length === 0) {
        alert('At least one skill is required');
        return false;
      } else if (key !== 'skills' && formData[key].trim() === '') {
        alert('All fields are required');
        return false;
      }
    }

    const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dobRegex.test(formData.dob)) {
      alert('Invalid Date of Birth format. Please use YYYY-MM-DD.');
      return false;
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

        <label htmlFor="education">Highest Education</label>
        <input
          list="educationSuggestions"
          type="text"
          id="education"
          name="education"
          value={formData.education}
          onChange={handleChange}
          placeholder="Enter your education qualifications..."
        />
        <datalist id="educationSuggestions">
          {educationSuggestions.map((suggestion, index) => (
            <option key={index} value={suggestion} />
          ))}
        </datalist>

        <label htmlFor="experienceInternships">Experience and Internships</label>
        <textarea
          id="experienceInternships"
          name="experienceInternships"
          value={formData.experienceInternships}
          onChange={handleChange}
          rows="4"
          placeholder="Enter your experience and internships..."
        ></textarea>

        <label htmlFor="skills">Skills</label>
        <div>
          <select
            id="skillsSelect"
            name="skillsSelect"
            onChange={handleChange}
            value={''} // Default value to an empty string
          >
            <option value="" disabled>
              Select a skill
            </option>
            {predefinedSkills.map((skill, index) => (
              <option key={index} value={skill}>
                {skill}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => {
              const selectedSkill = document.getElementById('skillsSelect').value;
              if (selectedSkill) {
                if (!formData.skills.includes(selectedSkill)) {
                  setFormData({
                    ...formData,
                    skills: [...formData.skills, selectedSkill],
                    skillInputError: '', // Clear skill input error
                  });
                } else {
                  setFormData({
                    ...formData,
                    skillInputError: 'Skill already selected',
                  });
                }
              } else {
                setFormData({
                  ...formData,
                  skillInputError: 'Select a skill to add',
                });
              }
            }}
          >
            Add Skill
          </button>
        </div>

        {formData.skills.length > 0 && (
          <div>
            <label>Selected Skills:</label>
            <ul>
              {formData.skills.map((skill, index) => (
                <li key={index}>
                  {skill}{' '}
                  <span
                    style={{ cursor: 'pointer', color: 'red' }}
                    onClick={() => handleRemoveSkill(index)}
                  >
                    Remove
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {formData.skillInputError && (
          <p className="error-message">{formData.skillInputError}</p>
        )}

        <label htmlFor="careerObjective">Career Objective</label>
        <textarea
          id="careerObjective"
          name="careerObjective"
          value={formData.careerObjective}
          onChange={handleChange}
          rows="4"
          placeholder="Enter your career objective..."
        ></textarea>

        <label htmlFor="dob">Date of Birth</label>
        <input
          type="date"
          id="dob"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
        />

        <button type="submit">Generate Resume</button>
      </form>
    </div>
  );
}

export default App;
