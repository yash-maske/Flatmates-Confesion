import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setUser }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/user/login', {
        name,
        password,
      });
      setUser(res.data.name);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-white to-green-200 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-2xl transform transition duration-300 animate-fadeInUp hover:scale-105">
        <h1 className="text-3xl font-extrabold text-green-700 text-center mb-6 animate-glow">
          🌿 Flat Confession Login
        </h1>
        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-green-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200"
            required
          />
          <input
            type="password"
            placeholder="Shared Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-green-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200"
            required
          />
          {error && (
            <p className="text-red-600 text-sm text-center animate-shake">{error}</p>
          )}
          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-300 shadow-lg"
          >
            🚪 Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
