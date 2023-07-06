import React from "react";
import { useRef, useState } from "react";
import videoData from "../data/video_data";
import {BsCollectionPlayFill} from "react-icons/bs";
import {GiClick} from "react-icons/gi";
import {BiLike} from "react-icons/bi";
import {HiSaveAs} from "react-icons/hi";
import ChanelVideos from "../Chanels/chanel_dashboard/chanel_videos";

import "./main_video.css";

function VideoPlayer() {
    const [videos, setVideos] = useState(videoData);
    let src = `${process.env.PUBLIC_URL}/assets/video (4).mp4`;
    let posterImage = `${process.env.PUBLIC_URL}/assets/poster (8).jpg`;
    const videoRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [readMore, setReadMore] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [videoTime, setVideoTime] = useState(0);
    const [progress, setProgress] = useState(0);

    const paragraphContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum vestibulum turpis, eget eleifend eros fermentum ac. Sed quis mauris sit amet ante feugiat lacinia vel vel massa. Duis consectetur, ipsum ut condimentum efficitur, nulla eros consequat lectus, ac pellentesque elit mauris ac lectus. Integer fermentum magna non magna tincidunt, ac eleifend nisl finibus. Cras consectetur ligula vel lectus varius, vel euismod tortor semper. Phasellus luctus ligula sit amet erat suscipit, vel commodo ligula lacinia. Ut ullamcorper iaculis diam, at hendrerit nisl aliquet ac. In hac habitasse platea dictumst. Nulla at turpis orci. Curabitur vulputate magna eu nisl fringilla, vitae scelerisque lacus ultrices.";

  const truncatedContent = readMore
    ? paragraphContent.slice(0, 250) + "..."
    : paragraphContent;

  const toggleReadMore = () => {
    setReadMore((prevReadMore) => !prevReadMore);
  };
  
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
  
    window.setInterval(function () {
      setCurrentTime(videoRef.current?.currentTime);
      setProgress((videoRef.current?.currentTime / videoTime) * 100);
    }, 1000);
  
    return (
      <>
      <div className="home-image video-dis">
        <div className="video-container-main">
          <div className="video-container">
            <div className="video-play-container">
              <video
                src={src}
                controls
                autoPlay
                poster={posterImage}
                preload="metadata"
                loop
              />
            </div>
          </div>
          <div className="video-info-div">
            <h3>Videography: Learn how to take cool videos</h3>
            <div className="video-meta-data">
              <div className="meta-description">
                <div className="meta-chanel-pic">
                  <img src={posterImage}/>
                </div>
                <div className="meta-chanel-info">
                  <div className="meta-chanel-name">
                    <h4>The Why Files</h4>
                  </div>
                  <div className="meta-chanel-students">
                    <p>245K Students</p>
                  </div>
                </div>
              </div>
              <div className="actions-div">
                <div className="join-chanel">
                  <GiClick className="meta-icons"/>
                  <p>Join Chanel</p>
                </div>
                <div className="like-video">
                  <BiLike className="meta-icons"/>
                  <p>Like</p>
                </div>
                <div className="save-video">
                  <HiSaveAs className="meta-icons"/>
                  <p>Save</p>
                </div>
              </div>
            </div>
            <div className="viideo-description-div">
              <div className="stats-meta-data">
                <h5>256 views</h5>
                <h5>2 weeks ago</h5>
              </div>
              <div className="desc-div">
                <p id="read-more">{truncatedContent}</p>
                <span onClick={toggleReadMore}>{readMore?"Read More" : "Read Less"}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="other-videos">
          <div className="videos-like-this">
            <BsCollectionPlayFill id="video-icon"/>
            <p>Videos you might like</p>
          </div>
          <div className="videos-container-column">
          {videos.map((video,index)=>{
            return <ChanelVideos video={video} key={video.id}/>
        })}
          </div>
        </div>
      </div>
      

      </>
  );
}

// VideoPlayer.propTypes = {
//   src: PropTypes.string.isRequired,
// };

export default VideoPlayer;
