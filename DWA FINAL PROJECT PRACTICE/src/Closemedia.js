export function closeMedia(){
 


    const audiosync = document.getElementById("audioId");
    const media = document.getElementById("media");
    audiosync.pause()
    media.classList.add("hideable");
    


}