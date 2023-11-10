import React, {createContext, useState, useEffect, useContext} from "react";
import {useAuth} from "./AuthContext";

const UserContext = React.createContext();

export function useUserContext() {
    return useContext(UserContext)
}

export function UserProvider({children}) {
    const [user, setUser] = useState();
    const {currentUser} = useAuth();
    const [firebaseId, setFirebaseId] = useState(null);
    const [channel, setChannel] = useState([]);
    const [userVideos, setUserVideos] = useState([]);
    const [categories, setCategories] = useState([]);
    const [allVideos, setAllVideos] = useState([]);
    const [userCourses,setUserCourses] = useState([]);
    const [myCourses, setMyCourses] = useState([]);
    const [allCourses,setAllCourses] = useState([]);

  useEffect(() => {
    getAllVideos();
    getAllVideosFunction();
    getAllCourses();
    if(currentUser){
        getCurrentUser();
    }
  }, []);

  async function getCurrentUser() {
    try {
      const email = encodeURIComponent(currentUser.email);
      const phoneNumber = currentUser.phoneNumber;

        const url = `https://api.gimply.org/getCurrentUser?email=${email}&phone_number=${phoneNumber}`;

        const response = await fetch(url, {
          // mode: 'no-cors',
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

      if (response.status === 201) {
        const user = await response.json();
        setUser(user.data); // Update the user state
        getUserDetails(user.data.id);
        // getVideoCategories();
      } else {
        throw new Error("Failed to fetch current user");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  async function getUserDetails(user) {
    try {
      const url = `https://api.gimply.org/user/details/${user}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if(response.ok){
        const data = await response.json();
        setUserVideos(data.videos);
        setMyCourses(data.courseAsStudent);
        setChannel(data.channels);
        setUserCourses(data.courses);
      }
    } catch (error) {
      
    }
  }

  async function getAllCourses(){
    try {
      const url = `https://api.gimply.org/courses/all`;
  
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response)
  
      if (response.ok) {
        const courses = await response.json();
        console.log(courses);
        setAllCourses(courses.data);
      } else {
        throw new Error("Failed to fetch courses");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  async function getStudentCourses(user_id) {
    try {
      const url = `https://api.gimply.org/courses/getStudentCourses/${user_id}`;
  
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response)
  
      if (response.ok) {
        const courses = await response.json();
        console.log(courses);
        setMyCourses(courses.data);
      } else {
        throw new Error("Failed to fetch student courses");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  async function getUserCourses(user_id) {
    try {
      const url = `https://api.gimply.org/courses/getUserCourses/${user_id}`;
  
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 201) {
        const courses = await response.json();
        console.log(courses);
        
        setUserCourses(courses.data);
      } else {
        throw new Error("Failed to fetch user courses");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
  

  async function getUserChannel(user_id) {
    try {
      const url = `https://api.gimply.org/channels/getUserChannels/${user_id}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const channels = await response.json();
        setChannel(channels.data);
        console.log("channels",channel);
      } else {
        throw new Error("Failed to fetch users channels");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  async function getUserVideos(user_id) {
    try {
      const url = `https://api.gimply.org/videos/${user_id}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const videos = await response.json();
        setUserVideos(videos.data);
        console.log("videos",userVideos);
      } else {
        throw new Error("Failed to fetch users videos");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

    async function getVideoChannel(channel_id) {
        try {
            const url = `https://api.gimply.org/videos/channel/${channel_id}`;

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const result = await response.json();

            if (response.status === 200) {
                return result.data; // Use the parsed JSON data from 'result' variable
            } else {
                throw new Error("Failed to fetch video's channel");
            }
        } catch (error) {
            console.error("Error:", error.message);
        }
    }


    async function getCategoryDetails(category_id) {
        try {
            const url = `https://api.gimply.org/categories/categoryDetails/${category_id}`;

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const result = await response.json();
            console.log(result.message);
            console.log(response);

            if (response.status === 201) {
                return result.data; // Use the parsed JSON data from 'result' variable
            } else {
                throw new Error("Failed to fetch video category details");
            }
        } catch (error) {
            console.error("Error:", error.message);
        }
    }

    async function getAllVideosFunction() {
      const url = `https://api.gimply.org/videos/front`;
      const response = await fetch(url, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          },
      });

        const result = await response.json();
        if (response.status === 200) {
          const videos = result.data.videos;

          const shuffledVideos = videos.sort(() => Math.random() - 0.5);

          setAllVideos(shuffledVideos);
        
          return shuffledVideos;

      } else {
          throw new Error("Failed to fetch video details");

      }
  }


    async function getAllVideos() {
        const url = `https://api.gimply.org/videos/all`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();
        if (response.status === 200) {
          const videos = result.data;
        
          return videos;

        } else {
            throw new Error("Failed to fetch video details");

        }
    }

    async function getChannelVideos(id) {
      try {
        const url = `https://api.gimply.org/channels/getChannelVideos/${id}}`;
  
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        const result = await response.json();
        if (response.status === 200) {
          return result.data;
        } else {
          throw new Error("Failed to fetch channel videos");
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    }

    async function getChannelCourses(id) {
      try {
        const url = `https://api.gimply.org/courses/getChannelCourses/${id}}`;
  
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        const result = await response.json();
        console.log(result);
        if (result.status === 200) {
          return result.data;
        } else {
          throw new Error("Failed to fetch channel courses");
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    }

    async function getCourseChannelDetails(id) {
      try {
        const url = `https://api.gimply.org/courses/getCourseChannelDeets/${id}}`;
  
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        const result = await response.json();
        console.log(result);
        if (result.status === 201) {
          return result.data;
        } else {
          throw new Error("Failed to fetch course's channel");
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    }

    async function getCourseVideos(id) {
      try {
        const url = `https://api.gimply.org/courses/${id}/videos`;
  
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        const result = await response.json();
        console.log(result);
        if (result.status === 200) {
          return result.data;
        } else {
          throw new Error("Failed to fetch course's videos");
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    }

    async function getCourseResources(id) {
      try {
        const url = `https://api.gimply.org/courses/resources/${id}`;
  
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        const result = await response.json();
        console.log(result);
        if (result.status === 201) {
          return result.data;
        } else {
          throw new Error("Failed to fetch course's videos");
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    }

    async function getUserProgress(user_id, course_id) {
      const formData = new FormData();
      formData.append("course_id", course_id);
      formData.append("user_id", user_id);
      try {
        const url = `https://api.gimply.org/courses/getUsersProgress`;
  
        const response = await fetch(url, {
          method: "POST",
          body: formData,
        });
  
        const result = await response.json();
        console.log(result);
        if (result.status === 200) {
          return result.data.progress;
        } else {
          throw new Error("Failed to fetch course's progress");
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    }



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
        categories,
        userCourses,
        myCourses,
        allCourses,
        formatDateTime,
        getVideoChannel,
        getCategoryDetails,
        getUserChannel,
        getAllVideos,
        allVideos,
        getCurrentUser,
        getChannelVideos,
        getChannelCourses,
        getCourseChannelDetails,
        getCourseVideos,
        getCourseResources,
        getUserProgress

    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};


