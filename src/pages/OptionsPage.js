import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHandHoldingHeart } from 'react-icons/fa';  // Importing donation icon

function OptionsPage() {
  const [showPopup, setShowPopup] = useState(false);

  const handleDonationClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div
      style={{
        textAlign: 'center',
        height: '100vh',
        backgroundImage: `url('/2.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        fontFamily: 'Arial, sans-serif',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
      }}
    >
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {[
          { path: '/CommunityChat', label: 'Community Chat', bgColor: '#007bff', hoverColor: '#0056b3' },
          { path: '/ReportIssue', label: 'Report an Issue', bgColor: '#28a745', hoverColor: '#218838' },
          { path: '/TruckPath', label: 'See Truck Path', bgColor: '#ffc107', hoverColor: '#e0a800' },
          { path: '/Explore', label: 'Explore', bgColor: '#17a2b8', hoverColor: '#117a8b' },
          { path: '/Ewaste', label: 'E-Waste', bgColor: '#6B890F', hoverColor: '#506907' },
        ].map((item, index) => (
          <li key={index} style={{ margin: '15px 0' }}>
            <Link
              to={item.path}
              style={{
                display: 'inline-block',
                padding: '20px 60px',
                backgroundColor: item.bgColor,
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '30px',
                fontSize: '20px',
                fontWeight: 'bold',
                boxShadow: '0 6px 10px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.3s ease',
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = item.hoverColor)}
              onMouseOut={(e) => (e.target.style.backgroundColor = item.bgColor)}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Donation Icon with title */}
      <div
        style={{
          position: 'absolute',
          top: '30px',
          right: '30px',
          textAlign: 'center',
          cursor: 'pointer',
        }}
        onClick={handleDonationClick}
      >
        <div
          style={{
            backgroundColor: '#ff5733',
            padding: '20px',
            borderRadius: '50%',
            boxShadow: '0 6px 12px rgba(0,0,0,0.4)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.2)';
            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.6)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.4)';
          }}
        >
          <FaHandHoldingHeart size={50} color="#fff" />
        </div>
        <p style={{ marginTop: '10px', fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>Donate</p>
      </div>

      {/* Popup Modal */}
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
          onClick={closePopup}
        >
          <div
            style={{
              position: 'relative',
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
              textAlign: 'center',
              maxWidth: '90%',
              maxHeight: '90%',
            }}
          >
            <button
              onClick={closePopup}
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
                fontSize: '16px',
                cursor: 'pointer',
              }}
            >
              X
            </button>
            <img
              src="/3.jpg"
              alt="Donation"
              style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
            />
            <h2 style={{ color: '#333' }}>Support Our Cause</h2>
            <p style={{ color: '#555' }}>Your donation helps us make a difference!</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default OptionsPage;
