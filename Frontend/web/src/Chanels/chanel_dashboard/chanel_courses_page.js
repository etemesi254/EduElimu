import { useState } from "react";
import videoData from "../../data/video_data";
import ChanelCourse from "./chanel_course";
import { useParams } from "react-router-dom";

function ChanelCoursesPage(){
    const [videos, setVideos] = useState(videoData);
    const {courses} = useParams();
    const data = JSON.parse(decodeURIComponent(courses));
    const noOfVideos = data.length;
    return <>
    <div className="chanel-courses-page">
        {data.map((course,index)=>{
            return <ChanelCourse course={course} key={course.id} noOfVideos={noOfVideos}/>
        })}
        </div>
    </>
}
export default ChanelCoursesPage;