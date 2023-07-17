import GameProgress from "../Interactive games/game_progress";
import ProgressBar from "../Interactive games/progressbar";
import Loading from "../Loading/loading";
import { useUserContext } from "../context/UserContext";
import MyCoursesComponent from "./myCoursesComp";
import "./mycourses.css";
function AllCourses(){
    const {allCourses} = useUserContext();
    

    if(allCourses.length < 0){
        return <Loading/>
    }

    return <div className="home-image">
    
    <section className="courses-section">
    <h2>All Courses</h2>
        <div className="courses_div">
        {allCourses.map((course,index)=>{
            return <MyCoursesComponent course={course}/>;
        })}
        </div>
    </section>
    </div>
}
export default AllCourses;