import lottie from 'lottie-web';
import { useEffect, useRef } from 'react';
import "./create_chanel.css";
function UploadVideos(){
    const container = useRef(null);
    
    function handleSubmit(){

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
                    <div className="settings_input">
                        <label>Video Title</label>
                        <input type="text" name="name" placeholder='Channel Name'/>
                    </div>
                    <div className="settings_input">
                        <label>Poster Image</label>
                        <input type="file"/>
                    </div>
                    <div className="settings_input">
                        <label>Video File</label>
                        <input type="file"/>
                    </div>
                    <div className="settings_input">
                        <label>Description</label>
                        <textarea placeholder="Enter channel description here"></textarea>
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