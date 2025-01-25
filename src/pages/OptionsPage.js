import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaComments, FaExclamationTriangle, FaTruck, FaGlobe, FaStore, FaHandHoldingHeart } from 'react-icons/fa';

const options = [
  { path: '/CommunityChat', icon: <FaComments size={40} color="#fff" />, label: 'Chat' },
  { path: '/ReportIssue', icon: <FaExclamationTriangle size={40} color="#fff" />, label: 'Report' },
  { path: '/TruckPath', icon: <FaTruck size={40} color="#fff" />, label: 'Truck' },
  { path: '/Explore', icon: <FaGlobe size={40} color="#fff" />, label: 'Explore' },
  { path: '/Ewaste', icon: <FaStore size={40} color="#fff" />, label: 'Store' },
];

const images = ['/2.jpg', '/4.jpg', '/5.jpg', '/6.jpg', '/7.jpg', '/8.jpg', '/9.jpg', '/10.jpg'];

function OptionsPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        textAlign: 'center',
        height: '100vh',
        backgroundImage: `url(${images[currentImageIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'background-image 1s ease-in-out',
        position: 'relative',
      }}
    >
      {/* Enhanced Donation Button */}
      <div
        style={{
          position: 'absolute',
          top: '30px',
          right: '30px',
          cursor: 'pointer',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.97)',
          borderRadius: '45%',
          padding: '15px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.3s ease',
          ':hover': {
            transform: 'scale(1.1)',
            backgroundColor: 'rgba(255, 255, 255, 1)'
          }
        }}
        onClick={() => setShowPopup(true)}
      >
        <FaHandHoldingHeart size={50} color="#e63946" />
        <p style={{ 
          color: '#2a9d8f', 
          fontWeight: 'bold',
          marginTop: '8px',
          fontSize: '1.1rem',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)'
        }}>
          Donate
        </p>
      </div>

      {/* Donation Popup */}
      {showPopup && (
        <div
          style={{
            position:'relative',
            top: 0,
            left: 0,
            width: '30%',
            height: '40%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 3
          }}
          onClick={() => setShowPopup(false)}
        >
          <div
            style={{
              position: 'relative',
              backgroundColor: '#fff',
              padding: '30px',
              borderRadius: '15px',
              textAlign: 'center',
              maxWidth: '90%',
              width: '500px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
            }}
          >
            <button
              onClick={() => setShowPopup(false)}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                backgroundColor: '#e63946',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '35px',
                height: '35px',
                fontSize: '1.1rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                ':hover': {
                  transform: 'rotate(90deg) scale(1.1)'
                }
              }}
            >
              ×
            </button>
            <img 
              src="/3.jpg" 
              alt="Donation" 
              style={{ 
                width: '100%', 
                maxHeight: '50vh',
                borderRadius: '10px',
                marginBottom: '20px'
              }} 
            />
            <h2 style={{ color: '#2a9d8f', marginBottom: '15px' }}>Support Our Green Initiative</h2>
            <p style={{ 
              color: '#555',
              fontSize: '1.1rem',
              lineHeight: '1.6',
              marginBottom: '25px'
            }}>
              Your contribution helps us maintain clean shores and promote sustainable practices.<br/>
              Start with as little as ₹1 - every rupee makes a difference!
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '20px'
            }}>
              
            </div>
          </div>
        </div>
      )}

      {/* Navigation Bar */}
      <nav
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          display: 'flex',
          justifyContent: 'space-around',
          padding: '20px 0',
          boxShadow: '0 -4px 15px rgba(0, 0, 0, 0.3)',
          zIndex: 2
        }}
      >
        {options.map((item, index) => (
          <Link 
            key={index} 
            to={item.path} 
            style={{ 
              textAlign: 'center', 
              color: '#fff', 
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              ':hover': {
                transform: 'translateY(-5px)'
              }
            }}
          >
            {React.cloneElement(item.icon, { 
              style: { 
                filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))' 
              } 
            })}
            <p style={{ 
              marginTop: '8px', 
              fontSize: '1rem', 
              fontWeight: '600',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
            }}>
              {item.label}
            </p>
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default OptionsPage;