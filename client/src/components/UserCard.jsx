import React, { useState } from 'react';
import axios from 'axios';
import { MessageSquare } from 'lucide-react'; // Optional: for a modern icon

const UserCard = ({ toUser, fetchMessages }) => {
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const sendMessage = async () => {
    if (!message) return;
    await axios.post('http://localhost:8000/api/user/send', {
      toUser,
      message,
    });
    setMessage('');
    fetchMessages();
    setSent(true);
    setTimeout(() => setSent(false), 1000);
  };

  const scrollToDashboardMessages = () => {
    const section = document.getElementById('confessions');
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative animate-fadeInUp max-w-md mx-auto mt-5 border border-gray-200 rounded-xl p-5 shadow-xl bg-gradient-to-br from-white via-green-50 to-green-100 transition-transform duration-500 hover:scale-[1.02]">
      {/* Message Icon Top Right */}
      <button
        onClick={scrollToDashboardMessages}
        className="absolute top-3 right-3 text-green-500 hover:text-green-700 transition"
        title="View Confessions"
      >
        {/* Use emoji or Lucide icon */}
        <MessageSquare size={20} />
      </button>

      <h2 className="font-bold text-xl text-green-700 mb-3">
        Confess to: <span className="text-black">{toUser}</span>
      </h2>

      <textarea
        rows="3"
        placeholder="Write your confession..."
        className="w-full border border-green-300 focus:border-green-500 outline-none px-3 py-2 rounded-lg transition duration-300 shadow-sm focus:shadow-md resize-none"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        onClick={sendMessage}
        className={`mt-3 w-full bg-green-500 text-white font-semibold py-2 rounded-lg transition-all duration-300 ease-in-out hover:bg-green-600 shadow-lg ${
          sent ? 'animate-pulseOnce' : ''
        }`}
      >
        ✉️ Send Confession
      </button>
    </div>
  );
};

export default UserCard;
