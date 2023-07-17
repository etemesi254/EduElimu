import React, { useEffect } from "react";
import { useRef, useState } from "react";
import {BsCollectionPlayFill} from "react-icons/bs";
import {GiClick} from "react-icons/gi";
import {BiLike} from "react-icons/bi";
import {HiSaveAs} from "react-icons/hi";
import { toast } from 'react-toastify';
import {TiTick} from 'react-icons/ti';

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
    const {formatDateTime,user,getCourseChannelDetails,getCourseVideos,getCourseResources} = useUserContext();
    const [videos,setVideos] = useState([]);
    const [loading,setLoading] = useState(true);
    const [channel,setChannel] = useState([]);
    const [resources,setResources] = useState([]);
    const [marked,setMarked] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState("");
    const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);

    async function markAsDone(){
        setMarked(true);
        const formData = new FormData();
        formData.append("user_id", user.id);
        formData.append("course_id", id);
        formData.append("video_id",selectedVideo.id);
        try {
            const url = `http://127.0.0.1:8000/api/courses/markAsDone`;
        
            const response = await fetch(url, {
              method: "POST",
              body: formData
            });
      
            console.log(response)
        
            if (response.ok) {
                return toast.success('Video Marked As Done');
            } else {
              return toast.error('An error has occurred');
            }
          } catch (error) {
            console.error("Error:", error.message);
            return toast.error('An error has occurred',error.message);
          }
    }


    useEffect(() => {
        const fetchData = async () => {
          const courseVideos = await getCourseVideos(id);
          const courseChannel = await getCourseChannelDetails(id);
          const courseResources = await getCourseResources(id);
          setChannel(courseChannel);
          setVideos(courseVideos);
          setSelectedVideo(courseVideos[0]);
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

  async function enrollToCourse(){
    const formData = new FormData();
    formData.append("user_id",user.id);
    formData.append("course_id",id);
    console.log(user.id,id);
    try {
        const url = `http://127.0.0.1:8000/api/courses/addStudentsToCourse`;
      
        const response = await fetch(url, {
          method: "POST",
          body: formData,
        });

        console.log(response.message,"response")
    
        if (response.ok) {
            return toast.success('You Have been enrolled successfully');
        } else {
          console.error('Failed to enroll you to course:', response.status);
          return toast.error('Failed to enroll you to course:');
        }
      } catch (error) {
        console.error('An error occurred while enrolling you to course:', error);
        return toast.error('Failed to enroll you to course:');

      }
  }

  async function viewResource(resourseLink) {
    console.log(resourseLink);
    const newTab = window.open(resourseLink, '_blank');
    if (newTab) {
      newTab.focus();
    }
  }
  
    return (
      <>
      {loading ? <Loading/> : <div className="home-image video-dis">
        <div className="video-container-main">
          <div className="video-container">
            <div className="video-play-container">
              <video
                src={selectedVideo.file_url}
                controls
                autoPlay
                poster={selectedVideo.banner_url}
                preload="metadata"
                loop
              />
            </div>
          </div>
          <div className="video-info-div">
            <h3>{selectedVideo.name}</h3>
            <div className="video-meta-data">
              <div className="meta-description">
                <div className="meta-chanel-pic">
                  <img src={channel[0].banner}/>
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
              <div onClick={markAsDone}
                className="join-chanel"
                style={{
                    color: marked ? 'white' : 'green',
                    backgroundColor: marked ? 'green' : 'white',
                    outline: `2px solid ${marked ? 'green' : 'initial'}`,
                    color: marked ? 'white' : 'green',
                }}
                >
                <TiTick className="meta-icons" />
                <p>{marked ? 'Mark Not Done' : 'Mark As Done'}</p>
                </div>

                <div className="join-chanel">
                  <GiClick className="meta-icons"/>
                  <p>Join Chanel</p>
                </div>
                <div className="save-video" onClick={enrollToCourse}>
                  <HiSaveAs className="meta-icons"/>
                  <p>Add Course</p>
                </div>
              </div>
            </div>
            <div className="viideo-description-div">
              <div className="stats-meta-data">
                <h5>{name}</h5>
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
                onClick={() => viewResource(resource.resource)}
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
          {videos.map((video,index)=>{
            return <VideosInCourse video={video} key={video.id} index={index} setSelectedVideo={setSelectedVideo} selectedVideoIndex={selectedVideoIndex} setSelectedVideoIndex={setSelectedVideoIndex}/>
        })}
          </div>
        </div>
      </div>}
      

      </>
  );
}
export default CoursePlayer;
