import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { auth, missingFirebaseConfig } from './firebaseConfig';
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
import Feedback from './views/Feedback';
import SignUp from './views/SignUp';
import Settings from './views/Settings';
import ForgotPassword from './views/ForgotPassword';
import Testing from './views/Testing';
import Testing1 from './views/Testing1';
import TermsOfUse from './views/TermsOfUse';
import PrivacyPolicy from './views/PrivacyPolicy';
import Environment from './views/Environment';
import Solutions from './views/Solutions';
import NotFound from './views/NotFound';
import GlobalStyle from './GlobalStyles';
// persist localStorage, useReducer React.JS StackOverflow Comment

const App = () => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);
  
  if (missingFirebaseConfig.length) return (
    <main style={{ maxWidth: 640, margin: '10vh auto', padding: 24, fontFamily: 'sans-serif' }}>
      <h1>Gourmet Chef needs configuration</h1>
      <p>The Firebase connection is missing. Add the Firebase values from .env.example to your local .env file or Netlify environment, then rebuild the app.</p>
      <p>Missing fields: {missingFirebaseConfig.join(', ')}</p>
    </main>
  );
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route element={authLoading ? <p role="status">Loading your account…</p> : user ? <Outlet /> : <Navigate to="/login" replace />} >
        <Route path="/setup" element={<Setup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/editSettings" element={<EditSettings />} />
        <Route path="/reviewSettings" element={<ReviewSettings />} />
        <Route path="/recipeQuestions" element={<RecipeQuestions />} />
        <Route path="/recipeGenerator" element={<RecipeGenerator />} />
        <Route path="/nutritionalData" element={<NutritionalData />} />
        <Route path="/cookingTips" element={<CookingTips />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/newrg" element={<Navigate to="/recipeGenerator" replace />} />
        <Route path="/testing" element={<Testing />} />
        <Route path="/testing1" element={<Testing1 />} />
        <Route path="/legal/terms-of-use" element={<TermsOfUse />} />
        <Route path="/legal/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/environment" element={<Environment />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;