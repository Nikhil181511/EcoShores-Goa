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

const images = [ '/2.jpg','/4.jpg', '/5.jpg', '/6.jpg ', '/7.jpg', '/8.jpg','/9.jpg', '/10.jpg'];

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
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '30px',
          right: '30px',
          cursor: 'pointer',
        }}
        onClick={() => setShowPopup(true)}
      >
        <FaHandHoldingHeart size={50} color="#ff5733" />
        <p style={{ color: '#000000', fontWeight: 'bold' }}>Donate</p>
      </div>

      {showPopup && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={() => setShowPopup(false)}
        >
          <div
            style={{
              position: 'relative',
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '10px',
              textAlign: 'center',
              maxWidth: '90%',
            }}
          >
            <button
              onClick={() => setShowPopup(false)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
              }}
            >
              X
            </button>
            <img src="/3.jpg" alt="Donation" style={{ width: '50vh',height:'50vh', borderRadius: '10px' }} />
            <h2 style={{ color: '#333' }}>Support Our Cause</h2>
            <p style={{ color: '#555' }}>Every contribution counts—start with just ₹1!</p>
          </div>
        </div>
      )}

      <nav
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          justifyContent: 'space-around',
          padding: '15px 0',
        }}
      >
        {options.map((item, index) => (
          <Link key={index} to={item.path} style={{ textAlign: 'center', color: '#fff', textDecoration: 'none' }}>
            {item.icon}
            <p style={{ marginTop: '5px', fontSize: '16px', fontWeight: 'bold' }}>{item.label}</p>
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default OptionsPage;
