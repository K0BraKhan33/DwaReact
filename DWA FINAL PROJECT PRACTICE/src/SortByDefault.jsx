//SortByDefault.jsx
import React from "react";

// Function to remove the "hideable" class from elements
function removeHideableClass() {
    // Get all elements with a class name "hideable"
    var hideableElements = document.getElementsByClassName("hideable");
  
    // Loop through the elements and remove the "hideable" class from each
    for (var i = 0; i < hideableElements.length; i++) {
      hideableElements[i].classList.remove("hideable");
    }
  
    // Remove the "likesMode" class from elements with class name "ulgrid"
    var ulgridElements = document.querySelectorAll(".ulgrid");
    ulgridElements.forEach((element) => {
      element.classList.remove("likesMode");
    });
  }
  
function Defaulted() {
  return (
    <div>
      <button onClick={removeHideableClass}>sort by default</button>
      {/* Your other React components */}
    </div>
  );
}

export default Defaulted;
