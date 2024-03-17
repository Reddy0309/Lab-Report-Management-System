//UpdatePage.js code
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles.css';
// import '../upd.css';
const UpdatePage = () => {
  const [reportData, setReportData] = useState({
    RID: '',
    PID: '',
    TESTID: '',
    DOCID: '',
    NID: '',
    RESULTS: '',
    DATEREPORTED: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReportData({
      ...reportData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/reports', reportData);
      console.log('Report added successfully:', response.data);
      // Clear form data after successful submission
      setSuccessMessage('Update successful!');
      setReportData({
        RID: '',
        PID: '',
        TESTID: '',
        DOCID: '',
        NID: '',
        RESULTS: '',
        DATEREPORTED: ''
      });
      setError('');
    } catch (error) {
      console.error('Error adding report:', error);
      setError('Error adding report. Please try again.');
    }
  };
  

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };
  return (
    <div className="container">
      <div className="gradient-fill">
      <div className="gradient-fill-text">rnlabs98@gmail.com | 080-29996666</div>
      </div>
      <div className="content"></div>
      <h2>ENTRY INTO REPORTS</h2>
      <div className="form-group"></div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
          RID:</label>
          <input type="text" name="RID" value={reportData.RID} onChange={handleInputChange} />
        
        </div>
      
        <div className="form-group">
          <label>
          PID:</label>
          <input type="text" name="PID" value={reportData.PID} onChange={handleInputChange} />
        
        </div>
        
        <div className="form-group">
          <label>
          TESTID:</label>
          <input type="text" name="TESTID" value={reportData.TESTID} onChange={handleInputChange} />
        
        </div>
        
        <div className="form-group">
          <label>
          DOCID:</label>
          <input type="text" name="DOCID" value={reportData.DOCID} onChange={handleInputChange} />
        
        </div>
        
        <div className="form-group">
           <label>
          NID:</label>
          <input type="text" name="NID" value={reportData.NID} onChange={handleInputChange} />
        
        </div>
       
        <div className="form-group">
          <label>
          RESULTS:</label>
          <input type="number" name="RESULTS" value={reportData.RESULTS} onChange={handleInputChange} />
        
        </div>
        
        <div className="form-group">
          <label>
          DATEREPORTED:</label>
          <input type="date" name="DATEREPORTED" value={reportData.DATEREPORTED} onChange={handleInputChange} />
        
        </div>
        
        <button className="form-group" type="submit">Submit</button>
        
      </form>
      <div>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {error && <p>{error}</p>}
      </div>
      <div><button onClick={handleBackToDashboard}>Back to Dashboard</button></div>
      
      <img src="https://tse4.mm.bing.net/th?id=OIP.iTNusUViNKN7YKsanQbaQAHaHa&pid=Api&P=0&h=180" alt="Watermark" className="watermark" />
    </div>

  );
};

export default UpdatePage;
