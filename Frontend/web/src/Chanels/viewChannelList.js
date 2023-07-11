import { useUserContext } from "../context/UserContext";
import {BiEditAlt} from "react-icons/bi";
import {MdDeleteOutline} from "react-icons/md";
import {AiOutlineEye} from "react-icons/ai";
import "./viewChannelList.css";
import { Link } from "react-router-dom";

function ViewChannelList(){
    const {channel} = useUserContext();

    return <div className="home-image">
        <div className="view-channel-list">
            <h1>Your Channels Will Appear here!</h1>
            <div className="table-div">
            <table>
                <thead>
                    <tr>
                    <th>Channel Banner</th>
                    <th>Channel Info</th>
                    <th>Channel Stats</th>
                    <th>View Channel</th>
                    <th>Edit Channel</th>
                    <th>Delete Channel</th>
                    </tr>
                </thead>
                <tbody>
                    {channel.map((channel)=>(
                        <tr key={channel.id}>
                        <td>
                            <div className="table-img-div">
                                <img src={`http://127.0.0.1:8000/storage/${channel.banner}`}/>
                            </div>
                        </td>
                        <td>
                            <div className="table-info-div">
                                <div className="table-flex">
                                    <span>Name :</span>
                                    <p>{channel.name}</p>
                                </div>
                                <div className="table-flex">
                                    <span>Description :</span>
                                    <p>{channel.description}</p>
                                </div>
                                
                            </div>
                        </td>
                        <td>
                            <div className="table-info-div">
                                <div className="table-flex">
                                    <span>Students :</span>
                                    <p>{channel.subscribers}</p>
                                </div>
                                <div className="table-flex">
                                    <span>Views :</span>
                                    <p>0</p>
                                </div>
                                
                            </div>
                        </td>
                        <td>
                            <Link to={`/chanel/${channel.id}/${encodeURIComponent(
                                JSON.stringify(channel)
                            )}`} ><AiOutlineEye id="view"/></Link>
                        </td>
                        <td>
                            <Link to={`/edit_channel/${channel.id}/${encodeURIComponent(JSON.stringify(channel))}`}>
                            <BiEditAlt id="edit"/>
                            </Link>
                        </td>
                        <td><MdDeleteOutline id="delete"/></td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>
            </div>

        </div>
    </div>
}

export default ViewChannelList;