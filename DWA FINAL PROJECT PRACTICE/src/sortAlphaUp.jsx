
import React from "react";

function SortButton({ podcastData, setPodcastData }) {
  function handleSortAlphabetically() {
    // Sort the podcastData array alphabetically based on episode.title
    const sortedData = [...podcastData];
    sortedData.sort((a, b) => a.title.localeCompare(b.title));

    // Update the state to trigger a re-render
    setPodcastData(sortedData);
  }

  return (
    <button className="sort-button" onClick={handleSortAlphabetically}>
      Sort Alphabetically
    </button>
  );
}

export default SortButton;