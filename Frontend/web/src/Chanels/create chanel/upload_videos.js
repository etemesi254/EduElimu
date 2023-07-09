import lottie from 'lottie-web';
import { useEffect, useRef, useState } from 'react';
import "./create_chanel.css";
function UploadVideos(){
    const container = useRef(null);
    const [videoName, setVideoName] = useState('');
    const [videoDescription, setVideoDescription] = useState('');
    const [fileUrl, setFileUrl] = useState('');
    const [bannerUrl, setBannerUrl] = useState('');

    const handleNameInput = (e)=> setVideoName(e.target.value);
    const handleDescriptionInput = (e)=> setVideoDescription(e.target.value);
    const handleFileUrlInput = (e)=> setFileUrl(e.target.value);
    const handleBannerUrlInput = (e)=> setBannerUrl(e.target.value);
    
    async function handleSubmit(e){
        e.preventDefault();
        let formData = new FormData();
        formData.append("name",videoName);
        formData.append("description",videoDescription);
        formData.append("video",fileUrl);
        formData.append("image_banner",bannerUrl);
        formData.append("channel_id",1);

        try {
            const result = await fetch(
                "http://127.0.0.1:8000/api/uploads/upload_video",
                {
                    method: "POST",
                    body: formData,
                }
            );

            console.log(result);
        } catch (error) {
            console.log(error.message);
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
                            <input type="text" name="name" placeholder='Channel Name' value={videoName} onChange={handleNameInput}/>
                        </div>
                        <div className="settings_input">
                            <label>Poster Image</label>
                            <input type="file" value={bannerUrl} onChange={handleBannerUrlInput}/>
                        </div>
                    </div>
                    <div className="settings_input">
                        <label>Description</label>
                        <textarea placeholder="Enter channel description here" value={videoDescription} onChange={handleDescriptionInput}></textarea>
                    </div>
                    <div className='button-div'>
                        <div className="settings_input">
                            <label>Video File</label>
                            <input type="file" value={fileUrl} onChange={handleFileUrlInput}/>
                        </div>
                    </div>
                   
                </div>
                <br/>
                <div className="button-div">
                    <button type="submit">Upload Video</button>
                </div>
            </div>
        </form>
            </div>
        </div>
    </div>
}
export default UploadVideos;