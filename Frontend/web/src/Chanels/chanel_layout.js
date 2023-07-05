import { Link, Outlet } from "react-router-dom";
import React from 'react';


function ChanelLayout(){

    return <div className="home-image">
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
    <Outlet/>
    </div>
}
export default ChanelLayout;