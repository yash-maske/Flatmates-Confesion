import React, { useState } from 'react';
import axios from 'axios';
import { MessageSquare } from 'lucide-react';
import './UserCard.css'
const UserCard = ({ toUser, fetchMessages }) => {
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const url = "https://flatmates-confesion-git-main-yash-maskes-projects-93f4ac16.vercel.app";

  const sendMessage = async () => {
    if (!message) return;
    await axios.post(`${url}/api/user/send`, {
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
    <div className={`user-card-container ${sent ? 'pulse-animation' : ''}`}>
      <button
        onClick={scrollToDashboardMessages}
        className="confession-icon-btn"
        title="View Confessions"
      >
        <MessageSquare size={20} />
      </button>

      <h2 className="user-card-title">
        Confess to: <span className="user-card-recipient">{toUser}</span>
      </h2>

      <textarea
        rows="3"
        placeholder="Write your confession..."
        className="user-card-textarea"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        onClick={sendMessage}
        className="user-card-send-btn"
      >
        ✉️ Send Confession
      </button>
    </div>
  );
};

export default UserCard;
