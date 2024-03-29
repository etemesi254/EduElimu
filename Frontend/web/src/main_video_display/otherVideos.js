
import { useUserContext } from "../context/UserContext";

function OtherVideos({video}){
    const {formatDateTime} = useUserContext();
    return <div>
    <div className="course-poster-container">
        <img src={video.video_banner}/>
    </div>
    <div className="chanel-course-info">
        <h3>{video.video_name}</h3>
        <div className="video_meta">
            <span className="video_views">{video.video_views} views</span>
            <span className="video_date">{formatDateTime(video.created)}</span>
          </div>
    </div>
    </div>
}

export default OtherVideos;