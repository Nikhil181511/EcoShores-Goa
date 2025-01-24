// ReportIssue.js
import React, { useState } from 'react';

const ReportIssue = () => {
  const [issue, setIssue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle issue report submission logic here
    alert(`Issue reported: ${issue}`);
  };

  return (
    <div>
      <h1>Report an Issue</h1>
      <form onSubmit={handleSubmit}>
        <textarea 
          value={issue} 
          onChange={(e) => setIssue(e.target.value)} 
          placeholder="Describe the issue..." 
          required 
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ReportIssue;
