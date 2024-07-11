// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserComponent from './components/UserComponent';
import LoginPage from './components/LoginPage';
import Header from './components/Header';
import Home from './components/Home';
import AirlineComponent from './components/AirlineComponent';
import FlightComponent from './components/FlightComponent';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/userLookups" element={<UserComponent />} />
        <Route path="/airlineLookup" element={<AirlineComponent />} />
        <Route path="/flightLookup" element={<FlightComponent />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
