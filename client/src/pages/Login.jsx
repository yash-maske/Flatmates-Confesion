import React, { useState } from 'react';
import axios from 'axios';
import './login.css'; // Make sure this is imported

const Login = ({ setUser }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const url = "https://flatmates-confesion-git-main-yash-maskes-projects-93f4ac16.vercel.app";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/api/user/login`, {
        name,
        password,
      });
      setUser(res.data.name);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h1 className="login-title">🌿 Flat Confession Login</h1>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="login-input"
            required
          />
          <input
            type="password"
            placeholder="Shared Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />
          {error && (
            <p className="login-error">{error}</p>
          )}
          <button
            type="submit"
            className="login-button"
          >
            🚪 Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
