import React from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import { Routes, Route } from 'react-router-dom';
import CareerRoadmap from './pages/CareerRoadmap';

// Import your page components here
// Example:
// import Home from './pages/Home';
// import About from './pages/About';

const routes = [
  {
    path: '/',
    element: <div>Home Page</div>,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/career-roadmap',
    element: <CareerRoadmap />,
  },
];

export default routes;