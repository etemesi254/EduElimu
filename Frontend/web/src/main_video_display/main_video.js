import React from "react";
import { useRef, useState } from "react";
import {BsCollectionPlayFill} from "react-icons/bs";
import {GiClick} from "react-icons/gi";
import {BiLike} from "react-icons/bi";
import {HiSaveAs} from "react-icons/hi";
import ChanelVideos from "../Chanels/chanel_dashboard/chanel_videos";

import "./main_video.css";
import { useParams } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import OtherVideos from "./otherVideos";

function VideoPlayer() {
    const {video} = useParams();
    const videoData = JSON.parse(decodeURIComponent(video));
    const {formatDateTime,allVideos} = useUserContext();

    let src = `${process.env.PUBLIC_URL}/assets/video (4).mp4`;
    let posterImage = `${process.env.PUBLIC_URL}/assets/poster (8).jpg`;
    const videoRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [readMore, setReadMore] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [videoTime, setVideoTime] = useState(0);
    const [progress, setProgress] = useState(0);

    const paragraphContent = videoData?.video_desc || '';
    console.log(videoData);

    const truncatedContent = readMore
      ? paragraphContent.slice(0, 250) + "..."
      : paragraphContent;
    

  const toggleReadMore = () => {
    setReadMore((prevReadMore) => !prevReadMore);
  };
  
  
    return (
      <>
      <div className="home-image video-dis">
        <div className="video-container-main">
          <div className="video-container">
            <div className="video-play-container">
              <video
                src={videoData.video_file}
                controls
                autoPlay
                poster={videoData.video_banner}
                preload="metadata"
                loop
              />
            </div>
          </div>
          <div className="video-info-div">
            <h3>{videoData.video_name}</h3>
            <div className="video-meta-data">
              <div className="meta-description">
                <div className="meta-chanel-pic">
                  <img src={videoData.channel_banner}/>
                </div>
                <div className="meta-chanel-info">
                  <div className="meta-chanel-name">
                    <h4>{videoData.channel_name}</h4>
                  </div>
                  <div className="meta-chanel-students">
                    <p>0 Students</p>
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
                <h5>{videoData.video_views} views</h5>
                <h5>{formatDateTime(videoData.created)}</h5>
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
          {allVideos.map((video,index)=>{
            return <OtherVideos video={video} key={video.id}/>
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
