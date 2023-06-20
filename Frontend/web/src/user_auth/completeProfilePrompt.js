import { useEffect, useRef,useState } from 'react';
import './logoutConfirmation.css';
import { useNavigate } from 'react-router-dom'; 
import lottie from 'lottie-web';

function CompleteProfilePrompt ({setCompleteProfile,setShowDeclinePrompt}){
    const container = useRef(null);
    
    async function onConfirm(){
        try {
            setCompleteProfile(false);
            navigate("/completeProfile");
        } catch (error) {
            setError(error.message);
        }
    }

    function onCancel(){
        setCompleteProfile(false);
        setShowDeclinePrompt(true);
    }
    const [error, setError ] = useState();
    const navigate = useNavigate();

    useEffect(()=>{
        const instance = lottie.loadAnimation({
            container:container.current,
            renderer:'svg',
            loop: true,
            autoplay:true,
            animationData: require('./wantcompleteprof.json'),
        });
        return () => instance.destroy();
    },[]);
    
  return (
    <div className="logout-dialog">
      <div className="logout-dialog-content">
      <div className="lottie_container" ref={container}></div>
        <h2>Do you want to complete your profile?</h2>
        <div className="logout-dialog-buttons">
          <button onClick={onConfirm} id='complete'>Complete</button>
          <button onClick={onCancel} id='cancel'>Later</button>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfilePrompt;
