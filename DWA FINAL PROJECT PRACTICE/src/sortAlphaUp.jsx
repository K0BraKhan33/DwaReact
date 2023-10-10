function sortAlphaUp(podcastData, setPodcastData) {
  // Sort the podcastData array alphabetically based on episode.title in descending order
  const sortedData = [...podcastData];
  sortedData.sort((a, b) => a.title.localeCompare(b.title));

  // Update the state to trigger a re-render
  setPodcastData(sortedData);
}

export default sortAlphaUp;
