import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import TopNavBar from "./topNavBar";
import "./admin.css";

const AdminLayout = ()=>{
    return (
        <>
        <Sidebar/>
        <section id="content">
            <TopNavBar/>
            <main>
                <Outlet/>
            </main>
        </section>
    
        </>
    )
}

export default AdminLayout;