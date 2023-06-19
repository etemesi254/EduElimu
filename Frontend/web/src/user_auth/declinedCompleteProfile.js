import { useEffect, useRef,useState } from 'react';
import './logoutConfirmation.css';
import { useNavigate } from 'react-router-dom'; 
import lottie from 'lottie-web';

function DeclineCompleteProfile ({setShowDeclinePrompt}){
    const container = useRef(null);

    function onCancel(){
        setShowDeclinePrompt(false);
    }

    useEffect(()=>{
        const instance = lottie.loadAnimation({
            container:container.current,
            renderer:'svg',
            loop: true,
            autoplay:true,
            animationData: require('./beedroid.json'),
        });
        return () => instance.destroy();
    },[]);
    
  return (
    <div className="logout-dialog">
      <div className="logout-dialog-content">
      <div className="lottie_container" ref={container}></div>
        <p>No worries, you can always complete your profile on the settings tab😊</p>
        <div className="logout-dialog-buttons">
          <button onClick={onCancel} id='cancel'>OKAY</button>
        </div>
      </div>
    </div>
  );
};

export default DeclineCompleteProfile;
