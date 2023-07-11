import { useState } from "react";
import videoData from "../../data/video_data";
import ChanelVideos from "./chanel_videos";
import { useParams } from "react-router-dom";

function ChanelVideoPage(){
    const {videos} = useParams();
    const data = JSON.parse(decodeURIComponent(videos));

    return <>
    <div className="chanel-courses-page">
        {data.map((video,index)=>{
            return <ChanelVideos video={video} key={video.id}/>
        })}
        </div>
    </>
}
export default ChanelVideoPage;