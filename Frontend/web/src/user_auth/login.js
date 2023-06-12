import './register.css';
import lottie from 'lottie-web';
import { useEffect, useRef } from 'react';
import {IoChevronBackCircle} from "react-icons/io5";
function Loginuser (){
    const container = useRef(null);

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
    return <section className='section_register'>
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
                    <div className='big_tech'>
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

export default Loginuser;