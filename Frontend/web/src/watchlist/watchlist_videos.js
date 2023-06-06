import "./watchlist_videos.css"
import React, { useRef } from 'react';
import {VscEye} from "react-icons/vsc";
function WatchlistVideos({video}){
    const videoRef = useRef(null);

  const playMovie = () => {
    videoRef.current.play();
  }

  const stopMovie = () => {
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  }
    return <div className="watchlist">
        <div className="watchlist_videodiv">
            <video 
            onMouseOver={playMovie}
            onMouseOut={stopMovie}
            ref={videoRef}
            src={video.videoSource}
            poster={video.posterImage}
            preload='none'
            loop
            />
        </div>
        <div className="watchlist_info">
            <h4 id="title">{video.title}</h4>
            <h4>{video.created}</h4>
            <p>{video.creator}</p>
        </div>
        <div className="watchlist_view">
            <VscEye id="view"/>
        </div>
    </div>
}
export default WatchlistVideos;