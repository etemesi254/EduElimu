import lottie from 'lottie-web';
import { useEffect, useRef, useState } from 'react';
import "./create_chanel.css";
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { useUserContext } from '../../context/UserContext';
import { useParams } from 'react-router-dom';

function EditVideos(){
    const container = useRef(null);
const {video} = useParams();
const data = JSON.parse(decodeURIComponent(video));
    const [videoName, setVideoName] = useState('');
    const [videoDescription, setVideoDescription] = useState('');
    const [fileUrl, setFileUrl] = useState('');
    const [bannerUrl, setBannerUrl] = useState('');
    const [disabled,setDisabled] = useState(false);
    const [userChannel,setUserChannel] = useState('');
    const [channelDeets,setChannelDeets] = useState('');
    const [categoryDeets,setCategoryDeets] = useState('');
    const [category,setCategory] = useState('');
    const {channel,getVideoChannel,categories,getCategoryDetails,getCurrentUser} = useUserContext();

    const handleNameInput = (e)=> setVideoName(e.target.value);
    const handleDescriptionInput = (e)=> setVideoDescription(e.target.value);
    const handleSetUserChannelInput = (e)=> setUserChannel(e.target.value);
    const handleFileUrlInput = (e) => setFileUrl(e.target.files[0]);
    const handleCategoryInput = (e) => setCategory(e.target.value);
    const handleBannerUrlInput = (e) => setBannerUrl(e.target.files[0]);

    useEffect(() => {
        async function fetchData() {
          try {
            const channelDetails = await getVideoChannel(data.id);
            const categoryDetails = await getCategoryDetails(data.category);
            setChannelDeets(channelDetails);
            setCategoryDeets(categoryDetails)
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
        formData.append('name', videoName);
        formData.append('description', videoDescription);
        formData.append('video', fileUrl);
        formData.append('image_banner', bannerUrl);
        formData.append('channel_id', userChannel);
        formData.append('category', category);
        formData.append("id",data.id);

        try {
        const result = await fetch("http://127.0.0.1:8000/api/videos/update", {
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
                <h1>Edit Your Video!!</h1>
                <p>You made it ! You can modify it!</p>
            </div>
            <div className='create-channels-form'>
            <form onSubmit={handleSubmit}>
            <div className="">
                <div className="form-group"> 
                    <div className='form-group-flex'>
                        <div className="settings_input">
                            <label>Video Title</label>
                            <input type="text" name="name" placeholder={data.name} value={videoName} onChange={handleNameInput}/>
                        </div>
                        <div className="settings_input">
                            <label>Poster Image</label>
                            <input type="file" onChange={handleBannerUrlInput}/>
                        </div>
                    </div>
                    <div className="settings_input">
                        <label>Description</label>
                        <textarea placeholder={data.description} value={videoDescription} onChange={handleDescriptionInput}></textarea>
                    </div>
                    <div className='form-group-flex'>
                        <div className="settings_input">
                            <label>Video File</label>
                            <input type="file" onChange={handleFileUrlInput}/>
                        </div>
                        <div className="settings_input">
                            <label>Your Channels</label>
                            <select onChange={handleSetUserChannelInput}>
                              {channelDeets? (<option value={channelDeets.id}>{channelDeets.name}</option>):<option >Select Channel</option>}
                            {channel ? channel.map((channel) => (
                            <option key={channel.id} value={channel.id}>{channel.name}</option>
                            )):<option>You dont have a channel :( Kindly create one first</option>}
                        </select>
                        </div>
                    </div>
                    <div className='button-div'>
                        <div className="settings_input">
                            <label>Video Category</label>
                            <select onChange={handleCategoryInput}>
                              {categoryDeets ? (<option value={categoryDeets.id}>{categoryDeets.name}</option>):<option >Select Video Category</option>}
                            {categories ? categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                            )):<option>No video Categories available</option>}
                        </select>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="button-div">
                    <button type="submit">Edit Video</button>
                </div>
            </div>
        </form>
            </div>
        </div>
    </div>
}
export default EditVideos;