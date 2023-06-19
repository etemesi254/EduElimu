import './register.css';
import lottie from 'lottie-web';
import { useEffect, useRef, useState } from 'react';
import { Link} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function CompleteProfileEmail (){
    const container = useRef(null);
    const [email,setEmail] = useState('');
    const {resetPassword} = useAuth();
    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false);
    const [message,setMessage] = useState('');

    const handleEmailInput = (e)=> setEmail(e.target.value);

    useEffect(()=>{
        const instance = lottie.loadAnimation({
            container:container.current,
            renderer:'svg',
            loop: true,
            autoplay:true,
            animationData: require('./forgot-password.json'),
        });
        return () => instance.destroy();
    },[]);

    

    async function handleSubmit(e){
        e.preventDefault();
        try{
            setLoading(true);
            await resetPassword(email);
            setMessage('Check your email for password reset instructions.');
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
                <p>Just a few more details and your account will be set!</p>
                <form className="form" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Email" value={email} onChange={handleEmailInput}/>
                    <input type="number" placeholder="Phone Number" value={email} onChange={handleEmailInput}/>
                    <input type="file" placeholder="Email" value={email} onChange={handleEmailInput}/>
                    <input type="date" placeholder="Date of Birth" value={email} onChange={handleEmailInput}/>
                    <button type="submit" className="login" disabled={loading}>Submit</button>
                </form>
            </div>
        </div>
      
    </section>
    </>
}

export default CompleteProfileEmail;