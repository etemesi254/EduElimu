import lottie from 'lottie-web';
import { useEffect, useRef, useState } from 'react';
import "./create_chanel.css";
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { useUserContext } from '../../context/UserContext';

function UploadVideos(){
    const container = useRef(null);
    const [videoName, setVideoName] = useState('');
    const [videoDescription, setVideoDescription] = useState('');
    const [fileUrl, setFileUrl] = useState('');
    const [bannerUrl, setBannerUrl] = useState('');
    const [disabled,setDisabled] = useState(false);
    const [userChannel,setUserChannel] = useState('');
    const {channel,getCurrentUser} = useUserContext();

    const handleNameInput = (e)=> setVideoName(e.target.value);
    const handleDescriptionInput = (e)=> setVideoDescription(e.target.value);
    const handleSetUserChannelInput = (e)=> setUserChannel(e.target.value);
    const handleFileUrlInput = (e) => setFileUrl(e.target.files[0]);
    const handleBannerUrlInput = (e) => setBannerUrl(e.target.files[0]);

    
    async function handleSubmit(e){
        e.preventDefault();
        setDisabled(true);
        const formData = new FormData();
        formData.append('name', videoName);
        formData.append('description', videoDescription);
        formData.append('video', fileUrl);
        formData.append('image_banner', bannerUrl);
        formData.append('channel_id', userChannel);

        try {
        const result = await fetch("http://127.0.0.1:8000/api/uploads/upload_video", {
            method: "POST",
            body: formData,
        });

            const response = await result.json();
            if(result.status === 201) {
                getCurrentUser();
                setDisabled(false);
                return toast.success('Your Video was successfully uploaded');
            }
            toast.error('Error creating channel');
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
                <h1>Upload A Video!!</h1>
                <p>Show us what you got by sharing your videos with the whole world.</p> <p> We hope you have as much teaching as kids enjoy reading
                </p>
            </div>
            <div className='create-channels-form'>
            <form onSubmit={handleSubmit}>
            <div className="">
                <div className="form-group"> 
                    <div className='form-group-flex'>
                        <div className="settings_input">
                            <label>Video Title</label>
                            <input type="text" name="name" placeholder='Video Name' value={videoName} onChange={handleNameInput}/>
                        </div>
                        <div className="settings_input">
                            <label>Poster Image</label>
                            <input type="file" onChange={handleBannerUrlInput}/>
                        </div>
                    </div>
                    <div className="settings_input">
                        <label>Description</label>
                        <textarea placeholder="Enter video description here" value={videoDescription} onChange={handleDescriptionInput}></textarea>
                    </div>
                    <div className='form-group-flex'>
                        <div className="settings_input">
                            <label>Video File</label>
                            <input type="file" onChange={handleFileUrlInput}/>
                        </div>
                        <div className="settings_input">
                            <label>Your Channels</label>
                            <select onChange={handleSetUserChannelInput}>
                              <option>Select the video's channel</option>
                            {channel ? channel.map((channel) => (
                            <option key={channel.id} value={channel.id}>{channel.name}</option>
                            )):<option>You dont have a channel :( Kindly create one first</option>}
                        </select>
                        </div>
                    </div>
                   
                </div>
                <br/>
                <div className="button-div">
                    <button type="submit" disabled={disabled}>Upload Video</button>
                </div>
            </div>
        </form>
            </div>
        </div>
    </div>
}
export default UploadVideos;