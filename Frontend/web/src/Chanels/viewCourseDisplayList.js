import {BiEditAlt} from "react-icons/bi";
import {MdDeleteOutline} from "react-icons/md";
import {FiShare2} from "react-icons/fi";
import "./viewChannelDisplay.css"
import { useNavigate } from "react-router-dom";
import {AiOutlineEye} from "react-icons/ai";
import { useUserContext } from "../context/UserContext";

function ViewCourseDisplay({userCourses,showDeleteVideo,setShowDeleteVideo}){
    const navigate = useNavigate();

    const {formatDateTime} = useUserContext();

    function edit(){
        navigate(`/edit_userCourses/${userCourses.id}/${encodeURIComponent(JSON.stringify(userCourses))}`)
    }

    function view(){
        
    }

  
    function handleshowDeleteVideo(){
        setShowDeleteVideo(true);
        localStorage.setItem("course_id",userCourses.id);
    }


    return <div className="view-channel-display-div">
        <div>
        <div className="view-channel-img-div">
            <img src={userCourses.course_banner}/>
        </div>
        <div className="view-channel-info-div">
            <h3>{userCourses.name}</h3>
            <p id="para">{userCourses.description.slice(0,40)} ...</p>
            <div className="view-channel-stats">
                <span><b>Created</b>:&nbsp; <p>{formatDateTime(userCourses.created_at)}</p></span>
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
export default ViewCourseDisplay;