import lottie from 'lottie-web';
import { useEffect, useRef, useState } from 'react';
import "./create_chanel.css";
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

function CreateChannel(){
    const container = useRef(null);
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [channel_banner,setChannelBanner] = useState('');
    
    
    const {currentUser} = useAuth();


    const [user, setUser] = useState(null);

  useEffect(() => {
    async function getCurrentUser() {
      try {
        const email = encodeURIComponent(currentUser.email);
        const phoneNumber = currentUser.phoneNumber;

        const url = `http://127.0.0.1:8000/api/getCurrentUser?email=${email}&phone_number=${phoneNumber}`;

        const response = await fetch(url, {
          // mode: 'no-cors',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log(response)


        if (response.status === 201) {
            const user = await response.json();
            setUser(user); // Update the user state
          } else {
            throw new Error('Failed to fetch current user');
          }
        } catch (error) {
          console.error('Error:', error.message);
        }
      }
  
      getCurrentUser(); 
    }, []); 

    const handleNameInput = (e)=>setName(e.target.value);
    const handleDescriptionInput = (e)=>setDescription(e.target.value);
    const handleChannelBanner = (e)=>setChannelBanner(e.target.files[0]);
    
    async function handleSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('channel_banner', channel_banner);
        formData.append('user_id', user.data.id);
    
        try {
            const result = await fetch(
                "http://127.0.0.1:8000/api/channels/create",
                {
                    method: "POST",
                    body: formData
                }
            );
            console.log(result);
            
            const response = await result.json();
            console.log(response);
            if(result.status === 201) {
                return toast.success('Your channel has been created');
            }
            toast.error('Error creating channel');
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
                            <input type="text" name="name" placeholder='Channel Name' value={name} onChange={handleNameInput}/>
                        </div>
                        <div className="settings_input">
                            <label>Banner Image</label>
                            <input type="file" onChange={handleChannelBanner}/>
                        </div>
                    </div>
                    <div className="settings_input">
                        <label>Description</label>
                        <textarea placeholder="Enter channel description here" value={description} onChange={handleDescriptionInput}></textarea>
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