import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './firebaseConfig';
import Login from './views/Login';
import Setup from './views/Setup';
import StudentDashboard from './views/StudentDashboard';
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
        <Route path="/login" element={<Login />} />
        <Route path="/setup" element={user ? <Setup /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={user ? <StudentDashboard /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={user ? "/setup" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;
