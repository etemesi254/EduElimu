import { useUserContext } from "../../context/UserContext";
import {BiEditAlt} from "react-icons/bi";
import {MdDeleteOutline} from "react-icons/md";
import {AiOutlineEye} from "react-icons/ai";
import { Link } from "react-router-dom";
import DeleteConfirmation from "./delete_video";
import ViewVideoDisplay from "../viewVideoDisplay";
import ViewCourseDisplay from "../viewCourseDisplayList";

function ViewCourseList({showDeleteVideo,setShowDeleteVideo}){
    const {userCourses} = useUserContext();


    return <div className="home-image">
        {showDeleteVideo && <DeleteConfirmation showDeleteVideo={showDeleteVideo} setShowDeleteVideo={setShowDeleteVideo}/>}
        <div className="view-channel-list">
            <h1>Your Courses Will Appear here!</h1>
            <div className="table-div">
            {userCourses.map((userCourses)=>(<ViewCourseDisplay userCourses={userCourses} showDeleteVideo={showDeleteVideo} setShowDeleteVideo={setShowDeleteVideo}/>))}
            
            </div>

        </div>
    </div>
}

export default ViewCourseList;