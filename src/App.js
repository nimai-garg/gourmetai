import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './firebaseConfig';
import Landing from './views/Landing';
import Login from './views/Login';
import Setup from './views/Setup';
import Dashboard from './views/Dashboard';
import GlobalStyle from './GlobalStyles';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="" element={<Landing/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/setup" element={user ? <Setup /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={user ? "/setup" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;
