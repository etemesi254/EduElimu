import "./homepage.css";
import LeftNavigation from "../left_navigation/left_navigation";
import RightNavigation from "../right_navigation/right_navigation";
import { Outlet } from "react-router-dom";
import TopNavigation from "../top_navigation/top_navigation";

function UserLayout({showLogout,setShowLogout,completeProfile, setCompleteProfile, showDeclinePrompt,setShowDeclinePrompt}){
    return (
        <section id='home'>  
            <div id="left-navigation">
                <LeftNavigation id="left-nav" showLogout={showLogout} setShowLogout={setShowLogout}/>
            </div>
            <section id='main-sec'>
            <TopNavigation/>
                <Outlet/>
            </section>
            <RightNavigation/>
        </section>
       
      );
}
export default UserLayout;