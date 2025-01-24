import React from 'react';
import { Link } from 'react-router-dom';

function OptionsPage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '10%' }}>
      <h1 style={{ fontFamily: 'Arial, sans-serif', color: '#333' }}>Choose an Option</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={{ margin: '10px 0' }}>
          <Link
            to="/CommunityChat"
            style={{
              display: 'inline-block',
              padding: '15px 30px',
              backgroundColor: '#007bff',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '5px',
              fontSize: '18px',
              fontWeight: 'bold',
              transition: 'background-color 0.3s, transform 0.3s',
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
          >
            Community Chat
          </Link>
        </li>
        <li style={{ margin: '10px 0' }}>
          <Link
            to="/ReportIssue"
            style={{
              display: 'inline-block',
              padding: '15px 30px',
              backgroundColor: '#28a745',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '5px',
              fontSize: '18px',
              fontWeight: 'bold',
              transition: 'background-color 0.3s, transform 0.3s',
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
          >
            Report an Issue
          </Link>
        </li>
        <li style={{ margin: '10px 0' }}>
          <Link
            to="/TruckPath"
            style={{
              display: 'inline-block',
              padding: '15px 30px',
              backgroundColor: '#ffc107',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '5px',
              fontSize: '18px',
              fontWeight: 'bold',
              transition: 'background-color 0.3s, transform 0.3s',
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#e0a800'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#ffc107'}
          >
            See Truck Path
          </Link>
        </li>
        <li style={{ margin: '10px 0' }}>
          <Link
            to="/Explore"
            style={{
              display: 'inline-block',
              padding: '15px 30px',
              backgroundColor: '#17a2b8',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '5px',
              fontSize: '18px',
              fontWeight: 'bold',
              transition: 'background-color 0.3s, transform 0.3s',
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#117a8b'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#17a2b8'}
          >
            Explore
          </Link>
        </li>
        <li style={{ margin: '10px 0' }}>
          <Link
            to="/Ewaste"
            style={{
              display: 'inline-block',
              padding: '15px 30px',
              backgroundColor: '#6B890F',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '5px',
              fontSize: '18px',
              fontWeight: 'bold',
              transition: 'background-color 0.3s, transform 0.3s',
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#e0a800'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#ffc107'}
          >
            E-Waste
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default OptionsPage;
