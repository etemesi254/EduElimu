import { Link, Outlet, useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';


function ChanelLayout(){
    const {channel} = useParams();
    const data = JSON.parse(decodeURIComponent(channel));
    const [videos,setVideos] = useState();

    const { id, name, subscribers,description, banner } = data;

    useEffect(() => {
        async function getChannelVideos() {
          try {
            const url = `http://127.0.0.1:8000/api/channels/getChannelVideos/${id}`;
      
            const response = await fetch(url, {
              // mode: 'no-cors',
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });
      
            const result = await response.json();
            console.log(result);
            console.log(response.status);
      
            if (response.status === 200) {
              console.log(result.data); // Verify the data from the response
              setVideos(result.data);
            } else {
              throw new Error("Failed to fetch channel videos");
            }
          } catch (error) {
            console.error("Error:", error.message);
          }
        }
      
        getChannelVideos();
      }, []);

    return <div className="home-image">
    <div className="chanel-dashboard-img">
    <img src={`http://127.0.0.1:8000/storage/${banner}`}/>
    </div>
    <div className="chanel-details">
        <div className="chanel-profile-pic">
            <img src={process.env.PUBLIC_URL + '/assets/poster (2).jpg'} />
        </div>
        <div className="chanel-dets">
            <h2>{name}</h2>
            <div>
                <p>{subscribers} Subscribers</p>
                <p>637 Videos</p>
                <p>78 Courses</p>
            </div>
            <p>{description}</p>
        </div>
    </div>
    <div className="mini-nav-bar">
        <div className="mini-nav-bar-link">
            <li>
                <Link to={`/chanel/${id}/${encodeURIComponent(
                                JSON.stringify(channel)
                            )}`} className="link">HOME</Link>
            </li>
            <li>
                <Link to={`/chanel/${id}/${encodeURIComponent(
                                JSON.stringify(channel)
                            )}/videos/${encodeURIComponent(
                                JSON.stringify(videos)
                            )}`} className="link">VIDEOS</Link>
            </li>
            <li>
                <Link to="" className="link">COURSES</Link>
            </li>
            <li>
                <Link to="" className="link">ABOUT</Link>
            </li>
        </div>
    </div>
    <Outlet/>
    </div>
}
export default ChanelLayout;