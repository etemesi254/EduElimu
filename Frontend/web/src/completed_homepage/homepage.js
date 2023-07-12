import "./homepage.css";
import HomeContent from "../home_content/home_content";
import LogoutConfirmationDialog from "../user_auth/logoutConfirmation";
import CompleteProfilePrompt from "../user_auth/completeProfilePrompt";
import DeclineCompleteProfile from "../user_auth/declinedCompleteProfile";
import DeleteConfirmation from "../Chanels/deleteConfirmation";

function HomePage({showLogout,setShowLogout,completeProfile, setCompleteProfile, showDeclinePrompt,setShowDeclinePrompt,showDelete,setShowDelete}){
    return (
        <>
              {showLogout &&  <LogoutConfirmationDialog
                setShowLogout={setShowLogout}
              />}
              {showDelete && <DeleteConfirmation/>}
              {completeProfile && <CompleteProfilePrompt setCompleteProfile={setCompleteProfile} setShowDeclinePrompt={setShowDeclinePrompt}/>}
              {showDeclinePrompt && <DeclineCompleteProfile setShowDeclinePrompt={setShowDeclinePrompt}/>}
              <HomeContent/>
        </>
      );
}
export default HomePage;