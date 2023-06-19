import {BiSearchAlt2,BiMenu} from "react-icons/bi";
import {BsBell} from "react-icons/bs";
const TopNavBar = ({setHideSidebar,hideSidebar})=>{
    return <nav>
                <BiMenu onClick={setHideSidebar}/>
                <a href="#" class="nav-link">Categories</a>
                <form action="#">
                    <div class="form-input">
                        <input type="search" placeholder="Search..."/>
                        <button type="submit" class="search-btn"><BiSearchAlt2/></button>
                    </div>
                </form>
                <a href="#" class="notification">
                    <BsBell class='bx bxs-bell' />
                    <span class="num">0</span>
                </a>
                <a href="#" class="profile">
                    <img src={process.env.PUBLIC_URL + "/assets/poster (1).jpg"} alt="Zip jacket"/>
                </a>
            </nav>

}
export default TopNavBar;