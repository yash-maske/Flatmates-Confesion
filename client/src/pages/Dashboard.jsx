import React, { useState, useEffect } from 'react';
import './dashboard.css';

const Dashboard = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showOnlyUserConfessions, setShowOnlyUserConfessions] = useState(false);
  const [selectedNameFilter, setSelectedNameFilter] = useState('');

  const users = [...new Set(messages.map(msg => msg.toUser))];

  const fetchMessages = async () => {
    setLoading(true);
    // Replace this with your actual API or logic
    const response = await fetch('/api/confessions');
    const data = await response.json();
    setMessages(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const displayedMessages = messages
    .filter(msg => showOnlyUserConfessions ? msg.toUser === user : true)
    .filter(msg => selectedNameFilter ? msg.toUser === selectedNameFilter : true);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2 className="dashboard-welcome">
          Welcome, <span className="dashboard-username">{user}</span>!
        </h2>
      </div>

      <div className="confession-controls">
        <button
          className="refresh-button"
          onClick={() => {
            setShowOnlyUserConfessions(false);
            setSelectedNameFilter('');
            fetchMessages();
          }}
          disabled={loading}
        >
          {loading ? 'Refreshing...' : '🔄 Refresh Confessions'}
        </button>

        <select
          className="filter-dropdown"
          value={selectedNameFilter}
          onChange={(e) => setSelectedNameFilter(e.target.value)}
        >
          <option value="">🔍 Filter by Name</option>
          {users.map((name) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </div>

      <h3 className="confessions-heading">📜 Confessions</h3>

      <div className="confessions-container">
        {displayedMessages.length === 0 ? (
          <p className="confession-empty">No confessions to display.</p>
        ) : (
          displayedMessages.map((msg, index) => (
            <div className="confession-card" key={index}>
              <p className="confession-to">
                To: <strong>{msg.toUser}</strong>
              </p>
              <p className="confession-message">{msg.message}</p>
              <p className="confession-time">{msg.time}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
