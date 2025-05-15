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
  const url = "https://flatmates-confesion-git-main-yash-maskes-projects-93f4ac16.vercel.app";

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${url}/api/user/all`);
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

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-welcome">
        👋 Welcome, <span className="dashboard-username">{user}</span>
      </h1>

      {/* User Cards Section */}
      <div className="dashboard-grid">
        {users.map((name) => (
          <UserCard
            key={name}
            toUser={name}
            fromUser={user} // ✅ Pass current user as sender
            fetchMessages={fetchMessages}
          />
        ))}
      </div>

      {/* Confessions Section */}
      <h2 id="confessions" className="confessions-heading">
        🕵️ Anonymous Confessions
      </h2>

      <button
        className="refresh-button"
        onClick={fetchMessages}
        disabled={loading}
      >
        {loading ? 'Refreshing...' : '🔄 Refresh Confessions'}
      </button>

      <div className="confessions-container">
        {messages.length > 0 ? (
          messages.map((msg) => (
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
