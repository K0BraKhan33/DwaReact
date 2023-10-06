import React, { useState, useEffect } from "react";

async function fetchPodcastData() {
  try {
    const response = await fetch("https://podcast-api.netlify.app/shows");
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

  function GetSpesInfo({ uniqueID, episodeImage }) {
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
        setOpenSections((prevOpenSections) =>
          prevOpenSections.filter((id) => id !== uniqueID)
        );
      } else {
        setOpenSections([uniqueID]);
      }
    };

    if (childLoading) {
      return <button className="expand">{isOpen ? "Expanding" : "Collapsing"}</button>;
    }

    if (childError) {
      return <div>Error: {childError.message}</div>;
    }

    return (
      <div>
        <button onClick={toggleOpen} className="expand">
          {isOpen ? "Collapse" : "Expand"} {/* Button to collapse/expand */}
        </button>
        {isOpen && (
          <ul className={`my-content ${isOpen ? "isNowOpen" : ""}`} >
            <img src={episodeImage} alt="Episode Image" className="reimg"/>
            {childPodcastData.seasons.map((season) => (
              <li
                key={`season-${uniqueID}-${season.title}`}
                className="orderedList"
               
              >
                <button onClick={fullcollapse} id="uniqua" className="floatright" >
                  Collapse All
                </button>
                
                <h1 className="Season-title">Season: {season.season} ({season.title})</h1>
                <ul>
                  {season.episodes.map((episode) => (
                    <li key={`episode-${uniqueID}-${season.title}-${episode.title}`} className="listopti">
                      <h3 className="he">
                        Season:{season.season} Episode: {episode.episode}
                      </h3>
                      {episode.title}
                    
                      <h5 className="descriptions">{episode.description}</h5>
                      <audio controls>
                        <source src={episode.file} type="audio/mp3" />
                        <h1>{episode.id}</h1>
                      </audio>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  function fullcollapse() {
    setOpenSections([]);
  }

  return (
    <div>
      <h1 style={{ marginLeft: "33%" }}>Listen Along With US</h1>
      <ul className="ulgrid">
        {podcastData.map((episode) => (
          <li key={`episode-${episode.id}`} id={episode.id} className="mainorder">
            <h1>
              <a
                href={`https://podcast-api.netlify.app/id/${episode.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {/*episode.id*/}
              </a>
            </h1>
            <h2 className="titles">{episode.title}</h2>
            <img src={episode.image} alt={`Episode ${episode.id} Image`} className="imga" />
            <p className="descriptions">{episode.description}</p>
            <p>Seasons: {episode.seasons}</p>
            <p>Genres: {episode.genres.join(", ")}</p>
            <p>Updated: {new Date(episode.updated).toLocaleDateString()}</p>
            <div id="display_info">
              <GetSpesInfo uniqueID={episode.id} episodeImage={episode.image} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
