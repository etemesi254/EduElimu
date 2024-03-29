import logo from './logo.svg';
import './App.css';
import LeftNavigation from './left_navigation/left_navigation';

import HomePage from './completed_homepage/homepage';
import VideoPlayer from './main_video_display/main_video';
import YourComponent from './user_auth/register';
import SlidingForm from './user_auth/register';
import RegisterUser from './user_auth/register';
import Loginuser from './user_auth/login';
import Watchlist from './watchlist/watchlist';
import {AuthProvider} from './context/AuthContext';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import PrivateRoute from './context/privateRoute';
import ForgotPassword from './user_auth/forgot_password';
import SignInWithPhone from './user_auth/signinwithno';
import CustomReset from './user_auth/customResetPass';
import {useState} from 'react';
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
import GameSplashScreen from './Interactive games/splash_screen';
import GameDashboard from './Interactive games/game_dash';
import GameLayout from './Interactive games/game_layout';
import UserProfile from './user profile/userprofile';
import CreateChannel from './Chanels/create chanel/create_chanel';
import UploadVideos from './Chanels/create chanel/upload_videos';
import GameCategoryDash from './Interactive games/game_category_dash';
import GameWindow from './Interactive games/game_window';
import {UserProvider} from './context/UserContext';
import ViewChannelList from './Chanels/viewChannelList';
import EditChannel from './Chanels/editChannels';
import ViewVideosList from './Chanels/create chanel/viewVideoList';
import EditVideos from './Chanels/create chanel/edit_video';
import NotFound from './Chanels/not found/notfound';
import ViewChannelDisplay from './Chanels/viewChannelDisplay';
import VideosTables from "./Admin/Tables/VideosTables";
import UsersTable from './Admin/Tables/usersTable';
import VideoCategoriesTable from './Admin/Tables/VideoCategoriesTable';
import AddVideoCategory from './Admin/Forms/addVideoCategories';
import VideoChannelsTable from "./Admin/Tables/ChannelsTable";
import EditVideoCategories from './Admin/Forms/editVideoCategories';
import CoursePlayer from './main_video_display/main_course';
import ViewCourseList from './Chanels/create chanel/viewCourseList';
import EditCourses from './Chanels/create chanel/editCourse';
import CreateCourse from './Chanels/create chanel/create_course';
import AddToCourse from './Chanels/create chanel/add_to_course';
import Mycourses from './my_courses/mycourses';
import { AdminProvider } from './Admin/adminContext';
import AllCourses from './my_courses/allCourses';
import UploadResources from './Chanels/create chanel/uploadResources';

function App() {
    const [showLogout, setShowLogout] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showDeleteVideo, setShowDeleteVideo] = useState(false);

    const [hideSidebar, setHideSidebar] = useState(false);

    const [showDeclinePrompt, setShowDeclinePrompt] = useState(false);

    const hideSideBar = () => {
        return setHideSidebar(!hideSidebar);
    }

    const [completeProfile, setCompleteProfile] = useState(false);

  
  return (
    <Router>
      <AuthProvider>
        <UserProvider>
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
                setShowDelete={setShowDelete}
                showDelete = {showDelete}
                />}/>
                <Route path="/settings" element={<UserSettings showLogout={showLogout} 
              setShowLogout={setShowLogout}/>}/>
              <Route path="/profile" element={<UserProfile showLogout={showLogout} 
              setShowLogout={setShowLogout}/>}/>
              <Route path='/my_courses' element={<Mycourses/>}/>
              <Route path='/all_courses' element={<AllCourses/>}/>
              <Route path="/create_channel" element={<CreateChannel/>}/>
              <Route path="/create_course" element={<CreateCourse/>}/>
              <Route path="/add_to_course" element={<AddToCourse/>}/>
              <Route path='/course/:course' element={<CoursePlayer/>}/>
              <Route path="/edit_channel/:id/:channel" element={<EditChannel/>}/>
              <Route path="/edit_userVideos/:id/:video" element={<EditVideos/>}/>
              <Route path="/edit_userCourses/:id/:course" element={<EditCourses/>}/>
              <Route path='/show_channel_list' element={<ViewChannelList setShowDelete={setShowDelete} showDelete = {showDelete}/>}/>
              <Route path="/upload_videos" element={<UploadVideos/>}/>
              <Route path="/upload_resources" element={<UploadResources/>}/>
              <Route path='/show_video_list' element={<ViewVideosList setShowDeleteVideo={setShowDeleteVideo} showDeleteVideo = {showDeleteVideo}/>}/>
              <Route path='/show_course_list' element={<ViewCourseList setShowDeleteVideo={setShowDeleteVideo} showDeleteVideo = {showDeleteVideo}/>}/>
              <Route path='video_player/:video/' element={<VideoPlayer/>}/>
                <Route path="/chanel/:channel" element={<ChanelLayout/>}>
                  <Route index element={<ChanelDashboard/>}/>
                  <Route path='videos/:videos' element={<ChanelVideoPage/>}/>
                  <Route path='courses/:courses' element={<ChanelCoursesPage/>}/>
                  <Route path='about/:about' element={<ChanelAbout/>}/>
                </Route>
            </Route>
            <Route path='/interactive_games' element={<GameSplashScreen/>}/>
            <Route path='/interactive_games/dashboard' element={<GameLayout/>}>
                <Route exact path='/interactive_games/dashboard' element={<GameDashboard/>}/>
                <Route path='/interactive_games/dashboard/:category/:color/:icon' element={<GameCategoryDash/>}/>
                <Route path='/interactive_games/dashboard/:quiz' element={<GameWindow/>}/>
            </Route>
            <Route path='/register' element={<RegisterUser  completeProfile={completeProfile}
                setCompleteProfile={setCompleteProfile}/>}/>
            <Route path='/login' Component={Loginuser}/>
            <Route path='/forgotPassword' Component={ForgotPassword}/>
            <Route path='/signupwithphone' Component={SignInWithPhone}/>
            <Route path='/resetPassword' Component={CustomReset}/>
            <Route path='/completeProfile' Component={CompleteProfileEmail}/>
          </Routes>
        </UserProvider>
        <AdminProvider>
          <Routes>
          <Route path='/adminLogin' Component={LoginAdmin}/>
            <Route path='/admin' element={<AdminLayout showLogout={showLogout}
                      setShowLogout={setShowLogout}/>}>
                <Route index  element={<MainDash showLogout={showLogout}
                        setShowLogout={setShowLogout}/>}/>
                <Route path="video" Component={VideosTables}></Route>
                <Route path="users-table" Component={UsersTable}></Route>
                <Route path='video-categories' Component={VideoCategoriesTable}></Route>
                <Route path='add-category' Component={AddVideoCategory}></Route>
                <Route path='edit-category/:category' Component={EditVideoCategories}></Route>
                <Route path='channel-table' Component={VideoChannelsTable}></Route>
            </Route>
          </Routes>
        </AdminProvider>
      </AuthProvider>
    </Router>
   
  );

}

export default App;
