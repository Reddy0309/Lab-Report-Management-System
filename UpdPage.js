//UpdatePage.js code
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles.css';
const UpdPage = () => {
  const [resultData, setResultData] = useState({
    ID: '',
    RBC: '',
    PCV: '',
    MCV: '',
    MCH: '',
    RDW: '',
    TLC: '',
    PLT_PER_MM3: '',
    HGB: '',
    gravity: '',
    ph: '',
    osmo: '',
    cond: '',
    urea: '',
    calc: '',
    O2SAT: '',
    Glucose: '',
    BloodPressure: '',
    SkinThickness: '',
    Insulin: '',
    BMI: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if(name==="ID"){
      setResultData({
        ...resultData,
        [name]: value
      });
    }
    setResultData({
      ...resultData,
      [name]: Number(parseFloat(value))
    
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/results',resultData);
      console.log('Result added successfully:', response);
      setSuccessMessage('Update successful!');
      // Clear form data after successful submission
      setResultData({
        ID: '',
        RBC: '',
        PCV: '',
        MCV: '',
        MCH: '',
        RDW: '',
        TLC: '',
        PLT_PER_MM3: '',
        HGB: '',
        gravity: '',
        ph: '',
        osmo: '',
        cond: '',
        urea: '',
        calc: '',
        O2SAT: '',
        Glucose: '',
        BloodPressure: '',
        SkinThickness: '',
        Insulin: '',
        BMI: ''
      });
  
      setError('');
    } catch (error) {
      console.error('Error adding result:', error);
      setError('Error adding result. Please try again.');
    }
  };
  

  const handleNext = () => {
    navigate('/update');
  };

  return (
    <div className="container1">
      <div className="gradient-fill">
      <div className="gradient-fill-text">rnlabs98@gmail.com | 080-29996666</div>
      </div>
      <div className="content"></div>
      <h2>ENTRY INTO RESULTS</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label htmlFor="ID" className="label">ID:</label>
          <input
            type="number"
            name="ID"
            value={resultData.ID}
            onChange={handleInputChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="RBC" className="label">RBC:</label>
          <input
            type="number"
            name="RBC"
            value={resultData.RBC}
            onChange={handleInputChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="PCV" className="label">PCV:</label>
          <input
            type="number"
            name="PCV"
            value={resultData.PCV}
            onChange={handleInputChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="MCV" className="label">MCV:</label>
          <input
            type="number"
            name="MCV"
            value={resultData.MCV}
            onChange={handleInputChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="MCH" className="label">MCH:</label>
          <input
            type="number"
            name="MCH"
            value={resultData.MCH}
            onChange={handleInputChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="RDW" className="label">RDW:</label>
          <input
            type="number"
            name="RDW"
            value={resultData.RDW}
            onChange={handleInputChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="TLC" className="label">TLC:</label>
          <input
            type="number"
            name="TLC"
            value={resultData.TLC}
            onChange={handleInputChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="PLT_PER_MM3" className="label">PLT_PER_MM3:</label>
          <input
            type="number"
            name="PLT_PER_MM3"
            value={resultData.PLT_PER_MM3}
            onChange={handleInputChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="HGB" className="label">HGB:</label>
          <input
            type="number"
            name="HGB"
            value={resultData.HGB}
            onChange={handleInputChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="gravity" className="label">gravity:</label>
          <input
            type="number"
            name="gravity"
            value={resultData.gravity}
            onChange={handleInputChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="ph" className="label">ph:</label>
          <input
            type="number"
            name="ph"
            value={resultData.ph}
            onChange={handleInputChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="osmo" className="label">osmo:</label>
          <input
            type="number"
            name="osmo"
            value={resultData.osmo}
            onChange={handleInputChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="cond" className="label">cond:</label>
          <input
            type="number"
            name="cond"
            value={resultData.cond}
            onChange={handleInputChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="urea" className="label">urea:</label>
          <input
            type="number"
            name="urea"
            value={resultData.urea}
            onChange={handleInputChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="calc" className="label">calc:</label>
          <input
            type="number"
            name="calc"
            value={resultData.calc}
            onChange={handleInputChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="O2SAT" className="label">O2SAT:</label>
          <input
            type="number"
            name="O2SAT"
            value={resultData.O2SAT}
            onChange={handleInputChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="Glucose" className="label">Glucose:</label>
          <input
            type="number"
            name="Glucose"
            value={resultData.Glucose}
            onChange={handleInputChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="BloodPressure" className="label">BloodPressure:</label>
          <input
            type="number"
            name="BloodPressure"
            value={resultData.BloodPressure}
            onChange={handleInputChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="SkinThickness" className="label">SkinThickness:</label>
          <input
            type="number"
            name="SkinThickness"
            value={resultData.SkinThickness}
            onChange={handleInputChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="Insulin" className="label">Insulin:</label>
          <input
            type="number"
            name="Insulin"
            value={resultData.Insulin}
            onChange={handleInputChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="BMI" className="label">BMI:</label>
          <input
            type="number"
            name="BMI"
            value={resultData.BMI}
            onChange={handleInputChange}
            className="input"
          />
        </div>
        <div><button type="submit">Submit</button></div>
        <br></br>
        <div><button onClick={handleNext}>Next</button></div>
      </form>

      <div>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {error && <p>{error}</p>}
      </div>
      
      
      <img src="https://tse4.mm.bing.net/th?id=OIP.iTNusUViNKN7YKsanQbaQAHaHa&pid=Api&P=0&h=180" alt="Watermark" className="watermark" />
    </div>
  );
};

export default UpdPage;

