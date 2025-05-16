import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserCard from '../components/UserCard';
import './Dashboard.css';

const users = [
  'Yash Maske',
  'Yash Deshmukh',
  'Nirbhay Chukekar',
  'Parth Chandurkar',
  'Rahul Solanke',
  'Vedant Pasarkar',
  'Athrav Timane',
  'Chinmay Tidke',
];

const Dashboard = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showOnlyUserConfessions, setShowOnlyUserConfessions] = useState(false);
  const [filterByName, setFilterByName] = useState('All');
  const url = "https://flatmates-confesion-git-main-yash-maskes-projects-93f4ac16.vercel.app";

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${url}/api/message/all`);
      setMessages(res.data);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const filteredMessages = showOnlyUserConfessions
    ? messages.filter((msg) => msg.toUser === user)
    : filterByName === 'All'
      ? messages
      : messages.filter((msg) => msg.toUser === filterByName);

  return (
    <div className="dashboard-container">
      {/* Header with Welcome and Bell Icon */}
      <div className="dashboard-header">
        <h1 className="dashboard-welcome">
          👋 Welcome, <span className="dashboard-username">{user}</span>
        </h1>
        <button
          className="bell-icon"
          onClick={() => {
            setShowOnlyUserConfessions(true);
            setFilterByName('All');
            document.getElementById('confessions')?.scrollIntoView({ behavior: 'smooth' });
          }}
          title="Show your confessions"
        >
          🔔
        </button>
      </div>

      {/* User Cards Section */}
      <div className="dashboard-grid">
        {users.map((name) => (
          <UserCard
            key={name}
            toUser={name}
            fromUser={user}
            fetchMessages={fetchMessages}
          />
        ))}
      </div>

      {/* Confessions Section */}
      <h2 id="confessions" className="confessions-heading">
        🕵️ Anonymous Confessions
      </h2>

      <div className="confession-controls">
        <select
          className="filter-dropdown"
          value={filterByName}
          onChange={(e) => {
            setShowOnlyUserConfessions(false);
            setFilterByName(e.target.value);
          }}
        >
          <option value="All">Filter by Name</option>
          {users.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>

        <button
          className="refresh-button"
          onClick={() => {
            setShowOnlyUserConfessions(false);
            setFilterByName('All');
            fetchMessages();
          }}
          disabled={loading}
        >
          {loading ? 'Refreshing...' : '🔄 Refresh Confessions'}
        </button>
      </div>


      <div className="confessions-container">
        {filteredMessages.length > 0 ? (
          filteredMessages.map((msg) => (
            <div key={msg._id} className="confession-card">
              <p className="confession-to">
                <strong>To:</strong> {msg.toUser}
              </p>
              <p className="confession-message">{msg.message}</p>
              <p className="confession-time">
                {new Date(msg.timestamp).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="confession-empty">No confessions yet. 😶</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
