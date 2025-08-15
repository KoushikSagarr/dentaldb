import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Login from './components/Login';
import Dashboard from './Dashboard';
import { AnimatePresence } from 'framer-motion';
import './styles/global.css';
import './styles/components.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f3e8ff' }}>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 p-6 font-sans">
      <AnimatePresence mode="wait">
        {user ? <Dashboard key="dashboard" /> : <Login key="login" />}
      </AnimatePresence>
    </div>
  );
}

export default App;