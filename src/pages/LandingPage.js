import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      <h1>Welcome to Waste Management Goa</h1>
      <button onClick={() => navigate('/OptionsPage')}>Get Started</button>
    </div>
  );
};

export default LandingPage;
