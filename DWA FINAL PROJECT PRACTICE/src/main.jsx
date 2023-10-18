import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './App.css';
import './index.css';
import Greetings from './faidOutGreet.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
 ReactDOM.createRoot(document.getElementById('body')).render(
   <React.StrictMode>
   <Greetings key="egg"/>
 </React.StrictMode>
 );



