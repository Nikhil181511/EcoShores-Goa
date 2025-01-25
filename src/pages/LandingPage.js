import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, provider, signInWithPopup } from '../firebaseConfig';

const LandingPage = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const sponsors = [
    { name: 'Callan Gonsalves', tier: 'platinum' },
    { name: 'Nikhil Savita', tier: 'gold' },
    { name: 'Dale Luis', tier: 'gold' },
    { name: 'Mac Silva', tier: 'silver' },
  ];

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      alert(`Welcome ${result.user.displayName}!`);
      setShowPopup(false);
      navigate('/OptionsPage');
    } catch (error) {
      console.error('Login failed:', error.message);
      alert('Failed to login. Please try again.');
    }
  };

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
        color: '#E0C145',
        fontFamily: 'Arial, sans-serif',
        textShadow: '2px 2px 4px rgba(7, 7, 7, 0.9)',
        position: 'relative',
      }}
    >
      {/* Sponsor Scroll Bar */}
      <div style={{ 
        position: 'absolute', 
        top: '0',
        width: '100%',
        padding: '1.2rem 0',
        backgroundColor: 'rgba(0, 0, 0, 0.51)',
        overflow: 'hidden',
        zIndex: 1,
      }}>
        <div style={{
          display: 'flex',
          animation: 'scroll 40s linear infinite',
          width: 'max-content',
          willChange: 'transform',
          paddingRight: '50px',
          ':hover': {
            animationPlayState: 'paused'
          }
        }}>
          {[...sponsors, ...sponsors].map((sponsor, index) => (
            <div 
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginRight: '4rem',
                padding: '0.8rem 1.5rem',
                borderRadius: '30px',
                background: `linear-gradient(135deg, ${
                  sponsor.tier === 'platinum' ? 'rgba(229, 193, 0, 0.2)' :
                  sponsor.tier === 'gold' ? 'rgba(255, 215, 0, 0.2)' :
                  'rgba(192, 192, 192, 0.2)'
                }, transparent)`,
                backdropFilter: 'blur(4px)',
                border: `1px solid ${
                  sponsor.tier === 'platinum' ? '#E5C100' :
                  sponsor.tier === 'gold' ? '#FFD700' :
                  '#C0C0C0'
                }`,
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
              }}
            >
              <span style={{
                fontSize: '1.1rem',
                fontWeight: 600,
                marginRight: '1rem',
                color: sponsor.tier === 'platinum' ? '#E5C100' :
                      sponsor.tier === 'gold' ? '#FFD700' : '#C0C0C0'
              }}>
                {sponsor.name}
              </span>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: sponsor.tier === 'platinum' ? '#E5C100' :
                                sponsor.tier === 'gold' ? '#FFD700' : '#C0C0C0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
              }}>
                {sponsor.tier === 'platinum' ? '⭐' : 
                sponsor.tier === 'gold' ? '🏅' : '🎖'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <h1 style={{ 
          fontSize: '3rem', 
          fontWeight: 'bold', 
          marginBottom: '20px', 
          color: '#fff',
          textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)'
        }}>
          Welcome To EcoShores Goa
        </h1>
        
        <button
          onClick={() => setShowPopup(true)}
          style={{
            padding: '15px 40px',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#fff',
            backgroundColor: '#28a745',
            border: 'none',
            borderRadius: '30px',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(8, 7, 7, 0.85)',
            transition: 'all 0.3s ease',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#276110')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#28a745')}
        >
          Get Started
        </button>
      </div>

      {/* Login Popup */}
      {showPopup && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 3,
        }}>
          <div style={{
            backgroundColor: '#fff',
            padding: '30px',
            borderRadius: '10px',
            textAlign: 'center',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            width: '400px',
          }}>
            <h2 style={{ color: '#000', marginBottom: '20px' }}>Login / Signup</h2>
            <button
              onClick={handleGoogleLogin}
              style={{
                padding: '12px 24px',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                color: '#fff',
                backgroundColor: '#4285F4',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                margin: '0 auto',
              }}
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                style={{ width: '25px' }}
              />
              Sign in with Google
            </button>
            <button
              onClick={() => setShowPopup(false)}
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                backgroundColor: '#dc3545',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
    </div>
  );
};

export default LandingPage;