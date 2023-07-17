import React, { useContext, useEffect, useState } from "react";

const AdminContext = React.createContext();

export function useAdminContext(){
    return useContext(AdminContext)
}

export function AdminProvider({children}){
    const [userCount,setUserCount] = useState('');
    const [channelCount,setChannelCount] = useState('');
    const [categoryCount,setCategoryCount] = useState('');
    const [courseEnrollmentCount,setCourseEnrollmentCount] = useState('');
    const [totalChannel,setTotalChannel] = useState('');
    const [totalCourse,setTotalCourse] = useState('');
    const [totalVideos,setTotalVideos] = useState('');

    useEffect(()=>{
        getAggregate();
    },[]);


    async function getAggregate(){
        try {
            const url = `http://127.0.0.1:8000/api/aggregate`;

            const response = await fetch(url, {
                // mode: 'no-cors',
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              });
            if(response.ok){
                const aggregate = await response.json();
                setUserCount(aggregate.data.user_count[0].count);
                setChannelCount(aggregate.data.channel_count);
                setCategoryCount(aggregate.data.category_count);
                setCourseEnrollmentCount(aggregate.data.course_enrollment)
                setTotalCourse(aggregate.data.total_courses[0].count)
                setTotalChannel(aggregate.data.total_channels[0].count)
                setTotalVideos(aggregate.data.total_videos[0].count)
            }else{
                console.log("something went wrong");
            }

        } catch (error) {
            console.log("Error:",error.message)
        }
    }

    const value = {
        userCount,
        channelCount,
        categoryCount,
        courseEnrollmentCount,
        totalChannel,
        totalCourse,
        totalVideos
    }

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    )
}