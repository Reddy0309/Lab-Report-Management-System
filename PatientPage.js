// PatientPage.js code
import React, { useState }  from 'react';
import Patient from '../components/Patient';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles.css';
const PatientPage = () => {
  const [PID, setPID] = useState('');
  const [patientDetails, setPatientDetails] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchPatientDetails = async ( ) => {
    
    try {
      const response = await axios.get(`http://localhost:3000/api/patients/${PID}`);
      if (response.data.success) {
        setPatientDetails(response.data.patient);
        setError('');
      } else {
        setPatientDetails(null);
        setError('Invalid Patient ID');
      }
    } catch (error) {
      setPatientDetails(null);
      setError('An error occurred while fetching patient details');
    }
    
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetchPatientDetails( );
  };

  const handleViewReport = () => {
    navigate(`/patient/${PID}/report`);
  };
  return (
    <div className="container">
      <div className="gradient-fill">
        <div className="gradient-fill-text">rnlabs98@gmail.com | 080-29996666</div>
      </div>
      <div className="content"></div>
      <h2>Welcome To Patients Page</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="PID" className="curved-label">Enter Patient ID:</label>
        <input
          type="text"
          id="PID"
          value={PID}
          onChange={(e) => setPID(e.target.value)}
          placeholder="Patient ID"
          required
          className="curved-input"
        />
        <button type="submit" className="curved-button">Submit</button>
      </form>
      {error && <p>{error}</p>}
      {patientDetails && (
      <div>
        <Patient patientDetails={patientDetails} />
        <button onClick={handleViewReport} className="curved-button">View Report</button>
        </div>
      )}
      <img src="https://tse4.mm.bing.net/th?id=OIP.iTNusUViNKN7YKsanQbaQAHaHa&pid=Api&P=0&h=180" alt="Watermark" className="watermark" />
    </div>
  );
};

export default PatientPage;
