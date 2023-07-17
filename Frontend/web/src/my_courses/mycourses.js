import GameProgress from "../Interactive games/game_progress";
import ProgressBar from "../Interactive games/progressbar";
import { useUserContext } from "../context/UserContext";
import MyCoursesComponent from "./myCoursesComp";
import "./mycourses.css";
function Mycourses(){
    const {myCourses} = useUserContext();

    return <div className="home-image">
    
    <section className="courses-section">
    <h2>My Courses</h2>
        <div className="courses_div">
        {myCourses.map((course,index)=>{
            return <MyCoursesComponent course={course}/>;
        })}
        </div>
    </section>
    </div>
}
export default Mycourses;