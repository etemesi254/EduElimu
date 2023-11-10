import './register.css';
import lottie from 'lottie-web';
import { useEffect, useRef, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

function CompleteProfileEmail (){
    const container = useRef(null);
    const [name,setName] = useState('');
    const [phone_number,setPhone] = useState('');
    const [profile_image,setProfileImage] = useState('');
    const [DOB,setDOB] = useState('');
    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false);
    const [message,setMessage] = useState('');
    const navigate = useNavigate();
    const {currentUser} = useAuth();

    const handlePhoneInput = (e)=> setPhone(e.target.value);
    const handleNameInput = (e)=> setName(e.target.value);
    const handleProfileInput = (e)=> setProfileImage(e.target.value);
    const handleDOBInput = (e)=> setDOB(e.target.value);

    useEffect(()=>{
        const instance = lottie.loadAnimation({
            container:container.current,
            renderer:'svg',
            loop: true,
            autoplay:true,
            animationData: require('./completeprof.json'),
        });
        return () => instance.destroy();
    },[]);

    

    async function handleSubmit(e){
        e.preventDefault();
        try{
            setLoading(true);
            const response = await fetch('https://api.gimply.org/updateUserWithEmail/'+ currentUser.email, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({name,phone_number,profile_image,DOB}),
            });

            console.log(response);
            console.log(currentUser);

            if(response.status === 201){
                return toast.success('Profile completed successfully!', {
                    onClose: () => navigate('/'),
            });
            }
        }catch(error){
            const errorMessage = error.message.startsWith("Firebase: ")
            ? error.message.substring("Firebase: ".length) // Remove the "Firebase: " prefix
            : error.message;

            setError(errorMessage);
        }
        setLoading(false);
        setTimeout(() => {
            setError('');
            setMessage('');
        }, 3000);
    }

    return <>
    {/* {value?<HomePage/>:} */}
    <section className='section_register'>
        
        <div className="register_background" style={{
        backgroundImage: `url("./assets/home (1).jpg")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        }}></div>
        <div className="form_container">
            <div className="whiite-bk">
                <div className="lottie_container" ref={container}></div>
                {message?<div className='message'>
                    <p>{message}</p>
                </div>:''}
                {error?<div className='error'>
                    <p>{error}</p>
                </div>:''}
                <h3 className='alt-1'>Complete Your Profile</h3>
                <p id='info'>Just a few more details and your account will be set!</p>
                <form className="form" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Name" value={name} onChange={handleNameInput}/>
                    <input type="number" placeholder="Phone Number" value={phone_number} onChange={handlePhoneInput}/>
                    <input type="file" placeholder="" value={profile_image} onChange={handleProfileInput}/>
                    <input type="date" placeholder="Date of Birth" value={DOB} onChange={handleDOBInput}/>
                    <button type="submit" className="login" disabled={loading}>Submit</button>
                </form>
            </div>
        </div>
      
    </section>
    </>
}

export default CompleteProfileEmail;