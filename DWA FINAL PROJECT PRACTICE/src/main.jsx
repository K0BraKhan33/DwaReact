import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './App.css';
import'./login.css';
import './index.css';
import NewAccounts from './createNewAccount.jsx';
import Greetings from './faidOutGreet.jsx';
import Login from './login.jsx';
import { BrowserRouter, Route, Link, Routes, Outlet } from 'react-router-dom';

function Mains() {
  return (
    <div>
      {/* This is your main component content */} 
      <h1>Main Page</h1>
      <Outlet /> {/* This is where nested route content will be rendered */}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="mains" element={<App />} />
      <Route path="CreateAccount" element={<NewAccounts />} />

    </Routes>
  </BrowserRouter>
);
