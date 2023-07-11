import { Link, useParams } from "react-router-dom";
import React, { useEffect, useRef, useState } from 'react';
import {BsFillPlayFill} from 'react-icons/bs';
import videoData from "../../data/video_data";
import "./chanel_dash.css"
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import ChanelCourse from "./chanel_course";
import ChanelVideos from "./chanel_videos";
import { useUserContext } from "../../context/UserContext";

function ChanelDashboard(){
  const {channel} = useParams();
  const {formatDateTime} = useUserContext();
    const data = JSON.parse(decodeURIComponent(channel));
    const [videos,setVideoes] = useState([]);
    const [loading,setLoading] = useState(true);

    const { id} = data;

    useEffect(() => {
      async function getChannelVideos() {
        try {
          const url = `http://127.0.0.1:8000/api/channels/getChannelVideos/${id}`;
    
          const response = await fetch(url, {
            // mode: 'no-cors',
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
    
          const result = await response.json();
          console.log(result);
          console.log(response.status);
    
          if (response.status === 200) {
            console.log(result.data); // Verify the data from the response
            setVideoes(result.data);
            setLoading(false);
          } else {
            throw new Error("Failed to fetch channel videos");
          }
        } catch (error) {
          console.error("Error:", error.message);
        }
      }
    
      getChannelVideos();
    }, []);
    
  
  // State to track the scroll position and container dimensions
  const [scrollPosition, setScrollPosition] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerScrollWidth, setContainerScrollWidth] = useState(0);

  // Function to scroll the content towards the right
  const scrollRight = () => {
    const container = document.querySelector('.chanel-courses');
    container.scrollBy({ left: containerWidth, behavior: 'smooth' });
  };

  // Function to scroll the content towards the left
  const scrollLeft = () => {
    const container = document.querySelector('.chanel-courses');
    container.scrollBy({ left: -containerWidth, behavior: 'smooth' });
  };

  // Function to handle scrolling and update scroll position and container dimensions
  const handleScroll = () => {
    const container = document.querySelector('.chanel-courses');
    setScrollPosition(container.scrollLeft);
    setContainerWidth(container.clientWidth);
    setContainerScrollWidth(container.scrollWidth);
  };

  useEffect(() => {
    // Add event listener to track scroll position and container dimensions
    const container = document.querySelector('.chanel-courses');
    container.addEventListener('scroll', handleScroll);
    setContainerWidth(container.clientWidth);
    setContainerScrollWidth(container.scrollWidth);
    return () => {
      // Clean up the event listener
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

    const videoRef = useRef(null);
    const [videoss, setVideos] = useState(videoData);
    console.log(videos.length,"length of videos")

  const playMovie = () => {
    videoRef.current.play();
  }

  const stopMovie = () => {
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  }
    return <div className="chanel-page-content">
      {!loading && videoss.length > 0 ? (
         <div className="intro-video-div">
              <div className="video-div">
                  <video
                      className="intro-vid" 
                      onMouseOver={playMovie}
                      onMouseOut={stopMovie}
                      ref={videoRef}
                      src={`http://127.0.0.1:8000/storage/${videos[0].file_url}`}
                      poster={`http://127.0.0.1:8000/storage/${videos[0].banner_url}`}
                      preload='none'
                      loop
                  />
              </div>
              <div className="intro-video-deets">
                  <h4>{videos[0].name}</h4>
                  <div className="stats">
                      <p>{formatDateTime(videos[0].created_at)}</p>
                      <p>{videos[0].view_count} views</p>
                  </div>
                  <div className="intro-video-details">
                      <p>{videos[0].description}Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit, totam tenetur temporibus unde necessitatibus eveniet nesciunt deleniti molestias iusto magni facere suscipit eius fuga sunt nisi quod laudantium cum consectetur!</p>
                  </div>
              </div>
          </div>
    ) : (
      <h2>No videos here</h2>
    )}

{!loading && videoss.length > 0 ? (
         <div className="scrollable-container">
         <div className="chanel-video-head">
             <h2>Videos</h2>
             <BsFillPlayFill className="scroll-icons"/>
             <p>view all</p>
         </div>
         {scrollPosition > 0 && (
         <div className="scroll-button left-scroll" onClick={scrollLeft}>
             <BsArrowLeft className="scroll-icons"/>
         </div>
         )}
         <div className="chanel-courses">
         {videos.slice(1).reverse().map((video, index) => {
            return <ChanelVideos video={video} key={video.id}  />;
          })}

         </div>
         {scrollPosition < containerScrollWidth - containerWidth && (
         <div className="scroll-button right-scroll" onClick={scrollRight}>
             <BsArrowRight  className="scroll-icons"/>
         </div>
         )}
     </div>
    ) : (
      <h2>No videos here</h2>
    )}
    <div className="scrollable-container">
        <div className="chanel-video-head">
            <h2>Courses</h2>
            <BsFillPlayFill className="scroll-icons"/>
            <p>view all</p>
        </div>
        {scrollPosition > 0 && (
        <div className="scroll-button left-scroll" onClick={scrollLeft}>
            <BsArrowLeft className="scroll-icons"/>
        </div>
        )}
        <div className="chanel-courses">
        {videoss.map((video,index)=>{
            return <ChanelCourse video={video} key={video.id}/>
        })}
        </div>
        {scrollPosition < containerScrollWidth - containerWidth && (
        <div className="scroll-button right-scroll" onClick={scrollRight}>
            <BsArrowRight  className="scroll-icons"/>
        </div>
        )}
    </div>
</div>
}
export default ChanelDashboard;