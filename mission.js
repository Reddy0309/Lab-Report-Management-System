// mission.js

import React, { useEffect, useRef } from 'react';

const Mission = () => {
  const missionRef = useRef(null);

  useEffect(() => {
    if (missionRef.current) {
      missionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div ref={missionRef} className="mission-container" id="mission-section"
    style={{
      backgroundColor: 'rgba(245, 141, 229, 0.9)', // Pink color with transparency
      padding: '10px', // Optional: Add padding for better visual appearance
      borderRadius: '10px',
      fontFamily: 'Arial, sans-serif', // Rounded corners with 10px radius
    }}>
      <h3 style={{ textAlign: 'center',fontFamily: 'Alumni Sans Collegiate One' }}>OUR MISSION</h3>
      <p style={{ fontSize: '18px', fontFamily: 'Georgia, serif' }}>
        At RN Medical Labs, we are dedicated to providing exceptional diagnostic services marked by precision, timeliness, and
        efficiency. Beyond our commitment to delivering accurate results, our mission extends to the forefront of healthcare
        innovation. Through ongoing research initiatives, strategic collaborations, and the integration of emerging technologies,
        we aim to push the boundaries of diagnostic capabilities.
      </p>
      <p style={{ fontSize: '18px', fontFamily: 'Georgia, serif' }}>
        Our comprehensive range of services caters to diverse healthcare needs, from routine screenings to specialized tests,
        ensuring that our community receives the highest standard of care. We prioritize accessibility and affordability, placing
        patient-centric values at the core of our operations.
      </p>
      <p style={{ fontSize: '18px', fontFamily: 'Georgia, serif' }}>
        With a culture grounded in excellence, compassion, and a forward-looking approach, RN Medical Labs seeks to be a driving
        force in shaping the future of medical diagnostics. Through our endeavors, we aspire to positively impact the well-being
        of individuals and contribute to the continual advancement of healthcare practices.
      </p>
    </div>
  );
};

export default Mission;