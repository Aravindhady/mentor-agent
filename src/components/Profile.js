import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile({ userId }) {
  const [savedRoadmaps, setSavedRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const response = await axios.get(`/api/roadmaps/${userId}`);
        setSavedRoadmaps(response.data.roadmaps);
      } catch (error) {
        console.error('Error fetching roadmaps:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchRoadmaps();
    }
  }, [userId]);

  const handleDownload = (roadmap) => {
    const element = document.createElement('a');
    const fileContent = JSON.stringify(roadmap.roadmap, null, 2);
    const file = new Blob([fileContent], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `career-roadmap-${roadmap.careerPath}.txt`;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="profile-container">
      <h2>My Career Roadmaps</h2>
      {loading ? (
        <p>Loading...</p>
      ) : savedRoadmaps.length === 0 ? (
        <p>No saved roadmaps yet.</p>
      ) : (
        <div className="roadmaps-grid">
          {savedRoadmaps.map((roadmap) => (
            <div key={roadmap._id} className="roadmap-card">
              <h3>{roadmap.careerPath}</h3>
              <p>
                <strong>Technology:</strong> {roadmap.technology}
              </p>
              <p>
                <strong>Created:</strong> {new Date(roadmap.createdAt).toLocaleDateString()}
              </p>
              <button onClick={() => handleDownload(roadmap)}>
                <span className="material-icons">download</span>
                Download Roadmap
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Profile; 