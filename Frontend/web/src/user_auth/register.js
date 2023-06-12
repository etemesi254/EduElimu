import './register.css';
import lottie from 'lottie-web';
import { useEffect, useRef } from 'react';
import {IoChevronBackCircle} from "react-icons/io5";
function RegisterUser (){
    const container = useRef(null);

    useEffect(()=>{
        const instance = lottie.loadAnimation({
            container:container.current,
            renderer:'svg',
            loop: true,
            autoplay:true,
            animationData: require('./sign-up.json'),
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
                <form className="form">
                    <input type="Email" placeholder="Email"/>
                    <input type="password" placeholder="Password"/>
                    <input type="password" placeholder="Confirm Password"/>
                    <button type="submit" className="login">REGISTER</button>
                </form>
                <h3 className='alt'>OR</h3>
                <div className='signwith'>
                    <div className='big_tech'>
                        <img src='./assets/google.png'/>
                    </div>
                    <div className='big_tech'>
                        <img src='./assets/microsoft.png'/>
                    </div>
                    <div className='big_tech'>
                        <img src='./assets/facebook.png'/>
                    </div>
                </div>
                <div className='have_account'>
                    <p id='p_tags3'>Already have an account? <a href="">Sign in here</a></p></div>
            </div>
        </div>
    </section>
}

export default RegisterUser;