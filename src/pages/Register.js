import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/register',
        formData
      );

      if (response.data.success) {
        // Registration successful, redirect to login
        navigate('/login', { 
          state: { 
            message: 'Registration successful! Please login to continue.' 
          }
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError(
        error.response?.data?.message || 
        'Registration failed. Please try again.'
      );
      
      // Handle specific errors
      if (error.response?.data?.code === 11000) {
        setError('Email already exists. Please use a different email or login.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="page-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <span className="material-icons">arrow_back</span>
          Back
        </button>
        <h2 className="page-title">Register</h2>
      </div>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="name"
            className="form-input"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
            minLength={2}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-input"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-input"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
          />
          <small className="form-hint">Password must be at least 6 characters long</small>
        </div>

        <button 
          type="submit" 
          className="form-button"
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Register'}
        </button>
      </form>

      <div className="form-footer">
        <p>Already have an account? <Link to="/login" className="form-link">Login</Link></p>
      </div>
    </div>
  );
};

export default Register; 