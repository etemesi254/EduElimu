import { useState } from 'react';
import "./video_display.css";
import {BiMenuAltLeft} from "react-icons/bi";
import {HiMenuAlt1} from "react-icons/hi";
import VideoPlayer from '../video_player_display/main_video';
import LeftNavDis from '../left_navigation/left_nav_disapearing';
import RightNavigation from "../right_navigation/right_navigation";
import TopNavigation from "../top_navigation/top_navigation";

function MainVideoDisplay() {
  const [isLeftNavActive, setIsLeftNavActive] = useState(false);

  const toggleLeftNav = () => {
    setIsLeftNavActive(!isLeftNavActive);
  };

  return (
    <>
    <section id='home'>
        <div id="left-nav" className={isLeftNavActive ? "active" : ""}>
            <LeftNavDis toggleLeftNav={toggleLeftNav}/>
        </div>
        
        <section id='main-sec'>
        <div id='top-nav'>
            <div className='logo'>
                <h2><HiMenuAlt1 id='close' onClick={toggleLeftNav}/>EduElimu.</h2>
            </div>
            <TopNavigation/>
        </div>
        <div className='video-content'>
            <VideoPlayer/>
        </div>
        </section>
        <RightNavigation/>
    </section>
    </>
  );
}

export default MainVideoDisplay;
