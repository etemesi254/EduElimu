import "./chanel_course.css";
function ChanelVideos({video}){
    return <div>
    <div className="course-poster-container">
        <img src={video.posterImage}/>
    </div>
    <div className="chanel-course-info">
        <h3>{video.title}</h3>
        <div className="video_meta">
            <span className="video_views">{video.views} views</span>
            <span className="video_date">{video.created}</span>
          </div>
    </div>
    </div>
}

export default ChanelVideos;