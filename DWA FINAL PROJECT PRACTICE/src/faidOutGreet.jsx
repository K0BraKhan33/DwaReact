import React, { useState } from "react";

export default function Greetings() {
  const [isVisible, setIsVisible] = useState(true);

  const handleHide = () => {
    setIsVisible(false);
  };

  return (
    <div onClick={handleHide}>
      {isVisible && (
        <div className="greetings">
          <h1 className="greetingsH1">Welcome</h1>
          <button className="greetingsButton">Lets Begin</button>
        </div>
      )}
    </div>
  );
}
