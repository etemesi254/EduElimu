import './register.css';
import lottie from 'lottie-web';
import { useEffect, useRef,useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link , useNavigate} from 'react-router-dom';

function RegisterUser (){
    const container = useRef(null);
    const {signup} = useAuth();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();

    const handleEmailInput = (e) => setEmail(e.target.value);
    const handlePasswordInput = (e) => setPassword(e.target.value);
    const handleConfirmPasswordInput = (e) => setConfirmPassword(e.target.value);

    function hasSpecialCharacters(password) {
        const specialCharactersRegex = '/[!@#$%^&*(),.?":{}|<>]/';
        return specialCharactersRegex.test(password);
      }

    async function handleSubmit(e){
        e.preventDefault();
        if(!hasSpecialCharacters(password)){
            setError('Your passwords should contain special characters');
        }
        if(password!= confirmPassword){
            setError('Your passwords do not match')
            setTimeout(() => {
                setError('');
            }, 3000);
        }else{
            try{
                setLoading(true);
                await signup(email,password);
                navigate("/");
            }catch(error){
                const errorMessage = error.message.startsWith("Firebase: ")
                ? error.message.substring("Firebase: ".length) // Remove the "Firebase: " prefix
                : error.message;

                setError(errorMessage);
            }
            setLoading(false);
            setTimeout(() => {
                setError('');
            }, 3000);
        }
    }

    function navigateToPhonePage(){
        navigate('/signupwithphone')
    }

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
                {error?<div className='error'>
                    <p>{error}</p>
                </div>:''}
                <h3 className='alt-1'>Sign Up</h3>
                <form className="form" onSubmit={handleSubmit}>
                    <input 
                        type="Email" 
                        placeholder="Email" 
                        onChange={handleEmailInput} 
                        value={email}/>
                    <input type="password" 
                        placeholder="Password" 
                        onChange={handlePasswordInput} 
                        value={password}/>
                    <input 
                        type="password" 
                        placeholder="Confirm Password" 
                        onChange={handleConfirmPasswordInput} 
                        value={confirmPassword}/>
                    <button type="submit" className="login" disabled={loading}>REGISTER</button>
                </form>
                <h4 className='alt'>OR</h4>
                <div className='signwith'>
                    <div className='big_tech'>
                        <img src='./assets/google.png'/>
                        <p>Sign up with Google</p>
                    </div>
                    <div className='big_tech' id='phone' onClick={navigateToPhonePage}>
                        <p>Sign in with Phone Number</p>
                    </div>
                </div>
                <div className='have_account'>
                    <p id='p_tags3'>Already have an account? <Link to="/login" className='a'>Sign in here</Link></p></div>
            </div>
        </div>
    </section>
}

export default RegisterUser;