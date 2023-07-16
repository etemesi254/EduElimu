import React, { useEffect } from "react";
import { useRef, useState } from "react";
import {BsCollectionPlayFill} from "react-icons/bs";
import {GiClick} from "react-icons/gi";
import {BiLike} from "react-icons/bi";
import {HiSaveAs} from "react-icons/hi";
import ChanelVideos from "../Chanels/chanel_dashboard/chanel_videos";

import "./main_video.css";
import { Link, useParams } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import OtherVideos from "./otherVideos";
import Loading from "../Loading/loading";
import VideosInCourse from "./videos_in_course";

function CoursePlayer() {
    const {course} = useParams();
    const courseData = JSON.parse(decodeURIComponent(course));
    const {id,name,description,created_at} = courseData;
    const {formatDateTime,allVideos,getCourseChannelDetails,getCourseVideos,getCourseResources} = useUserContext();
    const [videos,setVideos] = useState([]);
    const [loading,setLoading] = useState(true);
    const [channel,setChannel] = useState([]);
    const [resources,setResources] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          const courseVideos = await getCourseVideos(id);
          const courseChannel = await getCourseChannelDetails(id);
          const courseResources = await getCourseResources(id);
          setChannel(courseChannel);
          setVideos(courseVideos);
          setResources(courseResources);
          setLoading(false);
        };
      
        fetchData();
      }, []);

    let src = `${process.env.PUBLIC_URL}/assets/video (4).mp4`;
    let posterImage = `${process.env.PUBLIC_URL}/assets/poster (8).jpg`;
    const [readMore, setReadMore] = useState(true);

    const paragraphContent = description || '';

    const truncatedContent = readMore
      ? paragraphContent.slice(0, 250) + "..."
      : paragraphContent;
    

  const toggleReadMore = () => {
    setReadMore((prevReadMore) => !prevReadMore);
  };

  async function downloadResource(id,name) {
    console.log("Downloading");
    try {
      const url = `http://127.0.0.1:8000/api/courses/resource/download/${id}`;
    
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        // Extract the filename from the response headers
        const contentDisposition = response.headers.get('Content-Disposition');
        const match = contentDisposition && contentDisposition.match(/filename="(.*)"/);
        const fileName = match && match[1] ? match[1] : name;
  
        // Get the response blob and create a URL
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
  
        // Create a temporary link element and trigger the download
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.click();
  
        // Clean up the temporary URL
        URL.revokeObjectURL(url);
      } else {
        console.error('Failed to download resource:', response.status);
      }
    } catch (error) {
      console.error('An error occurred while downloading the resource:', error);
    }
  }

  const [selectedVideo, setSelectedVideo] = useState(videos[0]);

    return (
      <>
      {loading ? <Loading/> : <div className="home-image video-dis">
        <div className="video-container-main">
          <div className="video-container">
            <div className="video-play-container">
              <video
                src={`http://127.0.0.1:8000/storage/${videos[0].file_url}`}
                controls
                autoPlay
                poster={`http://127.0.0.1:8000/storage/${videos[0].banner_url}`}
                preload="metadata"
                loop
              />
            </div>
          </div>
          <div className="video-info-div">
            <h3>{name}</h3>
            <div className="video-meta-data">
              <div className="meta-description">
                <div className="meta-chanel-pic">
                  <img src={`http://127.0.0.1:8000/storage/${channel[0].banner}`}/>
                </div>
                <div className="meta-chanel-info">
                  <div className="meta-chanel-name">
                    <h4>{channel[0].name}</h4>
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
                <h5>{formatDateTime(created_at)}</h5>
              </div>
              <div className="desc-div">
                <p id="read-more">{truncatedContent}</p>
                <span onClick={toggleReadMore}>{readMore?"Read More" : "Read Less"}</span>
              </div>
              
            </div>
            <div className="viideo-description-div">
              <div className="stats-meta-data">
                <h5>Course Resources</h5>
              </div>
              <div className="desc-div">
              {resources.map((resource,index)=>{
                return <p
                onClick={() => downloadResource(resource.id,resource.name)}
                style={{
                  cursor: 'pointer',
                  color: 'blue',
                }}
              >
                {resource.name}
              </p>
              
              
            })}
              </div>
              
            </div>
          </div>
        </div>
        <div className="other-videos">
          <div className="videos-like-this">
            <BsCollectionPlayFill id="video-icon"/>
            <p>Videos from the course</p>
          </div>
          <div className="videos-container-column">
          {allVideos.map((video,index)=>{
            return <VideosInCourse video={video} key={video.id}/>
        })}
          </div>
        </div>
      </div>}
      

      </>
  );
}

// CoursePlayer.propTypes = {
//   src: PropTypes.string.isRequired,
// };

export default CoursePlayer;
