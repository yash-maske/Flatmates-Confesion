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
  const [showConfessionsModal, setShowConfessionsModal] = useState(false);
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

  // Filter confessions where toUser matches the current user
  const userConfessions = messages.filter((msg) => msg.toUser === user);

  return (
    <div className="dashboard-container relative">
      {/* Bell Icon for User's Confessions */}
      <button
        className="absolute top-4 right-4 text-2xl p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none"
        onClick={() => setShowConfessionsModal(true)}
        title="View Your Confessions"
      >
        🔔
      </button>

      <h1 className="dashboard-welcome">
        👋 Welcome, <span className="dashboard-username">{user}</span>
      </h1>

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

      {/* Modal for User's Confessions */}
      {showConfessionsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Your Confessions</h2>
              <button
                className="text-2xl focus:outline-none"
                onClick={() => setShowConfessionsModal(false)}
              >
                &times;
              </button>
            </div>
            {userConfessions.length > 0 ? (
              userConfessions.map((msg) => (
                <div key={msg._id} className="border-b py-2">
                  <p className="text-sm">
                    <strong>To:</strong> {msg.toUser}
                  </p>
                  <p className="text-gray-700">{msg.message}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(msg.timestamp).toLocaleString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No confessions addressed to you yet. 😶</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;