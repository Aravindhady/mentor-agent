import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setShowProfileMenu(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        <img src="/logo.png" className="nav-logo" width="32" height="32" alt="Logo" />
        YourLogo
      </Link>

      <div className={`nav-links ${isMenuOpen ? 'show' : ''}`}>
        <Link 
          to="/" 
          className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
        >
          Home
        </Link>
        
        {user ? (
          <div className="profile-menu-container">
            <button className="profile-button" onClick={toggleProfileMenu}>
              <div className="profile-avatar">
                {user?.name ? user.name[0].toUpperCase() : <span className="material-icons">person</span>}
              </div>
              <span className="profile-name">{user?.name}</span>
              <span className="material-icons">
                {showProfileMenu ? 'arrow_drop_up' : 'arrow_drop_down'}
              </span>
            </button>
            
            {showProfileMenu && (
              <div className="profile-dropdown">
                <Link to="/profile" className="dropdown-item" onClick={() => setShowProfileMenu(false)}>
                  <span className="material-icons">person</span>
                  My Profile
                </Link>
                <Link to="/profile/roadmaps" className="dropdown-item" onClick={() => setShowProfileMenu(false)}>
                  <span className="material-icons">map</span>
                  My Roadmaps
                </Link>
                <button onClick={handleLogout} className="dropdown-item">
                  <span className="material-icons">logout</span>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="auth-links">
            <Link 
              to="/login" 
              className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`}
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className={`nav-link ${location.pathname === '/register' ? 'active' : ''}`}
            >
              Register
            </Link>
          </div>
        )}
      </div>

      <button className="menu-button" onClick={toggleMenu}>
        <span className="material-icons">
          {isMenuOpen ? 'close' : 'menu'}
        </span>
      </button>
    </nav>
  );
};

export default NavBar; 