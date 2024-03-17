// TechnicianPage.js code
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles.css';
const TechnicianPage = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [technicianInfo, setTechnicianInfo] = useState(null);

  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/technicians', { password });
     if (response.data.success) {
        setTechnicianInfo(response.data.technician);
        setError('');
      } else {
        setError('Invalid password');
      }
    } catch (error) {
      setError('An error occurred while logging in');
    }
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handleNavigateToUpdatePage = () => {
    navigate('/UpdPage');
  };

  return (
    <div className="container">
      <div className="gradient-fill"><div className="gradient-fill-text">rnlabs98@gmail.com | 080-29996666</div>
      </div>      
      <div className="content"></div>
      <h2>Technician Login</h2>
      <div>
      <input type="password" className="curved-input" placeholder="Enter password" value={password} onChange={handlePasswordChange} />
      <button onClick={handleLogin} className="curved-button">Login</button>
      </div>
      {error && <p>{error}</p>}
      {technicianInfo && (
        <div>
          <p>TID: {technicianInfo.TID}</p>
          <p>Name: {technicianInfo.TNAME}</p>
          <p>Phone: {technicianInfo.PHONE}</p>
          <p>Email: {technicianInfo.EMAIL}</p>
          <p>Test ID: {technicianInfo.TESTID}</p>

          <div>
          <button onClick={handleNavigateToUpdatePage} className="curved-button">Make Entry</button>
            </div>
            <br></br>
            <div>
            <button onClick={handleBackToDashboard } className="curved-button">Back to Dashboard</button>
            </div>
          </div>
      )}
      <img src="https://tse4.mm.bing.net/th?id=OIP.iTNusUViNKN7YKsanQbaQAHaHa&pid=Api&P=0&h=180" alt="Watermark" className="watermark" />
    </div>
  );
};

export default TechnicianPage;
