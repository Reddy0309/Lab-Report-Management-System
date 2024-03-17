//Patient.js code
import React from 'react';
const Patient = ({ patientDetails}) => {
  return(
    <div>
      <h3>Patient Details:</h3>
                <p>PID: {patientDetails.PID}</p>
                <p>Name: {patientDetails.PNAME}</p>
                <p>Age: {patientDetails.AGE}</p>
                <p>Phone: {patientDetails.PHONE}</p>
                <p>Email: {patientDetails.EMAIL}</p>
                <p>Sex: {patientDetails.SEX}</p>
                <p>Doctor ID: {patientDetails.DOCID}</p>
                
    </div>
  )
}
export default Patient;