import lottie from 'lottie-web';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useUserContext } from '../context/UserContext';
import { useParams } from 'react-router-dom';

function EditChannel(){
    const container = useRef(null);
    const {channel} = useParams();
    const data = JSON.parse(decodeURIComponent(channel));

    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [channel_banner,setChannelBanner] = useState('');
    
    const {user} = useUserContext();

    const handleNameInput = (e)=>setName(e.target.value);
    const handleDescriptionInput = (e)=>setDescription(e.target.value);
    const handleChannelBanner = (e)=>setChannelBanner(e.target.files[0]);
    
    async function handleSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append("id", data.id);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('channel_banner', channel_banner);
        formData.append('user_id', user.id);
    
        try {
            const result = await fetch(
                "http://127.0.0.1:8000/api/channels/update",
                {
                    method: "POST",
                    body: formData
                }
            );
            console.log(result);
            
            const response = await result.json();
            console.log(response);
            if(result.status === 201) {
                return toast.success('Your channel has been modified');
            }
            toast.error('Error updating channel');
        } catch (error) {
            return toast.error(error.message);
        }
    }

    useEffect(()=>{
        const instance = lottie.loadAnimation({
            container:container.current,
            renderer:'svg',
            loop: true,
            autoplay:true,
            animationData: require('./create chanel/create.json'),
        });
        return () => instance.destroy();
    },[]);


    return <div className='home-image'>
        <div className="create-channels-container">
            <div className="lottie_container" ref={container}></div>
            <div className="create-channel-head">
                <h1>Edit your Channel's Details Here!</h1>
                <p>You created it! You can edit it!</p>
            </div>
            <div className='create-channels-form'>
            <form onSubmit={handleSubmit}>
            <div className="">
                <div className="form-group">
                    <div className='form-group-flex'>
                        <div className="settings_input">
                            <label>Channel Name</label>
                            <input type="text" name="name" placeholder={data.name} value={name} onChange={handleNameInput}/>
                        </div>
                        <div className="settings_input">
                            <label>Banner Image</label>
                            <input type="file" onChange={handleChannelBanner}/>
                        </div>
                    </div>
                    <div className="settings_input">
                        <label>Description</label>
                        <textarea placeholder={data.description} value={description} onChange={handleDescriptionInput}></textarea>
                    </div>
                </div>
                <br/>
                <div className="button-div">
                <button type="submit">Edit Channel</button>
                </div>
            </div>
        </form>
            </div>
        </div>
    </div>
}
export default EditChannel;