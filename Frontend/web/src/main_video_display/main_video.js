import React from "react";
import { useRef, useState } from "react";
import {AiOutlineFullscreen} from "react-icons/ai"

import "./main_video.css";

function VideoPlayer() {
    let src = `${process.env.PUBLIC_URL}/assets/video (4).mp4`;
    const videoRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [videoTime, setVideoTime] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
  
    const videoHandler = (control) => {
      if (control === "play") {
        videoRef.current.play();
        setPlaying(true);
        var vid = document.getElementById("video1");
        setVideoTime(vid.duration);
      } else if (control === "pause") {
        videoRef.current.pause();
        setPlaying(false);
      }
    };
  
    const fastForward = () => {
      videoRef.current.currentTime += 5;
    };
  
    const revert = () => {
      videoRef.current.currentTime -= 5;
    };

    const toggleFullscreen = () => {
      if (!isFullscreen) {
        videoRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
      setIsFullscreen(!isFullscreen);
    };
  
  
    window.setInterval(function () {
      setCurrentTime(videoRef.current?.currentTime);
      setProgress((videoRef.current?.currentTime / videoTime) * 100);
    }, 1000);
  
    return (
      <div className=''>
        <video
          id="video1"
          ref={videoRef}
          className="main-video"
          src={src}
          controls
        ></video>
{/*   
        <div className="controlsContainer">
        <AiOutlineFullscreen onClick={toggleFullscreen} id="full-screen"/>
          <div className="controls">
            <img
              onClick={revert}
              className="controlsIcon"
              alt=""
              src={`${process.env.PUBLIC_URL}/assets/backward-5.svg`}
            />
            {playing ? (
              <img
                onClick={() => videoHandler("pause")}
                className="controlsIcon--small"
                alt=""
                src={`${process.env.PUBLIC_URL}/assets/pause.svg`}
              />
            ) : (
              <img
                onClick={() => videoHandler("play")}
                className="controlsIcon--small"
                alt=""
                src={`${process.env.PUBLIC_URL}/assets/play.svg`}
              />
              
            )}
            <img
              className="controlsIcon"
              onClick={fastForward}
              alt=""
              src={`${process.env.PUBLIC_URL}/assets/forward-5.svg`}
            />
          </div>
        </div>
  
        <div className="timecontrols">
          <p className="controlsTime">
            {Math.floor(currentTime / 60) +
              ":" +
              ("0" + Math.floor(currentTime % 60)).slice(-2)}
          </p>
          <div className="time_progressbarContainer">
            <div
              style={{ width: `${progress}%` }}
              className="time_progressBar"
            ></div>
          </div>
          <p className="controlsTime">
            {Math.floor(videoTime / 60) +
              ":" +
              ("0" + Math.floor(videoTime % 60)).slice(-2)}
          </p>
        </div> */}
      </div>
  );
}

// VideoPlayer.propTypes = {
//   src: PropTypes.string.isRequired,
// };

export default VideoPlayer;
