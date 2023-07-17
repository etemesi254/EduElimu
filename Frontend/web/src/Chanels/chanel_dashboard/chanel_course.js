import { Link } from "react-router-dom";
import "./chanel_course.css";
import { useUserContext } from "../../context/UserContext";
import { useState, useEffect } from "react";
function ChanelCourse({course}){
    const {getCourseVideos} = useUserContext();
    const [noOfVideos,setNoOfVideos] = useState();

    const link = `/course/${encodeURIComponent(
        JSON.stringify(course)
    )}`

    useEffect(() => {
        const fetchData = async () => {
          const courseVideos = await getCourseVideos(course.id);
          setNoOfVideos(courseVideos.length)
        };
      
        fetchData();
      }, []);

    return <div>
    <div className="course-poster-container">
        <img src={`http://127.0.0.1:8000/storage/${course.course_banner}`}/>
        <div className="course-video-info">
        {noOfVideos === 0 && <p>0 videos</p>}
        {noOfVideos === 1 && <p>1 video</p>}
        {noOfVideos > 1 && <p>{noOfVideos} videos</p>}
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