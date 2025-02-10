import React, { useState } from 'react';
import './exp.css';

const BeachCleanupSchedule = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showRegistration, setShowRegistration] = useState(false);
  const [selectedCleanup, setSelectedCleanup] = useState(null);
  const [registrationForm, setRegistrationForm] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const [cleanups] = useState({
    upcoming: [
      {
        id: 1,
        date: '2025-01-26',
        location: 'Colva Beach',
        volunteers: 30,
        status: 'Upcoming'
      }
    ],
    prescheduled: [
      {
        id: 2,
        date: '2025-05-18', 
        location: 'Coral Coast',
        volunteers: 30,
        status: 'Planning'
      },
      {
        id: 3,
        date: '2025-06-22',
        location: 'Rocky Shore',
        volunteers: 20,
        status: 'Planning'
      },
      {
        id: 4,
        date: '2025-07-20',
        location: 'Marine Cove',
        volunteers: 35,
        status: 'Planning'
      },
      {
        id: 5,
        date: '2025-08-17',
        location: 'Sandy Bay',
        volunteers: 25,
        status: 'Planning'
      }
    ],
    past: [
      {
        id: 6,
        date: '2024-11-15',
        location: 'Harbor Front',
        volunteers: 40,
        status: 'Completed',
        totalWasteCollected: '250 kg',
        environmentalImpact: 'High'
      },
      {
        id: 7,
        date: '2024-10-20',
        location: 'City Beach',
        volunteers: 35,
        status: 'Completed',
        totalWasteCollected: '180 kg',
        environmentalImpact: 'Moderate'
      }
    ]
  });

  const handleRegister = (cleanup) => {
    setSelectedCleanup(cleanup);
    setShowRegistration(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegistrationForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const submitRegistration = (e) => {
    e.preventDefault();
    alert(`Registered for ${selectedCleanup.location} on ${selectedCleanup.date}`);
    setShowRegistration(false);
    setRegistrationForm({ name: '', email: '', phone: '' });
  };

  const renderCleanupList = (cleanupList, isPastTab = false) => (
    cleanupList.map((cleanup) => (
      <div key={cleanup.id} className="cleanup-item">
        <div className="cleanup-details">
          <div className="cleanup-date">
            <span className="icon">📅</span>
            {cleanup.date}
          </div>
          <div className="cleanup-location">
            <span className="icon">📍</span>
            {cleanup.location}
          </div>
          <div className="cleanup-volunteers">
            <span className="icon">👥</span>
            {cleanup.volunteers} Volunteers
          </div>
          {isPastTab && (
            <>
              <div className="cleanup-waste">
                <span className="icon">🗑</span>
                Waste Collected: {cleanup.totalWasteCollected}
              </div>
              <div className="cleanup-impact">
                <span className="icon">🌍</span>
                Environmental Impact: {cleanup.environmentalImpact}
              </div>
            </>
          )}
        </div>
        <div className="cleanup-actions">
          <div className={`cleanup-status status-badge ${cleanup.status.toLowerCase()}`}>
            {cleanup.status}
          </div>
          {!isPastTab && (
            <button 
              className="register-mini-button"
              onClick={() => handleRegister(cleanup)}
            >
              Register
            </button>
          )}
        </div>
      </div>
    ))
  );

  return (
    <div className="beach-cleanup-container">
      <div className="schedule-card">
        <div className="schedule-header">
          <h1>Beach Cleanup Schedule</h1>
        </div>
        <div className="tab-navigation">
          {['upcoming', 'prescheduled', 'past'].map((tab) => (
            <button 
              key={tab}
              className={activeTab === tab ? 'active' : ''} 
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'upcoming' ? 'Upcoming Cleanups' : 
               tab === 'prescheduled' ? 'Pre-Scheduled Cleanups' : 
               'Past Cleanups'}
            </button>
          ))}
        </div>
        <div className="cleanup-list">
          {activeTab === 'upcoming' && renderCleanupList(cleanups.upcoming)}
          {activeTab === 'prescheduled' && renderCleanupList(cleanups.prescheduled)}
          {activeTab === 'past' && renderCleanupList(cleanups.past, true)}
        </div>
      </div>

      {showRegistration && (
        <div className="registration-modal">
          <div className="modal-content">
            <h2>Register for Cleanup</h2>
            <p>Location: {selectedCleanup.location}</p>
            <p>Date: {selectedCleanup.date}</p>
            <form onSubmit={submitRegistration}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={registrationForm.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={registrationForm.email}
                onChange={handleInputChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone"
                value={registrationForm.phone}
                onChange={handleInputChange}
                required
              />
              <button type="submit">Submit</button>
              <button type="button" onClick={() => setShowRegistration(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BeachCleanupSchedule;
