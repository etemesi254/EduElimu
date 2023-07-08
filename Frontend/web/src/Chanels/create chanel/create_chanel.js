import lottie from 'lottie-web';
import { useEffect, useRef, useState } from 'react';
import "./create_chanel.css";
function CreateChannel(){
    const container = useRef(null);
    const [name,setName] = useState();
    const [description,setDescription] = useState();
    const [channel_banner,setChannelBanner] = useState();

    const handleNameInput = (e)=>setName(e.target.value);
    const handleDescriptionInput = (e)=>setDescription(e.target.value);
    const handleChannelBanner = (e)=>setChannelBanner(e.target.value);
    
    function handleSubmit(e){
        e.preventDefault();

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
                <h1>Create your own channel!</h1>
                <p>Show us what you got by creating a channel to share videos with the whole world.</p> <p> We hope you have as much teaching as kids enjoy reading
                </p>
            </div>
            <div className='create-channels-form'>
            <form onSubmit={handleSubmit}>
            <div className="">
                <div className="form-group">
                    <div className='form-group-flex'>
                        <div className="settings_input">
                            <label>Channel Name</label>
                            <input type="text" name="name" placeholder='Channel Name' value={name} onChange={setName}/>
                        </div>
                        <div className="settings_input">
                            <label>Banner Image</label>
                            <input type="file" value={channel_banner} onChange={setChannelBanner}/>
                        </div>
                    </div>
                    <div className="settings_input">
                        <label>Description</label>
                        <textarea placeholder="Enter channel description here" value={description} onChange={setDescription}></textarea>
                    </div>
                    <div className="settings_input">
                        <label>Details</label>
                        <textarea placeholder="Enter channel details here"></textarea>
                    </div>
                    <div className="settings_input">
                        <label>Links</label>
                        <textarea placeholder="Enter channel links here"></textarea>
                    </div>
                </div>
                <br/>
                <div className="button-div">
                    <button type="submit">Create Channel</button>
                </div>
            </div>
        </form>
            </div>
        </div>
    </div>
}
export default CreateChannel;