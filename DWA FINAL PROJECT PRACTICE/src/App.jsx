import React, { useState, useEffect } from "react";
import { toggleclass } from "./heart.jsx";
import sortLikes from "./SortByLike.jsx";
import removeHideableClass from "./SortByDefault.jsx";
import sortButton from "./sortAlphaUp.jsx";
import sortDownButton from "./sortZatadown.jsx";
import sortByGenre from "./SortByGenre";

const genreMap = {
  1: "Personal Growth",
  2: "True Crime and Investigative Journalism",
  3: "History",
  4: "Comedy",
  5: "Entertainment",
  6: "Business",
  7: "Fiction",
  8: "News",
  9: "Kids and Family",
};



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

  function GetSpesInfo({ uniqueID, episodeImage, isOpen, toggleOpen, episode }) {
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
                  Close Podcast
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
        sortButton(podcastData, setPodcastData); // Change to sortButton()
        break;
      case "sortByDefault":
        removeHideableClass(); // Change to removeHideableClass()
        break;  
      case "sortByLike":
        sortLikes(); // Change to SortLikes()
        break;
      case "sortZataDown":
        sortDownButton(podcastData, setPodcastData); // Change to SortDownButton()
        break;
    }
  }
  function logout(){
   const boollog= window.confirm(['Are you sure you want to log out'])
if (boollog){
    window.location.href="/login"}
  }

  return (
    <div>

      <h1 className="intro"><img className="logo_l"type="png" src="./favicon_package_v0.16/android-chrome-512x512.png"></img> Listen Along With US <img className="logo"type="png" src="./favicon_package_v0.16/android-chrome-512x512.png"></img></h1>
      <button onClick={ logout}>Log out</button>
      <select onChange={handleSelectChange}>
        <option value="sortByDefault">Sort By Default</option>
        <option value="sortByLike">Sort By Like</option>
        <option value="sortZataDown">Sort Alpha Down</option>
        <option value="sortAlphaUp">Sort Alpha Up</option>
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
            <div key={`episode-${episode.id}`} id={episode.id} className="mainorder" >
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
              <button onClick={toggleOpen} className="expand">
                {isOpen ? "Collapse" : "Expand"} {/* Button to collapse/expand */}
              </button>
              <p className="descriptions">{episode.description}</p>
              <p>Seasons: {episode.seasons}</p>
              <p>
            Genres:</p>
            <div>
  {episode.genres.map((genreId, index) => (
    <h2 className="genres" id={`${episode.id}_${genreId}`} onClick={(e) => sortByGenre(e.currentTarget.id, podcastData, setPodcastData)} key={index}>
      <span>{genreMap[genreId]}</span>
    </h2>
  ))}
</div>
<button id={`like${episode.id}`} className="heart" onClick={(event) => toggleclass(event.target.id)}></button>

              <p>Updated: {new Date(episode.updated).toLocaleDateString()}</p>
              <div id="display_info">
                <GetSpesInfo
                  uniqueID={episode.id}
                  episodeImage={episode.image}
                  isOpen={isOpen}
                  toggleOpen={toggleOpen}
                  episode={episode} 
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
