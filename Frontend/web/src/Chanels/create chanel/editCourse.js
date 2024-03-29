import lottie from 'lottie-web';
import { useEffect, useRef, useState } from 'react';
import "./create_chanel.css";
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { useUserContext } from '../../context/UserContext';
import { useParams } from 'react-router-dom';

function EditCourses(){
    const container = useRef(null);
    const {course} = useParams();
    const data = JSON.parse(decodeURIComponent(course));
    const [courseName, setCourseName] = useState('');
    const [courseDesc, setCourseDesc] = useState('');
    const [bannerUrl, setBannerUrl] = useState('');
    const [disabled,setDisabled] = useState(false);
    const [userChannel,setUserChannel] = useState('');
    const [channelDeets,setChannelDeets] = useState('');
    const {channel,getVideoChannel,getCurrentUser,getCourseChannelDetails} = useUserContext();

    const handleNameInput = (e)=> setCourseName(e.target.value);
    const handleDescriptionInput = (e)=> setCourseDesc(e.target.value);
    const handleSetUserChannelInput = (e)=> setUserChannel(e.target.value);
    const handleBannerUrlInput = (e) => setBannerUrl(e.target.files[0]);

    useEffect(() => {
        async function fetchData() {
          try {
            const channelDetails = await getCourseChannelDetails(data.id);
            setChannelDeets(channelDetails);
          } catch (error) {
            toast.error(error.message);
          }
        }
      
        fetchData();
      }, []);
      

    
    async function handleSubmit(e){
        e.preventDefault();
        setDisabled(true);
        const formData = new FormData();
        formData.append('name', courseName);
        formData.append('description', courseDesc);
        formData.append('course_banner', bannerUrl);
        formData.append('channel_id', userChannel);
        formData.append("id",data.id);

        try {
        const result = await fetch("https://api.gimply.org/courses/edit", {
            method: "POST",
            body: formData,
        });

            const response = await result.json();
            console.log(response);
            if(result.ok) {
                getCurrentUser();
                return toast.success('Your course was successfully updated');
            }
            toast.error('Error updating course');
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
                <h1>Edit Your Course!!</h1>
                <p>You made it ! You can modify it!</p>
            </div>
            <div className='create-channels-form'>
            <form onSubmit={handleSubmit}>
            <div className="">
                <div className="form-group"> 
                    <div className='form-group-flex'>
                        <div className="settings_input">
                            <label>Course Title</label>
                            <input type="text" name="name" placeholder={data.name} value={courseName} onChange={handleNameInput}/>
                        </div>
                        <div className="settings_input">
                            <label>Poster Image</label>
                            <input type="file" onChange={handleBannerUrlInput}/>
                        </div>
                    </div>
                    <div className="settings_input">
                        <label>Description</label>
                        <textarea placeholder={data.description} value={courseDesc} onChange={handleDescriptionInput}></textarea>
                    </div>
                    <div className='form-group-flex'>
                        <div className="settings_input">
                            <label>Your Channels</label>
                            <select onChange={handleSetUserChannelInput}>
                              {channelDeets? (<option value={channelDeets[0].id}>{channelDeets[0].name}</option>):<option >Select Channel</option>}
                            {channel ? channel.map((channel) => (
                            <option key={channel.id} value={channel.id}>{channel.name}</option>
                            )):<option>You dont have a channel :( Kindly create one first</option>}
                        </select>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="button-div">
                    <button type="submit">Edit Course</button>
                </div>
            </div>
        </form>
            </div>
        </div>
    </div>
}
export default EditCourses;