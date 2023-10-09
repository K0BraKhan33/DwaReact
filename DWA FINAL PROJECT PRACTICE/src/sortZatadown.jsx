
import React from "react";

function SortDownButton({ podcastData, setPodcastData }) {
  function handleSortAlphabetically() {
    // Sort the podcastData array alphabetically based on episode.title
    const sortedData = [...podcastData];
    sortedData.sort((a, b) => b.title.localeCompare(a.title));

    // Update the state to trigger a re-render
    setPodcastData(sortedData);
  }

  return (
    <button className="sort-button" onClick={handleSortAlphabetically}>
      Sort Alphabetically (decending)
    </button>
  );
}

export default SortDownButton;