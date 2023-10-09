import React, { useState, useEffect } from "react";
import { toggleclass } from "./heart.jsx";
import SortLikes from "./SortByLike.jsx";
import removeHideableClass from "./SortByDefault.jsx";
import sortButton from "./sortAlphaUp.jsx";
import SortDownButton from "./sortZatadown.jsx";

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

  function GetSpesInfo({ uniqueID, episodeImage, isOpen, toggleOpen }) {
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

    if (childLoading) {
      return <button className="expand">{isOpen ? "Expanding" : "Collapsing"}</button>;
    }

    if (childError) {
      return <div>Error: {childError.message}</div>;
    }

    return (
      <div>
        {isOpen && (
          <ul className={`my-content ${isOpen ? "isNowOpen" : ""}`}>
            <img src={episodeImage} alt="Episode Image" className="reimg" />
            {childPodcastData.seasons.map((season) => (
              <li
                key={`season-${uniqueID}-${season.title}`}
                className="orderedList"
              >
                <button onClick={fullcollapse} id="uniqua" className="floatright">
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

  function handleSelectChange(event) {
    const selectedValue = event.target.value;
  
    switch (selectedValue) {
      case "sortAlphaUp":
        sortButton(); // Change to sortButton()
        break;
      case "sortByDefault":
        removeHideableClass(); // Change to removeHideableClass()
        break;
      case "sortByLike":
        SortLikes(); // Change to SortLikes()
        break;
      case "sortZataDown":
        SortDownButton(); // Change to SortDownButton()
        break;
    }}
  
  return (
    <div>
      <h1 className="intro">Listen Along With US</h1>
      <select onChange={handleSelectChange}>
  <option value="sortAlphaUp">Sort Alpha Up</option>
  <option value="sortByDefault">Sort By Default</option>
  <option value="sortByLike">Sort By Like</option>
  <option value="sortZataDown">Sort Zata Down</option>
</select>


      <div className="ulgrid">
        {podcastData.map((episode) => {
          const isOpen = openSections.includes(episode.id);

          const toggleOpen = () => {
            if (isOpen) {
              setOpenSections((prevOpenSections) =>
                prevOpenSections.filter((id) => id !== episode.id)
              );
            } else {
              setOpenSections([...openSections, episode.id]);
            }
          };

          return (
            <div key={`episode-${episode.id}`} id={episode.id} className="mainorder">
              <h1>
                <a
                  href={`https://podcast-api.netlify.app/id/${episode.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {/*episode.id*/}
                </a>
              </h1>
              <button onClick={toggleOpen} className="expand">
                {isOpen ? "Collapse" : "Expand"} {/* Button to collapse/expand */}
              </button>
              <h2 className="titles">{episode.title}</h2>
              <img src={episode.image} alt={`Episode ${episode.id} Image`} className="imga" />
              <p className="descriptions">{episode.description}</p>
              <p>Seasons: {episode.seasons}</p>
              <p>Genres: {episode.genres.join(", ")}</p>
              <p>Updated: {new Date(episode.updated).toLocaleDateString()}</p>
              <button id={`like${episode.id}`} className="heart" onClick={(event) => toggleclass(event.target.id)}></button>
              <div id="display_info">
                <GetSpesInfo
                  uniqueID={episode.id}
                  episodeImage={episode.image}
                  isOpen={isOpen}
                  toggleOpen={toggleOpen}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
