import {AiOutlinePlus} from "react-icons/ai";
import "./home_content.css";
import CarouselImage from "../carousell/carousell";
import videoData from "../data/video_data";
import Video from "../home_videos/home_videos";
import { useState } from "react";

function HomeContent(){
    const [videos, setVideos] = useState(videoData);

    return <div className="home-image">
        <CarouselImage/>
        {console.log(videos)}
        <div className="home_videos">
        {videos.map((video,index)=>{
            return <Video video={video} key={video.id}/>
        })}
        </div>

</div>
}

export default HomeContent;