function sortDownButton(podcastData, setPodcastData) {
  // Sort the podcastData array alphabetically based on episode.title in descending order
  const sortedData = [...podcastData];
  sortedData.sort((a, b) => b.title.localeCompare(a.title));

  // Update the state to trigger a re-render
  setPodcastData(sortedData);
}

export default sortDownButton;
