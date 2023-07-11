import React, { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./AuthContext";

const UserContext = React.createContext();

export function useUserContext(){
    return useContext(UserContext)
}

export function UserProvider ({ children }){
  const [user, setUser] = useState();
  const { currentUser } = useAuth();
  const [firebaseId, setFirebaseId] = useState(null);
  const [channel, setChannel] = useState([]);
  const [userVideos, setUserVideos] = useState([]);


  useEffect(() => {
    //get current user data from api
    async function getCurrentUser() {
      try {
        const email = encodeURIComponent(currentUser.email);
        const phoneNumber = currentUser.phoneNumber;

        const url = `http://127.0.0.1:8000/api/getCurrentUser?email=${email}&phone_number=${phoneNumber}`;

        const response = await fetch(url, {
          // mode: 'no-cors',
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response);

        if (response.status === 201) {
          const user = await response.json();
          setUser(user.data); // Update the user state
          setFirebaseId(user.data.firebase_id);
          getUserChannel(user.data.id);
          getUserVideos(user.data.id);
        } else {
          throw new Error("Failed to fetch current user");
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    }

    //get user channels
    async function getUserChannel($user_id) {
      try {
        const url = `http://127.0.0.1:8000/api/channels/getUserChannels/${$user_id}`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response);

        if (response.status === 200) {
          const channels = await response.json();
          setChannel(channels.data);
        } else {
          throw new Error("Failed to fetch users channels");
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    }

    //get current user videos
    async function getUserVideos($user_id) {
        try {
          const url = `http://127.0.0.1:8000/api/videos/${$user_id}`;
  
          const response = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          console.log(response);
  
          if (response.status === 200) {
            const videos = await response.json();
            setUserVideos(videos.data);
          } else {
            throw new Error("Failed to fetch users videos");
          }
        } catch (error) {
          console.error("Error:", error.message);
        }
      }


    if(currentUser){
        getCurrentUser();
    }
  }, []);

  function formatDateTime(datetime) {
    const currentTime = new Date();
    const timestamp = new Date(datetime);
  
    const diffInSeconds = Math.floor((currentTime - timestamp) / 1000);
  
    if (diffInSeconds < 60) {
      return `${diffInSeconds} second${diffInSeconds !== 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 3600) {
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const diffInHours = Math.floor(diffInSeconds / 3600);
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 604800) {
      const diffInDays = Math.floor(diffInSeconds / 86400);
      return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 2592000) {
      const diffInWeeks = Math.floor(diffInSeconds / 604800);
      return `${diffInWeeks} week${diffInWeeks !== 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 31536000) {
      const diffInMonths = Math.floor(diffInSeconds / 2592000);
      return `${diffInMonths} month${diffInMonths !== 1 ? 's' : ''} ago`;
    } else {
      const diffInYears = Math.floor(diffInSeconds / 31536000);
      return `${diffInYears} year${diffInYears !== 1 ? 's' : ''} ago`;
    }
  }
  
  

  const value = {
    user,
    channel,
    userVideos,
    formatDateTime
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};


