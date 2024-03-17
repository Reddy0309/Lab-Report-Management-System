//DashboardPage.js code
import React from 'react';
import Dashboard from '../components/Dashboard';
import '../styles.css';
const DashboardPage = () => {
  return (
    <div className="container">
      <div className="gradient-fill">
      <div className="gradient-fill-text">rnlabs98@gmail.com | 080-29996666</div>
      </div>
      <div className="content"></div>
      <h1>DASHBOARD</h1>
      <Dashboard />
      <img src="https://tse4.mm.bing.net/th?id=OIP.iTNusUViNKN7YKsanQbaQAHaHa&pid=Api&P=0&h=180" alt="Watermark" className="watermark" />

    </div>
  );
};
export default DashboardPage;