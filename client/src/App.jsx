import React, { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100">
      {!user ? <Login setUser={setUser} /> : <Dashboard user={user} />}
    </div>
  );
};

export default App;
