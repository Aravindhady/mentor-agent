import React from 'react';

const Home = () => {
  return (
    <div className="home">
      <div className="hero">
        <h1>Design Your Career Path</h1>
        <p>Create a personalized roadmap for your professional journey</p>
      </div>
      
      <div className="features">
        <div className="feature-card">
          <span className="material-icons">timeline</span>
          <h3>Structured Learning Path</h3>
          <p>Follow a step-by-step guide tailored to your goals</p>
        </div>
        <div className="feature-card">
          <span className="material-icons">school</span>
          <h3>Expert Resources</h3>
          <p>Access curated learning materials and certifications</p>
        </div>
        <div className="feature-card">
          <span className="material-icons">track_changes</span>
          <h3>Track Progress</h3>
          <p>Monitor your journey and celebrate milestones</p>
        </div>
      </div>
    </div>
  );
};

export default Home; 