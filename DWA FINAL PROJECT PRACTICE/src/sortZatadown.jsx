import React from "react";

function SortDownButton({ podcastData, setPodcastData }) {
    // Sort the podcastData array alphabetically based on episode.title in descending order
    const sortedData = [...podcastData];
    sortedData.sort((a, b) => b.title.localeCompare(a.title));

    // Update the state to trigger a re-render
   return setPodcastData(sortedData);
  }




export default SortDownButton;
