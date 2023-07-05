import { useState } from "react";
import videoData from "../../data/video_data";
import ChanelCourse from "./chanel_course";

function ChanelCoursesPage(){
    const [videos, setVideos] = useState(videoData);
    return <>
    <div className="chanel-courses-page">
        {videos.map((video,index)=>{
            return <ChanelCourse video={video} key={video.id}/>
        })}
        </div>
    </>
}
export default ChanelCoursesPage;