import React from 'react';
import { Link } from 'react-router-dom';

function OptionsPage() {
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
    </div>
  );
}

export default OptionsPage;
