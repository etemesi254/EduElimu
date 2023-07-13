import { useUserContext } from "../context/UserContext";
import {BiEditAlt} from "react-icons/bi";
import {MdDeleteOutline} from "react-icons/md";
import {AiOutlineEye} from "react-icons/ai";
import "./viewChannelList.css";
import { Link } from "react-router-dom";
import DeleteConfirmation from "./deleteConfirmation";
import ViewChannelDisplay from "./viewChannelDisplay";

function ViewChannelList({showDelete,setShowDelete}){
    const {channel} = useUserContext();

   

    return <div className="home-image">
        {showDelete && <DeleteConfirmation showDelete={showDelete} setShowDelete={setShowDelete}/>}
        <div className="view-channel-list">
            <h1>Your Channels Will Appear here!</h1>
            <div className="table-div">
            {channel.map((channel)=>(<ViewChannelDisplay channel={channel} showDelete={showDelete} setShowDelete={setShowDelete} />))}
            </div>

        </div>
    </div>
}

export default ViewChannelList;