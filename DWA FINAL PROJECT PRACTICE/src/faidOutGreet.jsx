import React, { useState } from "react";
import ReactDOM from 'react-dom';
import App from './App.jsx';

export default function Greetings() {
  const [isHidden, setIsHidden] = useState(false);

  const handleHide = () => {
    setIsHidden(true);
  };

  return (
    <div onClick={handleHide}>
      {!isHidden ? (
        <div className="greetings">
          <h1 className="greetingsH1">Welcome</h1>
          <h1 className="greetingsButton">Let's Begin</h1>
        </div>
      ) : (
        <React.StrictMode>
          <App />
        </React.StrictMode>
      )}
    </div>
  );
}
