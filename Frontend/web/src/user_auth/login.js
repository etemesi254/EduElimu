import './register.css';
import lottie from 'lottie-web';
import { useEffect, useRef, useState } from 'react';
import { auth,provider } from './config';
import {signInWithPopup} from "firebase/auth";
import HomePage from '../completed_homepage/homepage';

function Loginuser (){
    const container = useRef(null);
    const [value,setValue] = useState('');

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

    const handleSignInWithGoogle= ()=>{
        signInWithPopup(auth,provider).then((data)=>{
            setValue(data.user.email);
            localStorage.setItem("email",data.user.email);
        })
    }

    useEffect(()=>{
        setValue(localStorage.getItem('email'))
    })
    return <>
    {value?<HomePage/>:
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
                <h3 className='alt-1'>Login</h3>
                <form className="form">
                    <input type="Email" placeholder="Email"/>
                    <input type="password" placeholder="Password"/>
                    <p id='fp'>Forgot password?</p>
                    <button type="submit" className="login">LOGIN</button>
                </form>
                <h4 className='alt'>OR</h4>
                <div className='signwith'>
                
                    <div className='big_tech' onClick={handleSignInWithGoogle}>
                        <img src='./assets/google.png'/>
                        <p>Sign in with Google</p>
                    </div>
               
                    <div className='big_tech' id='phone'>
                        <p>Sign in with Phone Number</p>
                    </div>
                </div>
                <div className='have_account'>
                    <p id='p_tags3'>New to EduElimu? <a href="">Sign in here</a></p></div>
            </div>
        </div>
      
    </section>
     }
    </>
}

export default Loginuser;