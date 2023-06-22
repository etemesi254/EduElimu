import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import TopNavBar from "./topNavBar";
import "./admin.css";
import LogoutConfirmationDialog from "../user_auth/logoutConfirmation";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AdminLayout = ({showLogout,setShowLogout})=>{
    const {currentUser} = useAuth();
    const navigate = useNavigate();
    

    useEffect(()=>{
        if(!currentUser){
            navigate('../login');
        }
    })
   
    return (
        <>
        <><Sidebar  showLogout={showLogout} setShowLogout={setShowLogout}/>
        <section id="content">
            <TopNavBar/>
            <main>
            
                <Outlet/>
            </main>
        </section></> 
        
    
        </>
    )
}

export default AdminLayout;