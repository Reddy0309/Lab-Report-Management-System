import React, { useState } from 'react';
import axios from 'axios';
import '../styles.css';
import { useNavigate } from 'react-router-dom';
function RegisterPage() {
  // Define state variables for form fields
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [doctorInCharge, setDoctorInCharge] = useState('');
  const [testToBePerformed, setTestToBePerformed] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const todayDate = new Date().toISOString().slice(0, 10);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming you have an API endpoint to handle the registration
      const response = await axios.post('http://localhost:3000/api/register', {
        name,
        phoneNumber,
        address,
        age,
        sex,
        doctorInCharge,
        testToBePerformed,
        appointmentDate,
        appointmentTime,
      });
      setSuccessMessage('Appointment Fixed!');
      console.log('Server response:', response.data);
    } catch (err) {
      setError('Error submitting form. Please try again.');
      console.error('Error submitting form:', err);
    }
  };

    const handleBackToDashboard = () => {
        navigate('/login'); // Navigate to the 'dashboard' route
    };
  return (
    <div className="container">
      <div className='gradient-fill'>
      <div className="gradient-fill-text">rnlabs98@gmail.com | 080-29996666</div>
      </div>
      <div className='content'></div>
      <h1>Register for Appointment</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="form-field">
            <label>Name:</label>
            <input type="text" className="curved-input" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-field">
            <label>Phone Number:</label>
            <input type="tel" className="curved-input" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
          </div>
          <div className="form-field">
            <label>Address:</label>
            <input type="text" className="curved-input" value={address} onChange={(e) => setAddress(e.target.value)} required />
          </div>
          <div className="form-field">
            <label>Age:</label>
            <input type="number" className="curved-input" value={age} onChange={(e) => setAge(e.target.value)} required />
          </div>
          <div className="form-field">
            <label>Sex:</label>
            <select value={sex} className="curved-input" onChange={(e) => setSex(e.target.value)} required>
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="form-field">
            <label>Doctor in Charge:</label>
            <input type="text" className="curved-input" value={doctorInCharge} onChange={(e) => setDoctorInCharge(e.target.value)} required />
          </div>
          <div className="form-field">
            <label>Test to be Performed:</label>
            <input type="text" className="curved-input" value={testToBePerformed} onChange={(e) => setTestToBePerformed(e.target.value)} required />
          </div>
          <div className="form-field">
            <label>Date of Appointment:</label>
            <input type="date" className="curved-input" value={appointmentDate} min={todayDate} onChange={(e) => setAppointmentDate(e.target.value)} required />
          </div>
          <div className="form-field">
            <label>Time of Appointment:</label>
            <input type="time" className="curved-input" value={appointmentTime} onChange={(e) => setAppointmentTime(e.target.value)} required />
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
        <div>
        <button type="button" onClick={handleBackToDashboard}>
        Go Back
      </button>
      </div>
      <img src="https://tse4.mm.bing.net/th?id=OIP.iTNusUViNKN7YKsanQbaQAHaHa&pid=Api&P=0&h=180" alt="Watermark" className="watermark" />
    </div>
  );
}

export default RegisterPage;
