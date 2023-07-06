import './register.css';
import lottie from 'lottie-web';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function useQuery(){
    return new URLSearchParams(useLocation().search);
}

function CustomReset (){
    const container = useRef(null);
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const {customResetPassword} = useAuth();
    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false);
    const [message,setMessage] = useState('');
    const query = useQuery();
    const navigate = useNavigate();

    const handlePasswordInput = (e)=> setPassword(e.target.value);
    const handleConfirmPassInput = (e)=> setConfirmPassword(e.target.value);

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
        if(confirmPassword === undefined || password === undefined){
            return setError('Please enter a valid password');
        }
        if(confirmPassword !== password){
            return setError('Passwords do not match');
        }
        try{
            setLoading(true);
            await customResetPassword(query.get('oobCode'),password);
            toast.success('Password changed successfully!', {
                onClose: () => navigate('/login'),
              });
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
                <h3 className='alt-1'>Reset Password</h3>
                <div className='message'>
                    <p>Password should have 6 or more characters including a special character</p>
                </div>
                <form className="form" onSubmit={handleSubmit}>
                    <input type="password" placeholder="New Password" value={password} onChange={handlePasswordInput}/>
                    <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={handleConfirmPassInput}/>
                    <button type="submit" className="login" disabled={loading}>Reset Password</button>
                </form>
                {/* <div className='have_account'>
                    <p id='p_tags3'>New to EduElimu? <Link to="/register" className='a'>Sign up here</Link></p></div>
                <div className='have_account'>
                <p id='p_tags3'>Already have an account? <Link to="/login" className='a'>Sign in here</Link></p></div> */}
            </div>
        </div>
      
    </section>
    </>
}

export default CustomReset;