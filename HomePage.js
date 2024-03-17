import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import Vision from './vision';
import Mission from './mission';

function HomePage() {
  const [redirectingMessage, setRedirectingMessage] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const tagline = 'Making lives better';

  const navigate = useNavigate(); // Initialize useNavigate

  const handleLoginClick = () => {
    setRedirectingMessage('Redirecting');
    navigate('/login');
  };

  const handleDropdownChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedOption(selectedOption);
  };

  return (
    <div className="app-container">
      {/* Navbar */}
      <nav className="navbar">
        <button onClick={handleLoginClick}>Sign-Up/Log-In</button>
        <select value={selectedOption} onChange={handleDropdownChange} className="custom-select">
          <option value="" disabled hidden>Choose an option</option>
          <option value="mission">Our Mission</option>
          <option value="vision">Our Vision</option>
        </select>
      </nav>

      <h1>Welcome to RN LABS</h1>
      <h2>{tagline}</h2>

      {/* Render Mission content when "Our Mission" is selected */}
      {selectedOption === 'mission' && <Mission />}

      {/* Render Vision content when "Our Vision" is selected */}
      {selectedOption === 'vision' && <Vision />}

      {/* Redirecting Message */}
      {redirectingMessage && (
        <p className="dance-dots">
          {redirectingMessage}
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </p>
      )}

      {/* Empty space for spacing */}
      <div style={{ height: '500px' }}></div>
    </div>
  );
}

export default HomePage;
