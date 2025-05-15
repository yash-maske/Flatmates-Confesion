import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserCard from '../components/UserCard';

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

  const fetchMessages = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/user/all');
      setMessages(res.data);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="p-4 min-h-screen bg-gradient-to-tr from-green-50 via-white to-green-100">
      <h1 className="text-3xl font-bold text-green-700 mb-6 animate-fadeInUp">
        👋 Welcome, <span className="text-black">{user}</span>
      </h1>

      {/* User Cards Section */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 animate-fadeIn">
        {users.map((name) => (
          <UserCard key={name} toUser={name} fetchMessages={fetchMessages} />
        ))}
      </div>

      {/* Confessions Section */}
      <h2
        id="confessions"
        className="text-2xl font-semibold text-green-800 mb-4 animate-slideInLeft scroll-mt-20"
      >
        🕵️ Anonymous Confessions
      </h2>

      <div className="space-y-3 animate-fadeInUp">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div
              key={msg._id}
              className="p-4 rounded-xl border border-green-200 bg-white shadow hover:shadow-lg transition-all duration-300"
            >
              <p className="text-sm text-gray-600 mb-1">
                <strong className="text-green-700">To:</strong> {msg.toUser}
              </p>
              <p className="text-gray-800 text-base">{msg.message}</p>
              <p className="text-right text-xs text-gray-400 mt-2">
                {new Date(msg.timestamp).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">No confessions yet. 😶</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
