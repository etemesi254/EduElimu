import { useUserContext } from "../../context/UserContext";
import {BiEditAlt} from "react-icons/bi";
import {MdDeleteOutline} from "react-icons/md";
import {AiOutlineEye} from "react-icons/ai";
import { Link } from "react-router-dom";
import DeleteConfirmation from "./delete_video";

function ViewVideosList({showDeleteVideo,setShowDeleteVideo}){
    const {userVideos,formatDateTime} = useUserContext();

    function handleshowDeleteVideo(video_id){
        setShowDeleteVideo(true);
        localStorage.setItem("video_id",video_id);
        console.log(showDeleteVideo);
        console.log(localStorage.getItem("video_id"));
    }


    return <div className="home-image">
        {showDeleteVideo && <DeleteConfirmation showDeleteVideo={showDeleteVideo} setShowDeleteVideo={setShowDeleteVideo}/>}
        <div className="view-channel-list">
            <h1>Your Videos Will Appear here!</h1>
            <div className="table-div">
            <table>
                <thead>
                    <tr>
                    <th>Video Poster</th>
                    <th>Video Info</th>
                    <th>Video Stats</th>
                    <th>Edit video</th>
                    <th>Delete video</th>
                    </tr>
                </thead>
                <tbody>
                    {userVideos.map((userVideos)=>(
                        <tr key={userVideos.id}>
                        <td>
                            <div className="table-img-div">
                                <img src={`http://127.0.0.1:8000/storage/${userVideos.banner_url}`}/>
                            </div>
                        </td>
                        <td>
                            <div className="table-info-div">
                                <div className="table-flex">
                                    <span>Name :</span>
                                    <p>{userVideos.name}</p>
                                </div>
                                <div className="table-flex">
                                    <span>Description :</span>
                                    <p>{userVideos.description}</p>
                                </div>
                                
                            </div>
                        </td>
                        <td>
                            <div className="table-info-div">
                                <div className="table-flex">
                                    <span>Views :</span>
                                    <p>{userVideos.view_count}</p>
                                </div>
                                <div className="table-flex">
                                    <span>Created :</span>
                                    <p>{formatDateTime(userVideos.created_at)}</p>
                                </div>
                                
                            </div>
                        </td>
                        <td>
                            <Link to={`/edit_userVideos/${userVideos.id}/${encodeURIComponent(JSON.stringify(userVideos))}`}>
                            <BiEditAlt id="edit"/>
                            </Link>
                        </td>
                        <td onClick={()=>{handleshowDeleteVideo(userVideos.id)}}><MdDeleteOutline id="delete" /></td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>
            </div>

        </div>
    </div>
}

export default ViewVideosList;