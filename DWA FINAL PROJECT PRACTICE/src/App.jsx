import React, { useState, useEffect } from "react";

async function fetchPodcastData() {
  try {
    const response = await fetch("https://podcast-api.netlify.app");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching podcast data:", error);
    return [];
  }
}

function App() {
  const [podcastData, setPodcastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSections, setOpenSections] = useState([]); // Store the IDs of open sections

  useEffect(() => {
    async function fetchData() {
      try {
        const podcastData = await fetchPodcastData();
        setPodcastData(podcastData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  async function fetchPodcastSpefData(uniqueID) {
    try {
      const response = await fetch(`https://podcast-api.netlify.app/id/${uniqueID}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching CHILD podcast data:", error);
      return [];
    }
  }

  function GetSpesInfo({ uniqueID }) {
    const [childPodcastData, setChildPodcastData] = useState([]);
    const [childLoading, setChildLoading] = useState(true);
    const [childError, setChildError] = useState(null);

    useEffect(() => {
      async function fetchData() {
        try {
          const childData = await fetchPodcastSpefData(uniqueID);
          setChildPodcastData(childData);
          setChildLoading(false);
        } catch (error) {
          setChildError(error);
          setChildLoading(false);
        }
      }

      fetchData();
    }, [uniqueID]);

    const isOpen = openSections.includes(uniqueID);

    const toggleOpen = () => {
      if (isOpen) {
        // If the section is open, close it
        setOpenSections((prevOpenSections) =>
          prevOpenSections.filter((id) => id !== uniqueID)
        );
      } else {
        // If the section is closed, open it and close others
        setOpenSections([uniqueID]);
      }
    };

    if (childLoading) {
      return <div>Loading...</div>;
    }

    if (childError) {
      return <div>Error: {childError.message}</div>;
    }

    return (
      <div>
        <button onClick={toggleOpen}>
          {isOpen ? "Collapse" : "Expand"} {/* Button to collapse/expand */}
        </button>
        {isOpen && (
          <ul>
            {/*collaps this*/}
            {childPodcastData.seasons.map((season) => (
              <li key={`${uniqueID}-${season.title}`}>
                <h1>Season: {season.season}</h1>
                <ul>
                  {season.episodes.map((episode) => (
                    <div>
                      <button>
                        <li key={`${uniqueID}-${season.title}-${episode.title}`}>
                          {episode.title}
                        </li>
                      </button>
                    </div>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <div>
      <h1>Podcast Episodes</h1>
      <ul>
        {podcastData.map((episode) => (
          <li key={episode.id}>
            <h1>
              <a
                href={`https://podcast-api.netlify.app/id/${episode.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {episode.id}
              </a>
            </h1>
            <h2>{episode.title}</h2>
            <p>{episode.description}</p>
            <p>Seasons: {episode.seasons}</p>
            <img src={episode.image} alt={`Episode ${episode.id} Image`} />
            <p>Genres: {episode.genres.join(", ")}</p>
            <p>Updated: {new Date(episode.updated).toLocaleDateString()}</p>
            <h1>Child Info Below:</h1>
            <div id="display_info">
              <GetSpesInfo uniqueID={episode.id} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
