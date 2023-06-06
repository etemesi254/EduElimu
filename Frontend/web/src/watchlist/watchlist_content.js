import { useState } from "react";
import videoData from "../data/video_data";
import WatchlistVideos from "./watchlist_videos";
import "./watchlist_content.css";
function WatchlistContent(){
    const [videos, setVideos] = useState(videoData);
    return <section id="watchlist_content">
        {videos.map((video,index)=>{
            return <WatchlistVideos video= {video} key={video.id}
            />
        })}
    </section>
}
export default WatchlistContent;