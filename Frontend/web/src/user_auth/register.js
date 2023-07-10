import './register.css';
import lottie from 'lottie-web';
import { useEffect, useRef,useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link , useNavigate} from 'react-router-dom';
import { auth,provider } from './config';
import {signInWithPopup} from "firebase/auth";


function RegisterUser ({setCompleteProfile}){
    const container = useRef(null);
    const [value,setValue] = useState('');
    const {signup,loginLaravel,registerUserLaravel} = useAuth();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false);
    const [showSpinner,setShowSpinner] = useState(false);
    const navigate = useNavigate();
    const csrfToken = window.CSRF_TOKEN;


    const handleEmailInput = (e) => setEmail(e.target.value);
    const handlePasswordInput = (e) => setPassword(e.target.value);
    const handleConfirmPasswordInput = (e) => setConfirmPassword(e.target.value);

    function hasSpecialCharacters(password) {
        const specialCharactersRegex = /[!@#$%^&*(),.?":{}|<>]/;
        return specialCharactersRegex.test(password);
      }

      async function handleSignUpwithGoogle (){
        await signInWithPopup(auth,provider).then(async (data)=>{
            setValue(data.user.email);
            try {
                let email = data.user.email;
                let firebase_id = data.user.uid;
                let profile_image = data.user.protoURL;
                const response = await registerUserLaravel(email,firebase_id,profile_image);
                if(response.status === 200) {
                    return navigate('/');
                }else{
                    return setError("Couldn't register user.Try again later.");
                }
            } catch (error) {
                return setError(error.message);
            }
            
        });
    }

    async function handleSubmit(e){
        e.preventDefault();
        if(!hasSpecialCharacters(password)){
            return setError('Your passwords should contain special characters');
        }
        if(password!= confirmPassword){
            return setError('Your passwords do not match')
        }
        setShowSpinner(true);
        try {
            const response = await fetch('http://127.0.0.1:8000/api/registerUser', {
                // mode: 'no-cors',
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken,
              },
              body: JSON.stringify({
                "email":email, "password":password
            }),
            });
            console.log(response)
        
            if (response.status === 200) {
                try{
                    setLoading(true);
                    
                    await signup(email,password);
                    await loginLaravel(email,password);
                    navigate("/");

                    setTimeout(() => {
                        setCompleteProfile(true);
                      }, 10000); 
                      setShowSpinner(false);
                }catch(error){
                    setShowSpinner(false);
                    const errorMessage = error.message.startsWith("Firebase: ")
                    ? error.message.substring("Firebase: ".length) // Remove the "Firebase: " prefix
                    : error.message;
        
                    return setError(errorMessage);
                }
            }
        
            const data = await response.json();
            console.log('User registered successfully:', data);
            setShowSpinner(false);
            return data;
          } catch (error) {
            setShowSpinner(false);
            return console.error(error.message);
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
    return <>
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
                
                <h3 className='alt-1'>Sign Up</h3>
                <div className='message'>
                    <p>Password should have 6 or more characters including a special character</p>
                </div>
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
                    <div className='big_tech' onClick={handleSignUpwithGoogle}>
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
    </>
}

export default RegisterUser;