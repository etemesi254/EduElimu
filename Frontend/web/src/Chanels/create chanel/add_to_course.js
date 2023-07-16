import lottie from 'lottie-web';
import { useEffect, useRef, useState } from 'react';
import "./create_chanel.css";
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { useUserContext } from '../../context/UserContext';
import { useParams } from 'react-router-dom';

function AddToCourse(){
    const container = useRef(null);
    const [videoID,setVideoId] = useState('');
    const [courseID,setCourseID] = useState('');
    const [disabled,setDisabled] = useState(false);
    
    const {channel,userCourses,getCurrentUser,userVideos} = useUserContext();

    const handleVideoInput = (e) => setVideoId(e.target.value)
    const handleCourseInput = (e) => setCourseID(e.target.value)

    async function handleSubmit(e){
        e.preventDefault();
        setDisabled(true);
        const formData = new FormData();
        

        try {
        const result = await fetch("http://127.0.0.1:8000/api/courses/edit", {
            method: "POST",
            body: formData,
        });

            const response = await result.json();
            if(result.status === 201) {
                getCurrentUser();
                return toast.success('Your Video was successfully updated');
            }
            toast.error('Error updating video');
            setDisabled(false);
        } catch (error) {
            setDisabled(false);
            return toast.error(error.message);
        }
    }
    
    useEffect(()=>{
        const instance = lottie.loadAnimation({
            container:container.current,
            renderer:'svg',
            loop: true,
            autoplay:true,
            animationData: require('./upload.json'),
        });
        return () => instance.destroy();
    },[]);

    return <div className='home-image'>
        <div className="create-channels-container">
            <div className="lottie_container" ref={container}></div>
            <div className="create-channel-head">
                <h1>Add Videos To Your Course!!</h1>
                <p>Help learners follow along closely on what you teach by grouping related videos into courses!</p>
            </div>
            <div className='create-channels-form'>
            <form onSubmit={handleSubmit}>
            <div className="">
                <div className="form-group"> 
                    <div className='form-group-flex'>
                        <div className="settings_input">
                            <label>Course Title</label>
                            <select>
                            {userCourses && userCourses.length > 0 ? userCourses.map((userCourses) => (
                            <option key={userCourses.id} value={userCourses.id}>{userCourses.name}</option>
                            )):<option>You dont have a Course :( Kindly create one first</option>}
                            </select>
                        </div>
                        <div className="settings_input">
                            <label>Video Title</label>
                            <select>
                                {userVideos && userVideos.length > 0 ? userVideos.map((userVideos) => (
                                <option key={userVideos.id} value={userVideos.id}>{userVideos.name}</option>
                                )):<option>You dont have any videos :( Kindly upload one first</option>}
                            </select>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="button-div">
                    <button type="submit">Add Video To Course</button>
                </div>
            </div>
        </form>
            </div>
        </div>
    </div>
}
export default AddToCourse;