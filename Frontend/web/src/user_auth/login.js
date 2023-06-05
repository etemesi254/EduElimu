import './register.css';
import {IoChevronBackCircle} from "react-icons/io5";
function Loginuser (){
    return <section className='section'>
        <div className="register_background" style={{
        backgroundImage: `url("./assets/home (1).jpg")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        }}></div>
        <IoChevronBackCircle id='back_icon'/>
        <div className="form_container">
            <h2>Edu<b>Elimu</b></h2>
            <p id='p_tags1'>Welcome Back To EduElimu</p>
            <img src="" alt=""/>
            <form className="form">
                <input type="Email" placeholder="Email"/>
                <input type="password" placeholder="Password"/>

                <button type="submit" className="login">Login</button>
            </form>
            <p id='p_tags2'>--- or sign in with ---</p>
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
                <p id='p_tags3'>Don't have an account? <a href="">Sign up here</a></p></div>
        </div>
    </section>
}

export default Loginuser;