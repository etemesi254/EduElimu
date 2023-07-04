import { Link } from "react-router-dom";
import React, { useRef } from 'react';
import "./chanel_dash.css"

function ChanelDashboard(){
    const videoRef = useRef(null);

  const playMovie = () => {
    videoRef.current.play();
  }

  const stopMovie = () => {
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  }
    return <>
    <div className="chanel-dashboard-img">
        <img src={process.env.PUBLIC_URL + '/assets/poster (1).jpg'} />
    </div>
    <div className="chanel-details">
        <div className="chanel-profile-pic">
            <img src={process.env.PUBLIC_URL + '/assets/poster (2).jpg'} />
        </div>
        <div className="chanel-dets">
            <h2>Chanel Name</h2>
            <div>
                <p>1452k Subscribers</p>
                <p>637 Videos</p>
                <p>78 Courses</p>
            </div>
            <p>long ass desciption bla bla</p>
        </div>
    </div>
    <div className="mini-nav-bar">
        <div className="mini-nav-bar-link">
            <li>
                <Link to="" className="link">HOME</Link>
            </li>
            <li>
                <Link to="" className="link">VIDEOS</Link>
            </li>
            <li>
                <Link to="" className="link">COURSES</Link>
            </li>
            <li>
                <Link to="" className="link">ABOUT</Link>
            </li>
        </div>
    </div>
    <div className="chanel-page-content">
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
        <div className="chanel-videos">

        </div>
        <div className="chanel-courses">

        </div>
    </div>
    </>
}
export default ChanelDashboard;