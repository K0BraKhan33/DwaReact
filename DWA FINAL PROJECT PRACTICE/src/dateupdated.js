export function datedown(podcastData, setPodcastData) {
    // Sort the podcastData array alphabetically based on episode.title in descending order
    const sortedData = [...podcastData];
    sortedData.sort((a, b) => b.updated.localeCompare(a.updated));
  
    // Update the state to trigger a re-render
    setPodcastData(sortedData);
  }
  

  export function dateup(podcastData, setPodcastData) {
    // Sort the podcastData array alphabetically based on episode.title in descending order
    const sortedData = [...podcastData];
    sortedData.sort((a, b) => a.updated.localeCompare(b.updated));
  
    // Update the state to trigger a re-render
    setPodcastData(sortedData);
  }
  

  