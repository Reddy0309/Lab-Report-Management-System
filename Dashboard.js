import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Link } from 'react-router-dom'; // Import Link
import axios from 'axios';
import '../Dash.css'; 
const Dashboard = () => {
  const [passwords, setPasswords] = useState([]);
  const [error, setError] = useState('');
  const navigate=useNavigate();
  return (
    <div className="dashboard-container">
      <div className="content-box">
      <p style={{ fontSize: '16px', fontFamily: 'Georgia, serif' }}>Welcome to RN Labs, your trusted diagnostic lab center committed to providing prompt and accurate medical test results.</p>
      <p style={{ fontSize: '16px', fontFamily: 'Georgia, serif' }}> We understand the importance of timely information for both doctors and patients, which is why we strive to deliver reports as soon as they are ready.</p>
      <p style={{ fontSize: '16px', fontFamily: 'Georgia, serif' }}> With cutting-edge technology and a team of skilled professionals, we ensure reliable testing and efficient service. Your health and well-being are our priority, and we are dedicated to delivering results you can trust.</p>
      <p style={{ fontSize: '16px', fontFamily: 'Georgia, serif' }}> Experience excellence in diagnostics with RN Labs.</p>
      </div>
      {error && <p>{error}</p>}
      
      {/* Links to Doctor, Patient, and Technician pages */}
      <div className="login-links-container">
        <h2>CLICK TO LOGIN AS:</h2>
        <div className="button-container">
          <button onClick={() => navigate('/doctor')}>Doctor</button>
          <button onClick={() => navigate('/patient1')}>Patient</button>
          <button onClick={() => navigate('/technician')}>Technician</button>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;