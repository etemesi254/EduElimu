import lottie from 'lottie-web';
import { useEffect, useRef, useState } from 'react';
import "./create_chanel.css";
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { useUserContext } from '../../context/UserContext';
import { useParams } from 'react-router-dom';

function UploadResources(){
    const container = useRef(null);
    const [resource,setResource] = useState('');
    const [name,setName] = useState('');
    const [courseID,setCourseID] = useState('');
    const [disabled,setDisabled] = useState(false);
    
    const {channel,userCourses,getCurrentUser,userVideos} = useUserContext();

    const handleResourceInput = (e) => setResource(e.target.files[0])
    const handleNameInput = (e) => setName(e.target.value);
    const handleCourseInput = (e) => setCourseID(e.target.value)

    async function handleSubmit(e){
        e.preventDefault();
        setDisabled(true);
        const formData = new FormData();
        formData.append("name",name);
        formData.append("resource",resource);
        formData.append("course_id",courseID);

        try {
        const result = await fetch("http://127.0.0.1:8000/api/courses/resources/add", {
            method: "POST",
            body: formData,
        });

            const response = await result.json();
            if(result.status === 201) {
                getCurrentUser();
                return toast.success('Resource Added To Course');
            }
            toast.error('Error adding resource to course');
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
                <h1>Add Resources To Your Course!!</h1>
                <p>Help learners follow along closely on what you teach by grouping related resources into courses!</p>
            </div>
            <div className='create-channels-form'>
            <form onSubmit={handleSubmit}>
            <div className="">
                <div className="form-group"> 
                    <div className='form-group-flex'>
                        <div className="settings_input">
                            <label>Course Title</label>
                            <select onChange={handleCourseInput}>
                            {userCourses && userCourses.length > 0 ? userCourses.map((userCourses) => (
                            <option key={userCourses.id} value={userCourses.id}>{userCourses.name}</option>
                            )):<option>You dont have a Course :( Kindly create one first</option>}
                            </select>
                        </div>
                        <div className="settings_input">
                            <label>Resource Name</label>
                                <input type="text" name="name" placeholder="Resource Name" value={name} onChange={handleNameInput}/>
                        </div>
                    </div>
                    <div className='form-group-flex'>
                        <div className="settings_input">
                            <label>Resource File</label>
                                <input type="file" name="name" onChange={handleResourceInput}/>
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
export default UploadResources;