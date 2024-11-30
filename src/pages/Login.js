import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Get the redirect path if it exists
  const from = location.state?.from || '/';

  // Show success message if redirected from registration
  useEffect(() => {
    if (location.state?.message) {
      setSuccess(location.state.message);
      // Clear the message from location state
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        formData
      );

      // Store the token in localStorage
      localStorage.setItem('token', response.data.token);
      
      // Store user data if needed
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      // Redirect to the original destination or home
      navigate(from);
    } catch (error) {
      console.error('Login error:', error);
      if (error.response?.status === 401) {
        setError('Invalid email or password');
      } else if (error.response?.status === 404) {
        setError('Account not found. Please register first.');
      } else {
        setError(
          error.response?.data?.message || 
          'Login failed. Please try again.'
        );
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
        <h2 className="page-title">Login</h2>
      </div>
      
      {success && (
        <div className="success-message">
          {success}
        </div>
      )}
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin}>
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
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button 
          type="submit" 
          className="form-button"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div className="form-footer">
        <p>Don't have an account? <Link to="/register" className="form-link">Register</Link></p>
      </div>
    </div>
  );
};

export default Login; 