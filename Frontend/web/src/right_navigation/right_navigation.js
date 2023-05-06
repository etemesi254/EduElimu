import {AiOutlinePlus} from "react-icons/ai";
import "./right_navigation.css";

function RightNavigation(){
    return <div className="right-nav">
        <div className="add">
            <AiOutlinePlus id="add"/>
        </div>
        <div className="subscribed">
            <img src="https://res.cloudinary.com/diqqf3eq2/image/upload/v1595959131/person-2_ipcjws.jpg" alt='subscribed' />
        </div>
        <div className="subscribed">
            <img src="https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883417/person-3_ipa0mj.jpg" alt='subscribed' />
        </div>
        <div className="subscribed">
            <img src="https://res.cloudinary.com/diqqf3eq2/image/upload/v1595959121/person-1_aufeoq.jpg" alt='subscribed' />
        </div>
        <div className="subscribed">
            <img src="https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883334/person-1_rfzshl.jpg" alt='subscribed' />
        </div>
    </div>
}

export default RightNavigation;