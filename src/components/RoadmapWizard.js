import React, { useState } from 'react';
import '../styles/RoadmapWizard.css';
import axios from 'axios';
import { careerTemplates } from '../App';

const RoadmapWizard = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [userPreferences, setUserPreferences] = useState({
    careerGoal: '',
    technologies: [],
    timeCommitment: '',
    studySchedule: ''
  });

  const questions = [
    {
      title: "What is your career goal?",
      type: "select",
      options: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "Data Scientist", "UI/UX Designer"],
      field: "careerGoal"
    },
    {
      title: "Which technologies or domains are you interested in learning?",
      type: "multiselect",
      options: ["HTML", "CSS", "JavaScript", "Python", "React", "Node.js", "MongoDB", "SQL"],
      field: "technologies"
    },
    {
      title: "How much time can you commit to studying?",
      type: "select",
      options: ["3 months", "6 months", "1 year"],
      field: "timeCommitment"
    },
    {
      title: "How do you plan to structure your study schedule?",
      type: "select",
      options: ["Daily basis", "Weekly basis", "Monthly basis"],
      field: "studySchedule"
    }
  ];

  const handleInputChange = (field, value) => {
    setUserPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (step === questions.length - 1) {
      onComplete(userPreferences);
    } else {
      setStep(prev => prev + 1);
    }
  };

  const handleSaveToProfile = async () => {
    try {
      // Get the token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        alert('Please login to save to your profile');
        return;
      }

      const roadmapData = {
        title: userPreferences.careerGoal,
        description: '',
        steps: [],
        // Add any other relevant data you want to save
      };

      const response = await axios.post('http://localhost:5000/api/roadmaps', roadmapData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 201) {
        alert('Roadmap saved successfully!');
      }
    } catch (error) {
      console.error('Error saving roadmap:', error);
      alert('Failed to save roadmap. Please try again.');
    }
  };

  return (
    <div className="roadmap-wizard">
      {step === 0 && (
        <div className="welcome-message">
          <h2>Welcome! Let's design your personalized learning roadmap.</h2>
          <p>Answer a few quick questions, and we'll create a step-by-step plan tailored just for you!</p>
        </div>
      )}

      <div className="question-container">
        <h3>{questions[step].title}</h3>
        {questions[step].type === "select" && (
          <select
            value={userPreferences[questions[step].field]}
            onChange={(e) => handleInputChange(questions[step].field, e.target.value)}
          >
            <option value="">Select an option</option>
            {questions[step].options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        )}

        {questions[step].type === "multiselect" && (
          <div className="multiselect">
            {questions[step].options.map(option => (
              <label key={option}>
                <input
                  type="checkbox"
                  checked={userPreferences.technologies.includes(option)}
                  onChange={(e) => {
                    const newTechnologies = e.target.checked
                      ? [...userPreferences.technologies, option]
                      : userPreferences.technologies.filter(tech => tech !== option);
                    handleInputChange('technologies', newTechnologies);
                  }}
                />
                {option}
              </label>
            ))}
          </div>
        )}

        <button 
          onClick={handleNext}
          disabled={!userPreferences[questions[step].field]}
          className="next-button"
        >
          {step === questions.length - 1 ? 'Generate Roadmap' : 'Next'}
        </button>
        <button 
          className="save-button"
          onClick={handleSaveToProfile}
          disabled={!userPreferences.careerGoal}
        >
          Save to Profile
        </button>
      </div>
    </div>
  );
};

export default RoadmapWizard; 