import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, provider, signInWithPopup } from '../firebaseConfig';

const LandingPage = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  // Handle Google Authentication
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('User Info:', result.user);
      alert(`Welcome ${result.user.displayName}!`);
      setShowPopup(false); // Close popup
      navigate('/OptionsPage'); // Redirect on success
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
        textShadow: '2px 2px 4px rgba(183, 163, 14, 0.8)',
      }}
    >
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '20px',color: '#E0C145' }}>
        Welcome To R३ Goa
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

      {showPopup && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              padding: '30px',
              borderRadius: '10px',
              textAlign: 'center',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              width: '400px',
            }}
          >
            <h2 style={{ color: '#000000' }}>Login / Signup</h2>
            <p style={{ marginBottom: '20px',color:'#000000',alignSelf:'center',alignItems:'center' }}>Sign in with Google to continue</p>
            <center>
              <button
              onClick={handleGoogleLogin}
              style={{
                padding: '10px 20px',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                color: '#fff',
                backgroundColor: '#4285F4',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
              }}
            >
              <img src="https://th.bing.com/th/id/OIP.flV_HAhkgpxUwwDRW-5p9AHaHa?w=200&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Google" style={{ width: '25px' }} />
              Sign in with Google
            </button>  
            </center>
            
            <br />
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
    </div>
  );
};

export default LandingPage;
