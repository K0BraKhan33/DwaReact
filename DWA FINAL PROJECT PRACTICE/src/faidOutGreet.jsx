import React, { useState } from "react";
import App from './App.jsx';
export default function Greetings() {
  const hello = document.getElementsByClassName("greeting")

  const handleHide = () => {
    hello.classlist.add("clicks")


  };

  return (
    <div onClick={handleHide}>
    
        <div className="greetings">
          <h1 className="greetingsH1">Welcome</h1>
          <button className="greetingsButton">Lets Begin</button>
        </div>
    
    </div>
  );
}
