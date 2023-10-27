import React, { useState } from "react";
import { closeMedia } from "./Closemedia";
function pausePlay(buttonText){


    const audiosync = document.getElementById("audioId");
    if (buttonText==="pause"){
    audiosync.pause()

}
else {
        audiosync.play();
    // audiosync.currentTime+=30
    // console.log(audiosync.currentTime)}
    }}
export default function MediaPlayer() {
  const [buttonText, setButtonText] = useState('play');

  const togglePlayPause = () => {
    setButtonText((prevText) => (prevText === 'pause' ? 'play' : 'pause'));
    pausePlay(buttonText)
  };

  return (
    <div id='media' className="ontop hideable">
        <button className="x"id="x" onClick={()=>closeMedia()}>X</button>
      <img src="" alt="Episode Image" className="mediaImage" id="mediaImage"/>
      <button id="playpauseID" className="mediaPlayPause" onClick={togglePlayPause}>
        <h5 className="fonties">{buttonText}</h5>
      </button>
      <h5 className="fonties" id="currentPlay"></h5>
    </div>
  );
}
