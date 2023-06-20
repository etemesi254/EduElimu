import "./homepage.css";
import HomeContent from "../home_content/home_content";
import LogoutConfirmationDialog from "../user_auth/logoutConfirmation";
import CompleteProfilePrompt from "../user_auth/completeProfilePrompt";
import DeclineCompleteProfile from "../user_auth/declinedCompleteProfile";

function HomePage({showLogout,setShowLogout,completeProfile, setCompleteProfile, showDeclinePrompt,setShowDeclinePrompt}){
    return (
        <>
              {showLogout &&  <LogoutConfirmationDialog
                setShowLogout={setShowLogout}
              />}
              {completeProfile && <CompleteProfilePrompt setCompleteProfile={setCompleteProfile} setShowDeclinePrompt={setShowDeclinePrompt}/>}
              {showDeclinePrompt && <DeclineCompleteProfile setShowDeclinePrompt={setShowDeclinePrompt}/>}
              <HomeContent/>
        </>
      );
}
export default HomePage;