import "./homepage.css";
import LeftNavigation from "../left_navigation/left_navigation";
import RightNavigation from "../right_navigation/right_navigation";
import TopNavigation from "../top_navigation/top_navigation";
import HomeContent from "../home_content/home_content";
import Mycourses from "../my_courses/mycourses";
import LogoutConfirmationDialog from "../user_auth/logoutConfirmation";
import CompleteProfilePrompt from "../user_auth/completeProfilePrompt";
import DeclineCompleteProfile from "../user_auth/declinedCompleteProfile";

function HomePage({showLogout,setShowLogout,completeProfile, setCompleteProfile, showDeclinePrompt,setShowDeclinePrompt}){
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
              {completeProfile && <CompleteProfilePrompt setCompleteProfile={setCompleteProfile} setShowDeclinePrompt={setShowDeclinePrompt}/>}
              {showDeclinePrompt && <DeclineCompleteProfile setShowDeclinePrompt={setShowDeclinePrompt}/>}
              <HomeContent/>
            </section>
            <RightNavigation/>
        </section>
       
      );
}
export default HomePage;