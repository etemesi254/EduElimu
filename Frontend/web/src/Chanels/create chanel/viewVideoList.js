import { useUserContext } from "../../context/UserContext";
import {BiEditAlt} from "react-icons/bi";
import {MdDeleteOutline} from "react-icons/md";
import {AiOutlineEye} from "react-icons/ai";
import { Link } from "react-router-dom";
import DeleteConfirmation from "./delete_video";
import ViewVideoDisplay from "../viewVideoDisplay";

function ViewVideosList({showDeleteVideo,setShowDeleteVideo}){
    const {userVideos} = useUserContext();


    return <div className="home-image">
        {showDeleteVideo && <DeleteConfirmation showDeleteVideo={showDeleteVideo} setShowDeleteVideo={setShowDeleteVideo}/>}
        <div className="view-channel-list">
            <h1>Your Videos Will Appear here!</h1>
            <div className="table-div">
            {userVideos.map((userVideos)=>(<ViewVideoDisplay userVideos={userVideos} showDeleteVideo={showDeleteVideo} setShowDeleteVideo={setShowDeleteVideo}/>))}
            
            </div>

        </div>
    </div>
}

export default ViewVideosList;