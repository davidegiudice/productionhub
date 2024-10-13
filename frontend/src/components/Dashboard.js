// File: Dashboard.js
import React from 'react';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>Welcome to Your Dashboard</h1>
      <p>Here you can manage your events, artists, and requests.</p>
      {/* Add navigation links or buttons to other parts of the app */}
      <div className="dashboard-actions">
        <button onClick={() => window.location.href='/artists'}>Manage Artists</button>
        <button onClick={() => window.location.href='/events'}>Manage Events</button>
        <button onClick={() => window.location.href='/requests'}>Manage Requests</button>
      </div>
    </div>
  );
};

export default Dashboard;