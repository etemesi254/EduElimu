import { Link } from "react-router-dom";
import React, { useEffect, useRef, useState } from 'react';
import {BsFillPlayFill} from 'react-icons/bs';
import videoData from "../../data/video_data";
import "./chanel_dash.css"
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import ChanelCourse from "./chanel_course";
import ChanelVideos from "./chanel_videos";

function ChanelDashboard(){
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
    const [videos, setVideos] = useState(videoData);

  const playMovie = () => {
    videoRef.current.play();
  }

  const stopMovie = () => {
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  }
    return <div className="chanel-page-content">
    <div className="intro-video-div">
        <div className="video-div">
            <video
                className="intro-vid" 
                onMouseOver={playMovie}
                onMouseOut={stopMovie}
                ref={videoRef}
                src={process.env.PUBLIC_URL + '/assets/video (3).mp4'}
                poster={process.env.PUBLIC_URL + '/assets/poster (3).jpg'}
                preload='none'
                loop
            />
        </div>
        <div className="intro-video-deets">
            <h4>Artifical Intelligence and its effects</h4>
            <div className="stats">
                <p>1 year ago</p>
                <p>256k views</p>
            </div>
            <div className="intro-video-details">
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit, totam tenetur temporibus unde necessitatibus eveniet nesciunt deleniti molestias iusto magni facere suscipit eius fuga sunt nisi quod laudantium cum consectetur!</p>
            </div>
        </div>
    </div>
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
        {videos.map((video,index)=>{
            return <ChanelVideos video={video} key={video.id}/>
        })}
        </div>
        {scrollPosition < containerScrollWidth - containerWidth && (
        <div className="scroll-button right-scroll" onClick={scrollRight}>
            <BsArrowRight  className="scroll-icons"/>
        </div>
        )}
    </div>
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
        {videos.map((video,index)=>{
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