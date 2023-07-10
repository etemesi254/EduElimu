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
          getUserChannel();
          getUserVideos(user.data.id);
        } else {
          throw new Error("Failed to fetch current user");
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    }

    //get user channels
    async function getUserChannel() {
      try {
        const url = "http://127.0.0.1:8000/api/channels/all";

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firebase_id: firebaseId,
          }),
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

  const value = {
    user,
    channel,
    userVideos
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};


