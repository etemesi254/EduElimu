import {BiEditAlt} from "react-icons/bi";
import {MdDeleteOutline} from "react-icons/md";
import {FiShare2} from "react-icons/fi";
import "./viewChannelDisplay.css"
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

function ViewVideoDisplay({userVideos,showDeleteVideo,setShowDeleteVideo}){
    const navigate = useNavigate();

    const {formatDateTime} = useUserContext();

    function edit(){
        navigate(`/edit_userVideos/${userVideos.id}/${encodeURIComponent(JSON.stringify(userVideos))}`)
    }

  
    function handleshowDeleteVideo(){
        setShowDeleteVideo(true);
        localStorage.setItem("video_id",userVideos.id);
    }


    return <div className="view-channel-display-div">
        <div>
        <div className="view-channel-img-div">
            <img src={`http://127.0.0.1:8000/storage/${userVideos.banner_url}`}/>
        </div>
        <div className="view-channel-info-div">
            <h3>{userVideos.name}</h3>
            <p id="para">{userVideos.description.slice(0,40)} ...</p>
            <div className="view-channel-stats">
                <span><b>Created</b>:&nbsp; <p>{formatDateTime(userVideos.created_at)}</p></span>
                <span><b>Views</b>:&nbsp; <p>{userVideos.view_count} Views</p></span>
            </div>
            <div className="view-channel-actions">
                <BiEditAlt id="edit" onClick={edit}/>
                <MdDeleteOutline id="delete" onClick={handleshowDeleteVideo}/>
                <FiShare2 id="share"/>
            </div>
        </div>
        </div>
    </div>
}
export default ViewVideoDisplay;