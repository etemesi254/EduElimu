// import "./user_settings.css"
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import {FiUploadCloud} from "react-icons/fi";
import {GrFormNext} from "react-icons/gr";
import {MdOutlineSwitchAccount,MdOutlineCreate} from "react-icons/md";
import { toast } from 'react-toastify';
import LogoutConfirmationDialog from "../user_auth/logoutConfirmation";
import { useUserContext } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
function UserProfile({showLogout,setShowLogout}){
    const {user} = useUserContext();
    const navigate = useNavigate();
    
    const displayName = user && user.name ? user.name : (user && user.email ? user.email.split('@')[0] : 'Default Name');

    const displayEmail = user && user.email ? user.email :'Default Email';

    console.log(user);

    function handleViewChannels(){
      navigate("/show_channel_list");
    }

    return <>
    {showLogout &&  <LogoutConfirmationDialog
                setShowLogout={setShowLogout}
              />}
    <div className="settings">
        <div className="img-divv">
            <img src="https://res.cloudinary.com/diqqf3eq2/image/upload/v1595959131/person-2_ipcjws.jpg"/>
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
        <Link to="/upload_videos">
          <div className="videos">
              <div>
                  <FiUploadCloud className="prof-icons"/>
                  <span>Upload Videos</span>
              </div>
              <GrFormNext className="prof-icons"/>
          </div>
        </Link>
        <div className="user-channels">
          <button id="channels" onClick={handleViewChannels}>View your channels</button>
          <button id="videos">View your videos</button>
        </div>
    </div>
    </>

}
export default UserProfile;