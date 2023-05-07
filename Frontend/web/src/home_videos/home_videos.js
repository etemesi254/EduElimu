import React, { useRef } from 'react';
import './videos.css';

const Video = ({video}) => {
  let title = "Whatever you fucking desire";
  let creator="whatever clips";
  let views= "1.2 million";
  let created= "9 months ago";
  let posterImage = `${process.env.PUBLIC_URL}/assets/poster (1).jpg`;
  let videoSource = `${process.env.PUBLIC_URL}/assets/video (1).mp4`;
  let creatorProfile =`${process.env.PUBLIC_URL}/assets/poster (2).jpg`

  const videoRef = useRef(null);

  const playMovie = () => {
    videoRef.current.play();
  }

  const stopMovie = () => {
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  }

  return (
    <div className="video">
      <div className='video-div'>
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
      <div className="video_info">
        <div className='creator-img'>
          <img src={video.creatorProfile} alt='creator-profile'/>
        </div>
        <div className="video_details">
          <h3 className="video_title">{video.title}</h3>
          <div className="video_meta">
            <span className="video_creator">{video.creator}</span>
            <br/>
            <span className="video_views">{video.views} views</span>
            <span className="video_date">{video.created}</span>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Video;
