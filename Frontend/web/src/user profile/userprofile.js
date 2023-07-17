// import "./user_settings.css"
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import {FiUploadCloud} from "react-icons/fi";
import {GrFormNext} from "react-icons/gr";
import {BiAddToQueue} from "react-icons/bi";
import {BsDatabaseAdd} from "react-icons/bs";
import {MdOutlineSwitchAccount,MdOutlineCreate} from "react-icons/md";
import { toast } from 'react-toastify';
import {GrDocumentUpload} from "react-icons/gr";
import LogoutConfirmationDialog from "../user_auth/logoutConfirmation";
import { useUserContext } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../Loading/loading";

function UserProfile({showLogout,setShowLogout}){
    const {user,channel,userVideos,userCourses} = useUserContext();
    const navigate = useNavigate();

    const [isLoading,setIsLoading] = useState(true);

    useEffect(() => {
      if (user) {
        setIsLoading(false);
      }
    }, [user]);

    if(isLoading){
      return <Loading/>
    }

    const displayName = user && user.name ? user.name : (user && user.email ? user.email.split('@')[0] : 'Default Name');

    const displayEmail = user && user.email ? user.email :'Default Email';

    const displaypic = user && user.profile_image ? `http://127.0.0.1:8000/storage/${user.profile_image}`:`${process.env.PUBLIC_URL}/assets/eduelimu.png`;

    function handleViewChannels(){
      navigate("/show_channel_list");
    }

    function handleViewVideos(){
      navigate("/show_video_list");
    }

    function handleViewCourses(){
      navigate("/show_course_list");
    }

    return <>
    {showLogout &&  <LogoutConfirmationDialog
                setShowLogout={setShowLogout}
              />}
    <div className="settings">
        <div className="img-divv">
            <img src={displaypic}/>
        </div>
        <div className="user_info">
            <h3>{displayName}</h3>
            <p>{displayEmail}</p>
        </div>
    </div>
    <div className="user_settings_form">
        <Link to="/settings">
          <div className="Account">
              <div>
                  <MdOutlineSwitchAccount className="prof-icons"/>
                  <span>Account Details</span>
              </div>
              <GrFormNext className="prof-icons"/>
          </div>
        </Link>
        <Link to="/create_channel">
          <div className="chanel">
              <div>
                  <MdOutlineCreate className="prof-icons"/>
                  <span>Create New Channel</span>
              </div>
              <GrFormNext className="prof-icons"/>
          </div>
        </Link>
        <Link to="/create_course">
          <div className="chanel">
              <div>
                  <BiAddToQueue className="prof-icons"/>
                  <span>Create New Course</span>
              </div>
              <GrFormNext className="prof-icons"/>
          </div>
        </Link>
        <Link to="/upload_videos">
          <div className="videos">
              <div>
                  <FiUploadCloud className="prof-icons"/>
                  <span>Upload Videos to Channel</span>
              </div>
              <GrFormNext className="prof-icons"/>
          </div>
        </Link>
        <Link to="/add_to_course">
          <div className="videos">
              <div>
                  <GrDocumentUpload className="prof-icons"/>
                  <span>Add Videos To Course</span>
              </div>
              <GrFormNext className="prof-icons"/>
          </div>
        </Link>
        <Link to="/upload_resources">
          <div className="videos">
              <div>
                  <BsDatabaseAdd className="prof-icons"/>
                  <span>Add Course Resources</span>
              </div>
              <GrFormNext className="prof-icons"/>
          </div>
        </Link>
        {channel && channel.length > 0 &&<div className="user-channels">
          <button id="channels" onClick={handleViewChannels}>View your channels</button>
          {userVideos && userVideos.length > 0 && <button id="videos" onClick={handleViewVideos}>View your videos</button>}
          {userCourses && userCourses.length > 0 && <button id="channels" onClick={handleViewCourses}>View your Courses</button>}
        </div>}
        
    </div>
    </>

}
export default UserProfile;