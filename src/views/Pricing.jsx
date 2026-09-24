import React from 'react';
import { Link } from 'react-router-dom';
export default function Pricing() {
  return <main style={{maxWidth: 640, margin: '10vh auto', padding: 24}}><h1>Start cooking with Gourmet Chef</h1><p>There is currently no paid subscription or checkout. Create an account to explore personalized recipes and food nutrition. Recipe generation depends on service availability.</p><Link to="/signup">Create an account →</Link><p><Link to="/">Back to home</Link></p></main>;
}
