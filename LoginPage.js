//LoginPage.js code 
import React, { useState } from 'react';
import Login from '../components/Login';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import '../styles.css';
function LoginPage () {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:3000/login', { username, password });
      if (response.data.success) {
        navigate('/dashboard');
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Invalid username or password. Please try again.');
    }
  };
  return (
    <div className="container">
      <div className="gradient-fill">
      <div className="gradient-fill-text">rnlabs98@gmail.com | 080-29996666</div>
      </div>
      <div className="content"></div>
      <div>
      <h1>WELCOME TO RN LABS</h1>
      <h2>LOGIN</h2>
      <Login onLogin={handleLogin} />
      {error && <p>{error}</p>}
      <br></br>
      <br></br>
      <div style={{ display: 'inline-block' }}>
      <h2 style={{ display: 'inline', marginRight: '10px' }}>Book a Test :</h2>
      <button onClick={() => navigate('/register')} style={{ display: 'inline', padding: '5px 10px', border: 'none', cursor: 'pointer' }}>Register</button>      </div>
      <img src="https://tse4.mm.bing.net/th?id=OIP.iTNusUViNKN7YKsanQbaQAHaHa&pid=Api&P=0&h=180" alt="Watermark" className="watermark" />
    </div>
    </div>
  );
};
export default LoginPage;