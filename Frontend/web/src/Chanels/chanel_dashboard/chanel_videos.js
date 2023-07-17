import "./chanel_course.css";
import { useUserContext } from "../../context/UserContext";

function ChanelVideos({video}){
    const {formatDateTime} = useUserContext();
    return <div>
    <div className="course-poster-container">
        <img src={video.banner_url}/>
    </div>
    <div className="chanel-course-info">
        <h3>{video.name}</h3>
        <div className="video_meta">
            <span className="video_views">{video.view_count} views</span>
            <span className="video_date">{formatDateTime(video.created_at)}</span>
          </div>
    </div>
    </div>
}

export default ChanelVideos;