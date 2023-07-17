import React, { useEffect, useRef, useState } from 'react';
import './home_videos.css';
import { useUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Video = ({video}) => {
  const {formatDateTime,getVideoChannel} = useUserContext();
  const navigate = useNavigate();
  let title = "Whatever you fucking desire";
  let creator="whatever clips";
  let views= "1.2 million";
  let created= "9 months ago";
  let posterImage = `http://127.0.0.1:8000/storage/${video.video_banner}`;
  let videoSource = `http://127.0.0.1:8000/storage/${video.video_file}`;
  let creatorProfile =`${process.env.PUBLIC_URL}/assets/poster (2).jpg`
  const [channel,setChannel] = useState('');

  const videoRef = useRef(null);

  const playMovie = () => {
    videoRef.current.play();
  }

  const stopMovie = () => {
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  }

  function onVideoClick(){
    navigate(`/video_player/${encodeURIComponent(JSON.stringify(video))}`);
  }
  

  return (
    <div className="video" onClick={onVideoClick}>
      <div className='video-div'>
        <video 
          onMouseOver={playMovie}
          onMouseOut={stopMovie}
          ref={videoRef}
          src={video.video_file}
          poster={video.video_banner}
          preload='none'
          loop
        />
      </div>
      <div>{console.log(video.video_banner)}</div>
      <div className="video_info">
        <div className='creator-img'>
          <img src={video.channel_banner}alt='creator-profile'/>
        </div>
        <div className="video_details">
          <h3 className="video_title">{video.video_name}</h3>
          <div className="video_meta">
            <span className="video_creator">{video.channel_name}</span>
            <br/>
            <span className="video_views">{video.video_views} views</span>
            <span className="video_date">{formatDateTime(video.created)}</span>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Video;
