// vision.js

import React, { useEffect, useRef } from 'react';

const Vision = () => {
  const visionRef = useRef(null);

  useEffect(() => {
    if (visionRef.current) {
      visionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div ref={visionRef} className="vision-container"
    style={{
      backgroundColor: 'rgba(245, 141, 229, 0.9)', // Pink color with transparency
      padding: '10px', // Optional: Add padding for better visual appearance
      borderRadius: '10px',
      borderRadius: '10px',
      fontFamily: 'Arial, sans-serif', // Rounded corners with 10px radius
    }}
    >
      <h3 style={{ textAlign: 'center',fontFamily: 'Alumni Sans Collegiate One' }}>OUR VISION</h3>
      <p style={{ fontSize: '18px', fontFamily: 'Georgia, serif' }}>
        At RN Medical Labs, we envision a future where health is optimized through cutting-edge diagnostics,
        personalized care, and continuous innovation. Our vision is to be a pioneering force in the realm of medical
        laboratories, setting new standards for precision, accessibility, and patient-centric healthcare. We aim to play
        a pivotal role in shaping a world where early and accurate diagnostics empower individuals to lead healthier,
        more fulfilling lives.
      </p>
    </div>
  );
};

export default Vision;
