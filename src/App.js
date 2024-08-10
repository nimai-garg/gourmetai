import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from './firebaseConfig';
import Landing from './views/Landing';
import Login from './views/Login';
import Setup from './views/Setup';
import Dashboard from './views/Dashboard';
import Pricing from './views/Pricing';
import EditSettings from './views/EditSettings';
import ReviewSettings from './views/ReviewSettings';
import RecipeQuestions from './views/RecipeQuestions';
import RecipeGenerator from './views/RecipeGenerator';
import NutritionalData from './views/NutritionalData';
import CookingTips from './views/CookingTips';
import NotFound from './views/NotFound';
import GlobalStyle from './GlobalStyles';
// persist localStorage, useReducer React.JS StackOverflow Comment

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
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setup" element={user ? <Setup /> : <Login/>} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Login/>} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/editSettings" element={<EditSettings />} />
        <Route path="/reviewSettings" element={<ReviewSettings />} />
        <Route path="/recipeQuestions" element={<RecipeQuestions />} />
        <Route path="/recipeGenerator" element={<RecipeGenerator />} />
        <Route path="/nutritionalData" element={<NutritionalData />} />
        <Route path="/cookingTips" element={<CookingTips />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;