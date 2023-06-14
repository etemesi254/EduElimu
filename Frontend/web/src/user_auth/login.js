import './register.css';
import lottie from 'lottie-web';
import { useEffect, useRef, useState } from 'react';
import { auth,provider } from './config';
import {signInWithPopup} from "firebase/auth";
import HomePage from '../completed_homepage/homepage';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Loginuser (){
    const container = useRef(null);
    const [value,setValue] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const {login} = useAuth();
    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();

    const handleEmailInput = (e)=> setEmail(e.target.value);
    const handlePasswordInput = (e)=> setPassword(e.target.value);

    useEffect(()=>{
        const instance = lottie.loadAnimation({
            container:container.current,
            renderer:'svg',
            loop: true,
            autoplay:true,
            animationData: require('./login.json'),
        });
        return () => instance.destroy();
    },[]);

    async function handleSignInWithGoogle (){
        await signInWithPopup(auth,provider).then((data)=>{
            setValue(data.user.email);
            localStorage.setItem("email",data.user.email);
        });
        navigate('/');
        
    }

    async function handleSubmit(e){
        e.preventDefault();
        try{
            setLoading(true);
            await login(email,password);
            navigate("/");
        }catch(error){
            setError(`${error.message}`);
        }
        setLoading(false);
        setTimeout(() => {
            setError('');
        }, 3000);
    }

    function navigateToPhonePage(){
        navigate('/signupwithphone')
    }

    useEffect(()=>{
        setValue(localStorage.getItem('email'))
    })
    return <>
    {/* {value?<HomePage/>:} */}
    <section className='section_register'>
        
        <div className="register_background" style={{
        backgroundImage: `url("./assets/home (1).jpg")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        }}></div>
        {/* <IoChevronBackCircle id='back_icon'/> */}
        <div className="form_container">
            <div className="whiite-bk">
                <div className="lottie_container" ref={container}></div>
                {error?<div className='error'>
                    <p>{error}</p>
                </div>:''}
                <h3 className='alt-1'>Login</h3>
                <form className="form" onSubmit={handleSubmit}>
                    <input type="Email" placeholder="Email" value={email} onChange={handleEmailInput}/>
                    <input type="password" placeholder="Password" value={password} onChange={handlePasswordInput}/>
                    <p id='fp'><Link to="/forgotPassword" className='fp'>Forgot Password?</Link></p>
                    <button type="submit" className="login" disabled={loading}>LOGIN</button>
                </form>
                <h4 className='alt'>OR</h4>
                <div className='signwith'>
                
                    <div className='big_tech' onClick={handleSignInWithGoogle}>
                        <img src='./assets/google.png'/>
                        <p>Sign in with Google</p>
                    </div>
               
                    <div className='big_tech' id='phone' onClick={navigateToPhonePage}>
                        <p>Sign in with Phone Number</p>
                    </div>
                </div>
                <div className='have_account'>
                    <p id='p_tags3'>New to EduElimu? <Link to="/register" className='a'>Sign up here</Link></p></div>
            </div>
        </div>
      
    </section>
    </>
}

export default Loginuser;