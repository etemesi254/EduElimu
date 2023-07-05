import "./chanel_course.css";
function ChanelCourse({video}){
    return <div>
    <div className="course-poster-container">
        <img src={video.posterImage}/>
        <div className="course-video-info">
            <p>25 videos</p>
        </div>
    </div>
    <div className="chanel-course-info">
        <h3>{video.title}</h3>
        <p>view full course</p>
    </div>
    </div>
}

export default ChanelCourse;