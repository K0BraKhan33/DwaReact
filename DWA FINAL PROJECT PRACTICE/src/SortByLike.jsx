import React, { useEffect, useState } from "react";

function SortLikes() {
  const [heartLikeIds, setHeartLikeIds] = useState([]);

  useEffect(() => {
    // This effect can be used to fetch and set the initial list of heart_like IDs if needed.
  }, []);

  const sortinglikes = () => {
    // Get the heart_like elements
    const elementHeart = document.querySelectorAll(".heart_like");

    // Extract and store the IDs in an array, removing the "like" prefix
    const ids = Array.from(elementHeart).map((element) => element.id.replace("like", ""));

    // Log the IDs to the console
    console.log("Heart Like IDs:", ids);

    // You can also update the state with the IDs if needed
    setHeartLikeIds(ids);

    // Compare IDs of orderedList to heart_like and hide the corresponding ones
    // Implement your logic here if you want to hide elements based on the IDs
    for()
  };

  return (
    <div>
      <button onClick={sortinglikes}>Sort by likes</button>
    </div>
  );
}

export default SortLikes;
