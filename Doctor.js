// Doctor.js
import React from 'react';


const Doctor = ({ doctorInfo }) => {
  return (
    <div>
      <h3>Welcome Doc!</h3>
      <h2>Doctor Information:</h2>
      <p>DOCID: {doctorInfo.DOCID}</p>
      <p>Name: {doctorInfo.docname}</p>
      <p>Phone: {doctorInfo.phone}</p>
      <p>Email: {doctorInfo.EMAIL}</p>
      <p>Specializations: {doctorInfo.specs}</p>
    </div>
  );
};

export default Doctor;
