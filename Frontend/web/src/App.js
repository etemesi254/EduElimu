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


function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route exact path="/" Component={HomePage} />
          <Route path='/register' Component={RegisterUser}/>
          <Route path='/login' Component={Loginuser}/>
          <Route path='/forgotPassword' Component={ForgotPassword}/>
          <Route path='/signupwithphone' Component={SignInWithPhone}/>
          <Route path='/resetPassword' Component={CustomReset}/>
        </Routes>
      </AuthProvider>
    </Router>
   
  );
}

export default App;
