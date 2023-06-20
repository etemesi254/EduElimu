import './register.css';
import lottie from 'lottie-web';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import "react-phone-number-input/style.css";
import PhoneInput from 'react-phone-number-input';
import OtpInput from 'react-otp-input';
import { isValidNumber, parsePhoneNumberFromString } from 'libphonenumber-js';


function SignInWithPhone (){
    const container = useRef(null);
    const [phoneNumber,setPhoneNumber] = useState('');
    const {setUpRecaptcha} = useAuth();
    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false);
    const [message,setMessage] = useState('');
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const [confirmObj,setConfirmObj] = useState('');
    const [flag, setFlag] = useState(false);


    useEffect(()=>{
        const instance = lottie.loadAnimation({
            container:container.current,
            renderer:'svg',
            loop: true,
            autoplay:true,
            animationData: require('./otp-verification.json'),
        });
        return () => instance.destroy();
    },[]);

    function validatePhoneNumber() {
        try {
          const parsedNumber = parsePhoneNumberFromString(phoneNumber);
          return parsedNumber ? isValidNumber(parsedNumber) : false;
        } catch (error) {
          console.error('Phone number validation error:', error);
          return false;
        }
      }

    async function handleSubmit(e){
        e.preventDefault();
        setError("");
        if(phoneNumber === "" || phoneNumber === undefined || !validatePhoneNumber) return setError("Please enter a valid phone number");

        try {
            const response = await setUpRecaptcha(phoneNumber);
            console.log(response);
            setConfirmObj(response);
            setFlag(true);
        } catch (error) {
            const errorMessage = error.message.startsWith("Firebase: ")
            ? error.message.substring("Firebase: ".length) // Remove the "Firebase: " prefix
            : error.message;

            setError(errorMessage);
        }
    }

    async function verifyOTP(e){
        e.preventDefault();
        if(otp === "" || otp === undefined) return setError("Please enter OTP number");
        try {
            setError("");
            await confirmObj.confirm(otp);
            navigate("/");
        } catch (error) {
            setError(error.message);
        }
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
                <h3 className='alt-1'>{flag? "Verify OTP" : "Phone Authentcation"}</h3>
                {!flag && <form className="form" onSubmit={handleSubmit}>
                    <PhoneInput defaultCountry='KE' value={phoneNumber} onChange={setPhoneNumber} id="phoneNo" placeholder="Enter Phone Number" />
                    <div id='recaptcha-container'></div>
                    <button type="submit" className="login" disabled={loading}>Send OTP</button>
                </form>}
                {flag && <form className="form" onSubmit={verifyOTP}>
                <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span>-</span>}
                    renderInput={(props) => <input {...props} />}
                    />
                    <button type="submit" className="login" disabled={loading}>Verify OTP</button>
                </form>}
                <div className='have_account'>
                    <p id='p_tags3'>New to EduElimu? <Link to="/register" className='a'>Sign up here</Link></p></div>
                <div className='have_account'>
                <p id='p_tags3'>Already have an account? <Link to="/login" className='a'>Sign in here</Link></p></div>
            </div>
        </div>
      
    </section>
    </>
}

export default SignInWithPhone;