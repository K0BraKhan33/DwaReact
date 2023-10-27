//App.jsx
import React, { useState, useEffect } from "react";
import { toggleclass } from "./heart.jsx";
import sortLikes from "./SortByLike.jsx";
import removeHideableClass from "./SortByDefault.jsx";
import sortButton from "./sortAlphaUp.jsx";
import sortDownButton from "./sortZatadown.jsx";
import sortByGenre from "./SortByGenre.js";
import { useLocation, useSearchParams } from 'react-router-dom';
import Fuse from 'fuse.js'
import { fuzzySearch } from "./fuzzy_search.js";
import { fetchData } from "./advance.js";
import MediaPlayer from "./mediaPlayer.jsx";
import Greetings from "./faidOutGreet.jsx";
const searchParams = new URLSearchParams(location.search);
const username = searchParams.get('username');
const password = searchParams.get('password');
import { createClient } from '@supabase/supabase-js';
import { resetUserLikes } from "./reset.js";


  const supabaseUrl = 'https://fguewcoipjtuyqdrcbyn.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZndWV3Y29pcGp0dXlxZHJjYnluIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc2MzI3NTMsImV4cCI6MjAxMzIwODc1M30.nFtZKKkIdw5OnJ7WKg0Zgfg0qDZCwUBfoAMKApZTdEA'


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
  const [searchParams] = useSearchParams();
  const [datalikes,setdata] = useState([]);
  const [searchParam, setParam]=useState('');
  const username = searchParams.get('username');
  const password = searchParams.get('password');


 
  

  useEffect(() => {
    async function fetchData() {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey);
        const { data, e } = await supabase
        .from('Logins')
        .select('User_likes')
        .eq('UserName', username)
        .eq('Password', password);
        const userLikes=data;
        setdata(userLikes);
     
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


  if (loading) {
    return <Greetings />;
  }





const titlesArray = podcastData.map(podcast => podcast.title);



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
    const [podcastId, setID] = useState('');
    const [childPodcastData, setChildPodcastData] = useState([]);
    const [childLoading, setChildLoading] = useState(true);
    const [childError, setChildError] = useState(null);


    useEffect(() => {
      setID(uniqueID)
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
      return <h3>internal files loading</h3>;
    }

    if (childError) {
      return <div>Error: {childError.message}</div>;
    }
function sendSource(buttonSource,btnID){


            
    
  // Add a click event listener to the button
 
      // Change the src attribute of the image when the button is clicked
   const posStart=buttonSource.indexOf("^")+1
   const posEnd = buttonSource.indexOf("#")
   const result  = buttonSource.substring(posStart,posEnd)
  
   //if play then display
   

  const audiosync = document.getElementById("audioId");
  const image = document.getElementById("mediaImage");
  const currentPlaying = document.getElementById("currentPlay")
 
  const soundDiv= document.getElementById("media")
  currentPlaying.innerText=`season: ${result.split('_')[0]} episode ${result.split('_')[1]}`




  audiosync.src = buttonSource.split('#')[1];
  image.src = buttonSource.split('^')[0];
  audiosync.play()
  if (!audiosync.paused){
 
    soundDiv.classList.remove("hideable")
  }

  
}
    return (
      <div>
        {isOpen && (
          <ul className={`my-content ${isOpen ? "isNowOpen" : ""}`}>
            <img src={episodeImage} alt="Episode Image" className="reimg" />
            {childPodcastData.seasons.map((season) => (
              <li
                key={`season-${uniqueID}-${season.title}-${season.season}`}
                className="orderedList"
              >
                <button onClick={fullcollapse} id="uniqua" className="floatright">
                  Close Podcast
                </button>
                <h1 className="Season-title">Season: {season.season} ({season.title})</h1>
                <ul>
                  {season.episodes.map((episode) => (
                    <li key={`episode-${uniqueID}-${season.title}-${episode.title}-${episode.episode}`} className="listopti">
                      <h3 className="he">
                        Season:{season.season} Episode: {episode.episode}
                      </h3>
                      {episode.title}
                      <h5 className="descriptions">{episode.description}</h5>{`${podcastId}${season.season}${episode.episode}_${episode.file}`}
                      <button id={`${episodeImage}^${season.season}_${episode.episode}#${episode.file}`} onClick={(e)=>{sendSource(e.target.id)}}> </button>
                      
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


  function searchBar(){

      const searchResult=fuzzySearch(titlesArray,searchParam)
        // get back id by tital
        let idsArray=[];
        for (const setammount of searchResult ){

         for (const podcast of podcastData){
          if (podcast.title === setammount.item)
          idsArray.push(podcast.id)
       
          
        }
        
        }
        
          for (const setammount of searchResult) {
           
            
        
            // Loop through components and manipulate their classes
            podcastData.forEach((podcast) => {
              const element = document.getElementById(podcast.id);
        
              if (element) {
                for (const lengths of idsArray){
                
                if (idsArray.includes(element.id)) {
                  
                  
                  element.classList.remove("hideable"); // Remove "hideable" class
                } else {
                  element.classList.add("hideable"); // Add "hideable" class
                }
              }
              }
            });
        }
      
   
      }

      /* 
     loop through componenets Id where not in idsArray then add class hideable and if  in ids array check if the conponent in ids array has hideable and if it does remove it
      
      
      */



  return (
  
    <div> 
             <div className="dropdown">
        <button>Menu</button>
        <div className="dropdown-content">
        <h3>Search:<input type="text" onChange={(e) => searchBar(setParam(e.target.value))}/></h3>
        <select onChange={handleSelectChange}>
        <option value="sortByDefault">Sort By Default</option>
        <option value="sortByLike">Sort By Like</option>
        <option value="sortZataDown">Sort Alpha Down</option>
        <option value="sortAlphaUp">Sort Alpha Up</option>
      </select> 
            <button onClick={ logout}>Log out</button>
            <button onClick={ ()=>resetUserLikes(username,password)}>Reset likes</button>
        </div>
    </div>
     <audio id="audioId" src=" " autoPlay style={{opacity:'0%'}}></audio>
     
      <h1 className="intro"><img className="logo_l"type="png" src="./favicon_package_v0.16/android-chrome-512x512.png"></img> Listen Along With US <img className="logo"type="png" src="./favicon_package_v0.16/android-chrome-512x512.png"></img></h1>
    

      <div className="ulgrid">
        {podcastData.map((episode) => {
          const isOpen = openSections.includes(episode.id);

          function imgChange(btnID){
            const image = document.getElementById("mediaImage"  );
            
    
            // Add a click event listener to the button
           
                // Change the src attribute of the image when the button is clicked
                image.src = btnID.slice(3);

          }

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

       
              <h2 className="titles">{episode.title} </h2>
      
              <div className="dropdown">
        <button>Genres</button>
        <div className="dropdown-content">
                {episode.genres.map((genreId, index) => (
    <h2 className="genres" id={`${episode.id}_${genreId}`} onClick={(e) => sortByGenre(e.currentTarget.id, podcastData, setPodcastData)} key={index}>
      <span>{genreMap[genreId]}</span>
    </h2>
  ))}
  
  </div>
  
  </div>
              <img src={episode.image} alt={`Episode ${episode.id} Image`} className="imga" />
            
              <button onClick={(e)=>toggleOpen()} className="expand" id={`btn${episode.image}`}>
                {isOpen ? "Collapse" : "Expand"} {/* Button to collapse/expand */}
              </button>
              <p className="descriptions">{episode.description}</p>
              <p>Seasons: {episode.seasons}</p>
              
              
            
            <div>

</div>



              <p>Updated: {new Date(episode.updated).toLocaleDateString()}</p>
              <button
  id={`like${episode.id}`}
  className={datalikes[0].User_likes.split(',').includes(`like${episode.id}`) ? "heart_like" : "heart"}
  onClick={() => toggleclass(`like${episode.id}`, username, password)}
></button>
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
      <MediaPlayer/>
    </div>
  );
}

export default App;
