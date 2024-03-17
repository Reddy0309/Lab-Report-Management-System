//ReportPage.js code
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate  } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import '../styles1.css';
const ReportPage = () => {
  const { PID } = useParams();
  const [reportDetails, setReportDetails] = useState(null);
  const [additionalResultDetails, setAdditionalResultDetails] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReportDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/reports/${PID}`);
        if (response.data.success) {
            const reportData = Array.isArray(response.data.reports) ? response.data.reports : [response.data.reports];
            setReportDetails(reportData);
            const resultIds = reportData.map(report => report.RESULTS);
            await fetchAdditionalResultDetails(resultIds);
            setError('');
        } else {
          setReportDetails([]);
          setAdditionalResultDetails({});
          setError('Report not found for this patient');
        }
      } catch (error) {
        setError('Report not found for this patient');
      }
    };
    fetchReportDetails();
  }, [PID]);

  const fetchAdditionalResultDetails = async (resultIds) => {
    try {
      const response = await axios.post(`http://localhost:3000/api/result`, { resultIds });
      console.log('Additional result details response:', response.data); // Log the response for debugging
      if (response.data.success) {
        setAdditionalResultDetails(response.data); // Update state with the entire response object
        setError('');
      } else {
        setAdditionalResultDetails({}); // Clear result details
        setError('Additional result details not found');
      }
    } catch (error) {
      setError('An error occurred while fetching additional result details');
    }
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard'); // Navigate to the Dashboard page
  };

  const downloadAsPDF = () => {
    const contentToDownload = document.getElementById('content-to-download');
    html2canvas(contentToDownload).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 130;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      // Calculate position for centering with top and bottom margins
    const margin = 35; 
    const usableHeight = pdf.internal.pageSize.getHeight() - (2 * margin);
    const yPos = margin + (usableHeight - imgHeight) / 2;
    pdf.setFillColor(0, 0, 50, 0.5); 
    pdf.rect(0, 0, pdf.internal.pageSize.getWidth(), 28, 'F'); // Top margin of 28cm (280mm)

    const watermarkLeft = 'https://tse3.mm.bing.net/th?id=OIP.IYQ-qEYdyLyTzeJe74Q4HAHaHa&pid=Api&P=0&h=180';
    pdf.addImage(watermarkLeft, 'PNG', 5, 5, 20, 20, '', 'FAST', 0.1);

    const imgRightX = pdf.internal.pageSize.getWidth() - 25; // Adjust X position as needed
    pdf.addImage('https://tse4.mm.bing.net/th?id=OIP.iTNusUViNKN7YKsanQbaQAHaHa&pid=Api&P=0&h=180', 'PNG', imgRightX, 5, 20, 20, '', 'FAST', 0);
    
       // Add custom header
    pdf.setFont('Georgia', 'bold');
    pdf.setFontSize(16);
    const textWidth = pdf.getStringUnitWidth('RN LABS') * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
    const centerX = (pdf.internal.pageSize.getWidth() - textWidth) / 2;
    pdf.text('RN LABS', centerX, 15);
    pdf.setFontSize(12);
    const addressWidth = pdf.getStringUnitWidth('Bangalore - 560085') * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
    const addressCenterX = (pdf.internal.pageSize.getWidth() - addressWidth) / 2;
    pdf.text('Bangalore - 560085', addressCenterX, 20);
       // Add image at centered position
    pdf.addImage(imgData, 'PNG', margin+5, yPos+5, imgWidth, imgHeight);
    pdf.save('report.pdf');
    });
  };
    return (
    <div className="container1">
      <div className="gradient-fill1">
      <div className="gradient-fill-text1">rnlabs98@gmail.com | 080-29996666</div>
      </div>
      <div className="content"></div>      
      {error && <p>{error}</p>}
      {reportDetails && reportDetails.map((report, index) => (
  <div key={index} id="content-to-download">
    <div className="content-box1">
    <h2 style={{fontSize:25, fontWeight: 'bold'}}>Report Details:</h2>
      <p>RID: {report.RID}&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;PID: {report.PID}</p>
      <p>DOCID: {report.DOCID}&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;&emsp;&emsp;NID: {report.NID}</p>
      <p>Results: {report.RESULTS}&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;&ensp;&ensp;&ensp;&emsp;&emsp;Date Reported: {report.DATEREPORTED}</p>
      <h2 style={{fontSize:25, fontWeight: 'bold'}}>Result Details:</h2>
      {additionalResultDetails.results && additionalResultDetails.results.length > 0 && (
        <div>
          {/* Display additional result details */}
          {additionalResultDetails.results.map((result, index) => (
            <div key={index}>
              <p>ID: {result.ID}</p>
              <p>RBC: {result.RBC}</p>
              <p>PCV: {result.PCV}</p>
              {/* Add other fields as needed */}
              <p>MCV: {result.MCV}</p>
              <p>MCH: {result.MCH}</p>
              <p>RDW: {result.RDW}</p>
              <p>TLC: {result.TLC}</p>
              <p>PLT_PER_MM3: {result.PLT_PER_MM3}</p>
              <p>HGB: {result.HGB}</p>
              <p>Gravity: {result.gravity}</p>
              <p>PH: {result.ph}</p>
              <p>Osmo: {result.osmo}</p>
              <p>Cond: {result.cond}</p>
              <p>Urea: {result.urea}</p>
              <p>Calc: {result.calc}</p>
              <p>O2SAT: {result.O2SAT}</p>
              <p>Glucose: {result.Glucose}</p>
              <p>BloodPressure: {result.BloodPressure}</p>
              <p>SkinThickness: {result.SkinThickness}</p>
              <p>Insulin: {result.Insulin}</p>
              <p>BMI: {result.BMI}</p>
            </div>
          ))}
          
        </div>
      )}
    </div>
    
  </div>
))}
<button onClick={downloadAsPDF}>Download as PDF</button>
<div> 
  <br></br>
  <button onClick={handleBackToDashboard}>Back to Dashboard</button> </div>
      
      
      <img src="https://tse4.mm.bing.net/th?id=OIP.iTNusUViNKN7YKsanQbaQAHaHa&pid=Api&P=0&h=180" alt="Watermark" className="watermark" />
    </div>
  );
};
export default ReportPage;
