//App.js code
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import DoctorPage from './pages/DoctorPage'; // Import DoctorPage, PatientPage, and TechnicianPage
import PatientPage from './pages/PatientPage';
import ReportPage from './pages/ReportPage'; 
import TechnicianPage from './pages/TechnicianPage';
import UpdatePage from './pages/UpdatePage';
import UpdPage from './pages/UpdPage';
import PatientLogin from './pages/PatientLogin';
import PatientResPage from './pages/PatientResPage';

import './App.css';
const App = () => {
  return (
    <Router>       
       <Routes> {/* Use Routes instead of div */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} /> {/* Use 'element' prop */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} /> {/* Use 'element' prop */}
          <Route path="/doctor" element={<DoctorPage />} /> {/* Add routes for Doctor, Patient, and Technician */}
          <Route path="/patient" element={<PatientPage />} />
          <Route path="/patient1" element={<PatientLogin />} />
          <Route path="/patient/:PID/report" element={<ReportPage />} />
          <Route path="/technician" element={<TechnicianPage />} />
          <Route path="/update" element={<UpdatePage />} />
          <Route path="/UpdPage" element={<UpdPage />} />
          <Route path="/PatientResPage/:PID" element={<PatientResPage />} />
        
          
        </Routes>
            </Router>
  );
};
export default App;
