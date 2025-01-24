import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        textAlign: 'center',
        height: '100vh',
        backgroundImage: `url('/1.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#F5F568',
        fontFamily: 'Arial, sans-serif',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
      }}
    >
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '20px' }}>
        Welcome to Waste Management Goa
      </h1>
      <button
        onClick={() => navigate('/OptionsPage')}
        style={{
          padding: '15px 40px',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#fff',
          backgroundColor: '#28a745',
          border: 'none',
          borderRadius: '30px',
          cursor: 'pointer',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.3s ease',
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = '#218838')}
        onMouseOut={(e) => (e.target.style.backgroundColor = '#28a745')}
      >
        Get Started
      </button>
    </div>
  );
};

export default LandingPage;
