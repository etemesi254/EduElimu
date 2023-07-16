import { Link } from "react-router-dom";
import "./chanel_course.css";
function ChanelCourse({course,noOfVideos}){
    const link = `/course/${encodeURIComponent(
        JSON.stringify(course)
    )}`
    return <div>
    <div className="course-poster-container">
        <img src={`http://127.0.0.1:8000/storage/${course.course_banner}`}/>
        <div className="course-video-info">
        {noOfVideos > 1 ? (
            <p>{noOfVideos} videos</p>
            ) : (
            <p>{noOfVideos} video</p>
            )}
        </div>
    </div>
    <div className="chanel-course-info">
        <h3>{course.name}</h3>
        <p><Link to={link}>view full course
        </Link></p>
    </div>
    </div>
}

export default ChanelCourse;