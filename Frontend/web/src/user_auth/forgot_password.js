import './register.css';
import lottie from 'lottie-web';
import { useEffect, useRef, useState } from 'react';
import { Link} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ForgotPassword (){
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
            setError(`${error.message}`);
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
                <h3 className='alt-1'>Reset Password</h3>
                <form className="form" onSubmit={handleSubmit}>
                    <input type="Email" placeholder="Email" value={email} onChange={handleEmailInput}/>
                    <button type="submit" className="login" disabled={loading}>Reset Password</button>
                </form>
                <div className='have_account'>
                    <p id='p_tags3'>New to EduElimu? <Link to="/register" className='a'>Sign up here</Link></p></div>
                <div className='have_account'>
                <p id='p_tags3'>Already have an account? <Link to="/login" className='a'>Sign in here</Link></p></div>
            </div>
        </div>
      
    </section>
    </>
}

export default ForgotPassword;