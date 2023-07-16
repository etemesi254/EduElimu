
import { useUserContext } from "../context/UserContext";

function VideosInCourse({ video, index, setSelectedVideo, selectedVideoIndex, setSelectedVideoIndex}){
    const {formatDateTime} = useUserContext();
    return <div onClick={() => {
        setSelectedVideo(video);
        setSelectedVideoIndex(index);
      }} className={`other-video ${index === selectedVideoIndex ? 'selected' : ''}`}>
    <div className="course-poster-container">
        <img src={`http://127.0.0.1:8000/storage/${video.banner_url}`}/>
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

export default VideosInCourse;