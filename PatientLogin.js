// PatientLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Patient from '../components/Patient'; 
import '../styles.css';

const PatientLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [patientDetails, setPatientDetails] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/patients/login', { password });
      if (response.data.success) {
        // const patientId = response.data.patient.PID;
        setPatientDetails(response.data.patient);
        setError(''); 
      } else {
        setError('Invalid Password');
        setPatientDetails(null); 
      }
    } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          setError(error.response.data.message || 'Invalid Password. Try again');
          console.error('Invalid Password. Try again', error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          setError('No response from server');
          console.error('No Response:', error.request);
        } else {
          // Something else happened in making the request
          setError('An error occurred while logging in');
          console.error('Login Error:', error.message);
        }
      }
    };
    const handleViewReport = () => {
      // Check if patientDetails is available and contains PID
      if (patientDetails && patientDetails.PID) {
        navigate(`/PatientResPage/${patientDetails.PID}`); // Navigate to PatientResPage with PID as parameter
      } else {
        setError('Patient details not available');
      }
    };
      
    return (
      <div className="container">
        <div className="gradient-fill">
        <div className="gradient-fill-text">rnlabs98@gmail.com | 080-29996666</div>
      </div>
        <h2>Patient Login</h2>
        <form onSubmit={handleLogin}>
          <label htmlFor="password">Enter Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="curved-input"
          />
          <button type="submit">Login</button>
        </form>
        {error && <p>{error}</p>}
        {patientDetails && (
          <div>
            {/* <h2>Patient Details</h2> */}
            <Patient patientDetails={patientDetails} />
            <button onClick={handleViewReport}>View Report</button>
          </div>
        )}
              <img src="https://tse4.mm.bing.net/th?id=OIP.iTNusUViNKN7YKsanQbaQAHaHa&pid=Api&P=0&h=180" alt="Watermark" className="watermark" />
      </div>
    );
  };
  

export default PatientLogin;