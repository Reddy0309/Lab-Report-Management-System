// DoctorPage.js
import React, { useState } from 'react';
import Doctor from '../components/Doctor';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles.css';
const DoctorPage = () => {
  const [password, setPassword] = useState('');
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [error, setError] = useState('');
  const [PID, setPID] = useState('');
  const [patientDetails, setPatientDetails] = useState(null);

  const navigate = useNavigate();

  const fetchDoctorInfo = async (password) => {
    try {
      const response = await axios.post('http://localhost:3000/api/doctors', { password });
      if (response.data.success) {
        setDoctorInfo(response.data.doctor);
      } else {
        setError('Invalid password');
      }
    } catch (error) {
      setError('Invalid password. Try again');
    }
  };

  const handleSubmitPassword = async (event) => {
    event.preventDefault();
    await fetchDoctorInfo(password);
  };

  

  const handleEnterPatientId = () => {
    // Navigate to PatientPage
    navigate('/patient');
  };

  return (
    <div className="container">
      <div className="gradient-fill">
      <div className="gradient-fill-text">rnlabs98@gmail.com | 080-29996666</div>
      </div>
      <div className="content"></div>
      {!doctorInfo ? (
        <div>
          <h2>Welcome to the Doctor's Page</h2>
          <form onSubmit={handleSubmitPassword}>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="curved-input"
            />
            <button type="submit" className="curved-button">Submit</button>
          </form>
          {error && <p>{error}</p>}
        </div>
      ) : (
        <div>
          <Doctor doctorInfo={doctorInfo} />
          <button onClick={handleEnterPatientId} className="curved-button">Enter Patient ID</button>
        </div>
      )}
      <img src="https://tse4.mm.bing.net/th?id=OIP.iTNusUViNKN7YKsanQbaQAHaHa&pid=Api&P=0&h=180" alt="Watermark" className="watermark" />
    </div>
  );
};
export default DoctorPage;