import {BiEditAlt} from "react-icons/bi";
import {MdDeleteOutline} from "react-icons/md";
import {AiOutlineEye} from "react-icons/ai";
import {FiShare2} from "react-icons/fi";
import "./viewChannelDisplay.css"
import { useNavigate } from "react-router-dom";

function ViewChannelDisplay({channel,showDelete,setShowDelete}){
    const navigate = useNavigate();
    function view(){
        navigate(`/chanel/${encodeURIComponent(
            JSON.stringify(channel)
        )}`)
    }

    function edit(){
        navigate(`/edit_channel/${channel.id}/${encodeURIComponent(JSON.stringify(channel))}`)
    }

    function handleShowDelete(){
        setShowDelete(true);
        localStorage.setItem("channel_id",channel.id);
    }

    return <div className="view-channel-display-div">
        <div>
        <div className="view-channel-img-div">
            <img src={`http://127.0.0.1:8000/storage/${channel.banner}`}/>
        </div>
        <div className="view-channel-info-div">
            <h3>{channel.name}</h3>
            <p id="para">{channel.description.slice(0,40)} ...</p>
            <div className="view-channel-stats">
                <span><b>Students</b>:&nbsp; <p>{channel.subsrcibers} Students</p></span>
                <span><b>Views</b>:&nbsp; <p>{channel.subsrcibers} Views</p></span>
            </div>
            <div className="view-channel-actions">
                <BiEditAlt id="edit" onClick={edit}/>
                <MdDeleteOutline id="delete" onClick={handleShowDelete}/>
                <AiOutlineEye id="view" onClick={view}/>
                <FiShare2 id="share"/>
            </div>
        </div>
        </div>
    </div>
}
export default ViewChannelDisplay;