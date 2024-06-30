import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './firebaseConfig';
import Login from './views/Login';
import StudentDashboard from './views/StudentDashboard';
import GlobalStyle from './GlobalStyles';

const App = () =>
{
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() =>
  {
    const unsubscribe = auth.onAuthStateChanged((user) =>
    {
      if (user)
      {
        setUser(user);
      }
      else
      {
        setUser(null);
        setRole(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = (userRole, user) =>
  {
    setRole(userRole);
    setUser(user);
  };

  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
