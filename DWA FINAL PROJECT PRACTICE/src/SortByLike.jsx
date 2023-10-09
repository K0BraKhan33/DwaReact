import React from "react";

function sortinglikes() {
    const elements = document.getElementsByClassName("orderedList");
  
    // Iterate through the elements and toggle the 'hideable' class
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.toggle("hideable");
    }
  }
  
  

function SortLikes() {
  return (
    <div>
      <button onClick={sortinglikes}>Sort by likes</button>
    </div>
  );
}

export default SortLikes;
