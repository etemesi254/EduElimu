import lottie from 'lottie-web';
import { useEffect, useRef, useState } from 'react';
import "./create_chanel.css";
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { useUserContext } from '../../context/UserContext';

function CreateCourse(){
    const container = useRef(null);
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [course_banner,setCourseBanner] = useState('');
    const [userChannel,setUserChannel] = useState('');
    const [disabled,setDisabled] = useState(false);
    
    const {user,getCurrentUser,channel} = useUserContext();

    const handleNameInput = (e)=>setName(e.target.value);
    const handleDescriptionInput = (e)=>setDescription(e.target.value);
    const handleCourseBanner = (e)=>setCourseBanner(e.target.files[0]);
    const handleChannelInput = (e)=>setUserChannel(e.target.value);
    
    async function handleSubmit(e){
        e.preventDefault();
        setDisabled(true);
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('course_banner', course_banner);
        formData.append('channel_id', userChannel);

        console.log(name, description, userChannel,course_banner);

        console.log(formData);
        try {
            const result = await fetch(
              "http://127.0.0.1:8000/api/courses/create",
              {
                method: "POST",
                body: formData
              }
            );
                       
            const response = await result.json();
            console.log(response.message);
                 
            if (result.status === 201) {
              setDisabled(false);
              return toast.success('Your course has been created');
            }
            setDisabled(false);
            toast.error('Error creating course');
          } catch (error) {
            setDisabled(false);
            console.log(error.message);
            return toast.error(error.message);
          }
          
    }

    useEffect(()=>{
        const instance = lottie.loadAnimation({
            container:container.current,
            renderer:'svg',
            loop: true,
            autoplay:true,
            animationData: require('./create.json'),
        });
        return () => instance.destroy();
    },[]);


    return <div className='home-image'>
        <div className="create-channels-container">
            <div className="lottie_container" ref={container}></div>
            <div className="create-channel-head">
                <h1>Create a course todayy!</h1>
                <p>Show us what you got by creating a course to share videos with the whole world.</p> <p> We hope you have as much teaching as kids enjoy reading
                </p>
            </div>
            <div className='create-channels-form'>
            <form onSubmit={handleSubmit}>
            <div className="">
                <div className="form-group">
                    <div className='form-group-flex'>
                        <div className="settings_input">
                            <label>Course Name</label>
                            <input type="text" name="name" placeholder='Course Name' value={name} onChange={handleNameInput}/>
                        </div>
                        <div className="settings_input">
                            <label>Banner Image</label>
                            <input type="file" onChange={handleCourseBanner}/>
                        </div>
                    </div>
                    <div className="settings_input">
                        <label>Description</label>
                        <textarea placeholder="Enter channel description here" value={description} onChange={handleDescriptionInput}></textarea>
                    </div>
                    <div className='form-group-flex'>
                    <div className="settings_input">
                    <label>Your Channels</label>
                    <div className="button-div">
                        <select onChange={handleChannelInput}>
                            <option >Select Channel</option>
                            {channel ? channel.map((channel) => (
                            <option key={channel.id} value={channel.id}>{channel.name}</option>
                            )):<option>You dont have a channel :( Kindly create one first</option>}
                        </select>
                    </div>
                    </div>
                    </div>
                </div>
                <br/>
                <div className="button-div">
                    <button type="submit" disabled={disabled}>Create Course</button>
                </div>
            </div>
        </form>
            </div>
        </div>
    </div>
}
export default CreateCourse;