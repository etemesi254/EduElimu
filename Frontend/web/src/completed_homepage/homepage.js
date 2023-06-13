import "./homepage.css";
import LeftNavigation from "../left_navigation/left_navigation";
import RightNavigation from "../right_navigation/right_navigation";
import TopNavigation from "../top_navigation/top_navigation";
import HomeContent from "../home_content/home_content";
import Mycourses from "../my_courses/mycourses";

function HomePage(){
    return (
        <section id='home'>
            <div id="left-navigation">
                <LeftNavigation id="left-nav"/>
            </div>
            <section id='main-sec'>
              <TopNavigation/>
              <HomeContent/>
            </section>
            <RightNavigation/>
        </section>
       
      );
}
export default HomePage;