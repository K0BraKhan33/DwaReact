import React from "react";

function SortButton({ podcastData, setPodcastData }) {
 
    // Sort the podcastData array alphabetically based on episode.title
    const sortedData = [...podcastData];
    sortedData.sort((a, b) => a.title.localeCompare(b.title));

    // Update the state to trigger a re-render
   return setPodcastData(sortedData);
  }




export default SortButton;
