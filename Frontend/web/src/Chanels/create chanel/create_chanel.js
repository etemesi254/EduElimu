import lottie from 'lottie-web';
import { useEffect, useRef } from 'react';
import "./create_chanel.css";
function CreateChannel(){
    const container = useRef(null);
    
    function handleSubmit(){

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

    // useEffect(() => {
    //     let animationInstance = null;
      
    //     const loadAnimation = async () => {
    //       const animationData = await import('./create.json');
    //       animationInstance = lottie.loadAnimation({
    //         container: container.current,
    //         renderer: 'svg',
    //         loop: true,
    //         autoplay: true,
    //         animationData: animationData.default,
    //       });
    //     };
      
    //     loadAnimation();
      
    //     return () => {
    //       if (animationInstance) {
    //         animationInstance.destroy();
    //       }
    //     };
    //   }, []);

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
                            <input type="text" name="name" placeholder='Channel Name'/>
                        </div>
                        <div className="settings_input">
                            <label>Banner Image</label>
                            <input type="file"/>
                        </div>
                    </div>
                    <div className="settings_input">
                        <label>Description</label>
                        <textarea placeholder="Enter channel description here"></textarea>
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