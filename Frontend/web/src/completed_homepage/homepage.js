import "./homepage.css";
import LeftNavigation from "../left_navigation/left_navigation";
import RightNavigation from "../right_navigation/right_navigation";
import TopNavigation from "../top_navigation/top_navigation";
import HomeContent from "../home_content/home_content";
import Mycourses from "../my_courses/mycourses";
import LogoutConfirmationDialog from "../user_auth/logoutConfirmation";

function HomePage({showLogout,setShowLogout}){
    return (
        <section id='home'>  
            <div id="left-navigation">
                <LeftNavigation id="left-nav" showLogout={showLogout} setShowLogout={setShowLogout}/>
            </div>
            <section id='main-sec'>
                <TopNavigation/>
              {showLogout &&  <LogoutConfirmationDialog
                setShowLogout={setShowLogout}
              />}
              <HomeContent/>
            </section>
            <RightNavigation/>
        </section>
       
      );
}
export default HomePage;