import { useState } from "react";
import videoData from "../../data/video_data";
import ChanelVideos from "./chanel_videos";

function ChanelVideoPage(){
    const [videos, setVideos] = useState(videoData);
    return <>
    <div className="chanel-courses-page">
        {videos.map((video,index)=>{
            return <ChanelVideos video={video} key={video.id}/>
        })}
        </div>
    </>
}
export default ChanelVideoPage;