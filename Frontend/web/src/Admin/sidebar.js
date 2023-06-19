import {MdWidgets} from "react-icons/md";
import {RiSettings2Fill,RiLogoutCircleFill} from "react-icons/ri";
import {FaUserCircle} from "react-icons/fa";
import {HiUsers} from "react-icons/hi";
import {ImBooks,ImFilm} from "react-icons/im";
import {IoBookSharp} from "react-icons/io5";
import React,{useState} from "react";

const Sidebar = ({setHideSidebar,hideSidebar})=>{
    
    return <section id="sidebar" className={hideSidebar?"hide":""}>
    <a href="#" className="brand">
        <IoBookSharp style={{margin:"0 20px"}}/>
        <span className="text">EduElimu</span>
    </a>
    <ul className="side-menu top">
        <li className="active">
            <a href="#">
                <MdWidgets className="nav-icons"/>
                <span className="text">Dashboard</span>
            </a>
        </li>
        <li>
            <a href="#">
                <HiUsers className="nav-icons"/>
                <span className="text">Users</span>
            </a>
        </li>
        <li>
            <a href="#">
                <ImFilm className="nav-icons"/>
                <span className="text">Videos</span>
            </a>
        </li>
        <li>
            <a href="#">
                <ImBooks className="nav-icons"/>
                <span className="text">Courses</span>
            </a>
        </li>
        <li>
            <a href="#">
                <FaUserCircle className="nav-icons"/>
                <span className="text">Chanels</span>
            </a>
        </li>
    </ul>
    <ul className="side-menu">
        <li>
            <a href="#">
                <RiSettings2Fill className="nav-icons"/>
                <span className="text">Settings</span>
            </a>
        </li>
        <li>
            <a href="#" className="logout">
                <RiLogoutCircleFill className="nav-icons"/>
                <span className="text">Logout</span>
            </a>
        </li>
    </ul>
</section>
}

export default Sidebar;