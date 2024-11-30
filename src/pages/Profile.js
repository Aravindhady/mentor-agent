import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import axios from 'axios';
import '../styles/Profile.css';

const Profile = () => {
  const { user } = useContext(UserContext);
  const [savedRoadmaps, setSavedRoadmaps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSavedRoadmaps = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (!storedUser?._id) {
          setIsLoading(false);
          return;
        }

        console.log('Fetching roadmaps for user:', storedUser._id); // Debug log

        const response = await axios.get(
          `http://localhost:5000/api/roadmaps/user/${storedUser._id}`,
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }
        );

        console.log('Fetched roadmaps:', response.data); // Debug log

        if (Array.isArray(response.data)) {
          setSavedRoadmaps(response.data);
        } else {
          console.error('Invalid response format:', response.data);
          setSavedRoadmaps([]);
        }
      } catch (error) {
        console.error('Error fetching roadmaps:', error);
        if (error.response) {
          console.log('Error response:', error.response.data);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchSavedRoadmaps();
  }, []);

  const handleDeleteRoadmap = async (roadmapId) => {
    try {
      await axios.delete(`/api/roadmaps/${roadmapId}`);
      setSavedRoadmaps(prevRoadmaps => 
        prevRoadmaps.filter(roadmap => roadmap._id !== roadmapId)
      );
    } catch (error) {
      console.error('Error deleting roadmap:', error);
      alert('Failed to delete roadmap');
    }
  };

  const handleViewRoadmap = (roadmap) => {
    // Store the roadmap details in localStorage for viewing
    localStorage.setItem('viewRoadmap', JSON.stringify(roadmap));
    navigate('/roadmap-details');
  };

  if (!user) {
    return (
      <div className="profile-container">
        <div className="no-user">
          <span className="material-icons">account_circle</span>
          <h2>Please Log In</h2>
          <p>You need to be logged in to view your profile</p>
          <Link to="/login" className="login-button">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="page-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <span className="material-icons">arrow_back</span>
          Back
        </button>
        <h2 className="page-title">Profile</h2>
      </div>

      <div className="profile-header">
        <div className="profile-avatar large">
          {user?.name ? user.name[0].toUpperCase() : '?'}
        </div>
        <div className="profile-info">
          <div className="profile-info-header">
            <h1>{user?.name}</h1>
            <button 
              className="edit-profile-button"
              onClick={() => navigate('/profile/edit')}
            >
              <span className="material-icons">edit</span>
              Edit Profile
            </button>
          </div>
          <p>{user?.email}</p>
        </div>
      </div>

      <div className="saved-roadmaps">
        <h2>My Career Roadmaps</h2>
        
        {isLoading ? (
          <div className="loading-spinner">
            <span className="material-icons spinning">refresh</span>
            Loading...
          </div>
        ) : savedRoadmaps.length > 0 ? (
          <div className="roadmaps-grid">
            {savedRoadmaps.map((roadmap) => (
              <div key={roadmap._id} className="roadmap-card">
                <div className="roadmap-card-header">
                  <span className="material-icons">map</span>
                  <h3>{roadmap.roadmap.title}</h3>
                </div>
                <div className="roadmap-card-content">
                  <p><strong>Career Path:</strong> {roadmap.careerPath}</p>
                  <p><strong>Technology:</strong> {roadmap.technology}</p>
                  <div className="skills-preview">
                    <strong>Key Skills:</strong>
                    <div className="skills-tags">
                      {roadmap.roadmap.skills.slice(0, 3).map((skill, index) => (
                        <span key={index} className="skill-tag">{skill}</span>
                      ))}
                      {roadmap.roadmap.skills.length > 3 && (
                        <span className="skill-tag more">+{roadmap.roadmap.skills.length - 3} more</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="roadmap-card-actions">
                  <button 
                    className="view-button"
                    onClick={() => handleViewRoadmap(roadmap)}
                  >
                    <span className="material-icons">visibility</span>
                    View Details
                  </button>
                  <button 
                    className="delete-button"
                    onClick={() => handleDeleteRoadmap(roadmap._id)}
                  >
                    <span className="material-icons">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-roadmaps">
            <span className="material-icons">folder_open</span>
            <p>No saved roadmaps yet</p>
            <Link to="/" className="create-roadmap-button">
              Create Your First Roadmap
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile; 