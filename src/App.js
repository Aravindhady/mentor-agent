import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ProfileEditor from './components/ProfileEditor';
import { Link } from 'react-router-dom';

import './styles/App.css';

function App() {
  const [userId, setUserId] = useState(null);

  return (
    <Router>
      <div className="app">
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={
              <div>
                <Home />
              </div>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<ProfileEditor />} />
          </Routes>
        </main>
        <footer className="footer">
          <p>&copy; 2024 Your Project. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App; 