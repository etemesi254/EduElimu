import { useState,useEffect } from "react";
import GameProgress from "../Interactive games/game_progress";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function MyCoursesComponent({course}){
    const {user,getUserProgress} = useUserContext();
    const [progress,setProgress] = useState('');
    const navigate = useNavigate();

    function handleCourseClick(){
        navigate(`/course/${encodeURIComponent(
            JSON.stringify(course)
        )}`)
    }

    useEffect(() => {
        const fetchData = async () => {
          const userProgress = await getUserProgress(user.id,course.id);
          setProgress(userProgress);
        };
      
        fetchData();
      }, []);

    return <div className="course_div" onClick={handleCourseClick}>
    <div className="course">
        <div className="course_img">
            <img src={course.course_banner} className=""/>
        </div>
        <div className="course_info">
            <h3>{course.name}</h3>
            <p>{course.description}</p>
            <div className="course_attendants">
                <div className="att">
                    <div className="attendants">
                        <img src="./assets/home (1).jpg" className=""/>
                    </div>
                    <div className="attendants">
                        <img src="./assets/home (2).jpg" className=""/>
                    </div>
                </div>
                <div className="plus">
                    {/* <p>+38 more</p> */}
                    {/* <p>+38 more</p> */}
                </div>
            </div>
        </div>
    </div>
    <div class="progress_div">
        <div className="game-tile-progress">
            <div>
                <span>Progress</span>
                <span> {progress} %</span>
            </div>
        <GameProgress progress = {progress}/>
        </div>
    </div>
</div>
}
export default MyCoursesComponent;