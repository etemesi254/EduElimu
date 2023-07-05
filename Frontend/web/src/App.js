import logo from './logo.svg';
import './App.css';
import LeftNavigation from './left_navigation/left_navigation';
import TopNavigation from './top_navigation/top_navigation';
import RightNavigation from './right_navigation/right_navigation';
import HomeContent from './home_content/home_content';
import CarouselImage from './carousell/carousell';
import HomePage from './completed_homepage/homepage';
import MainVideoDisplay from './completed_video_display/video_display';
import VideoPlayer from './main_video_display/main_video';
import YourComponent from './user_auth/register';
import SlidingForm from './user_auth/register';
import RegisterUser from './user_auth/register';
import Loginuser from './user_auth/login';
import Watchlist from './watchlist/watchlist';
import { AuthProvider } from './context/AuthContext';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import PrivateRoute from './context/privateRoute';
import ForgotPassword from './user_auth/forgot_password';
import SignInWithPhone from './user_auth/signinwithno';
import CustomReset from './user_auth/customResetPass';
import { useState } from 'react';
import AdminLayout from './Admin/AdminLayout';
import MainDash from './Admin/mainDash';
import CompleteProfileEmail from './user_auth/completeProfile';
import UserSettings from './settings/user_settings';
import UserLayout from './completed_homepage/userLayout';
import LoginAdmin from './Admin/admin_auth/login';
import ChanelDashboard from './Chanels/chanel_dashboard/chanel_dash';
import ChanelLayout from './Chanels/chanel_layout';
import ChanelVideoPage from './Chanels/chanel_dashboard/chanel_videos_page';
import ChanelCoursesPage from './Chanels/chanel_dashboard/chanel_courses_page';
import ChanelAbout from './Chanels/chanel_dashboard/chanel_about';


function App() {
  const [showLogout, setShowLogout] = useState(false);

  const [hideSidebar,setHideSidebar] = useState(false);

  const [showDeclinePrompt,setShowDeclinePrompt] = useState(false);

  const hideSideBar = ()=>{
      return setHideSidebar(!hideSidebar);
  }

  const [completeProfile,setCompleteProfile] = useState(false);

  
  return (
    <Router>
      <AuthProvider>
        <Routes showLogout={showLogout}
            setShowLogout={setShowLogout}>
          <Route path="/" element={<UserLayout  showLogout={showLogout} 
              setShowLogout={setShowLogout}/>}>
            <Route exact path='/' element={<HomePage 
             showLogout={showLogout} 
             setShowLogout={setShowLogout}
              completeProfile={completeProfile}
              setCompleteProfile={setCompleteProfile}
              showDeclinePrompt={showDeclinePrompt}
              setShowDeclinePrompt={setShowDeclinePrompt}
              />}/>
              <Route path="/settings" element={<UserSettings showLogout={showLogout} 
             setShowLogout={setShowLogout}/>}/>
              <Route path="/chanel" element={<ChanelLayout/>}>
                <Route exact path='/chanel'element={<ChanelDashboard/>}/>
                <Route path='videos' element={<ChanelVideoPage/>}/>
                <Route path='courses' element={<ChanelCoursesPage/>}/>
                <Route path='about' element={<ChanelAbout/>}/>
              </Route>
          </Route>
          <Route path='/register' element={<RegisterUser  completeProfile={completeProfile}
              setCompleteProfile={setCompleteProfile}/>}/>
          <Route path='/login' Component={Loginuser}/>
          <Route path='/forgotPassword' Component={ForgotPassword}/>
          <Route path='/signupwithphone' Component={SignInWithPhone}/>
          <Route path='/resetPassword' Component={CustomReset}/>
          <Route path='/adminLogin' Component={LoginAdmin}/>
          <Route path='/admin' element={<AdminLayout showLogout={showLogout} 
              setShowLogout={setShowLogout}/>}>
            <Route exact path='/admin' element={<MainDash showLogout={showLogout} 
             setShowLogout={setShowLogout}/>}/>
          </Route>
          <Route path='/completeProfile' Component={CompleteProfileEmail}/>
        </Routes>
      </AuthProvider>
    </Router>
   
  );
}

export default App;
