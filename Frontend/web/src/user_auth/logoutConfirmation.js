import { useEffect, useRef,useState } from 'react';
import './logoutConfirmation.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; 
import lottie from 'lottie-web';

function LogoutConfirmationDialog ({setShowLogout}){
    const {logout} = useAuth();
    const container = useRef(null);
    
    async function onConfirm(){
        try {
            await logout();
            setShowLogout(false);
            navigate("/login");
        } catch (error) {
            setError(error.message);
        }
    }

    function onCancel(){
        setShowLogout(false);
    }
    const [error, setError ] = useState();
    const navigate = useNavigate();

    useEffect(()=>{
        const instance = lottie.loadAnimation({
            container:container.current,
            renderer:'svg',
            loop: true,
            autoplay:true,
            animationData: require('./log-out.json'),
        });
        return () => instance.destroy();
    },[]);
    
  return (
    <div className="logout-dialog">
      <div className="logout-dialog-content">
      <div className="lottie_container" ref={container}></div>
        <h2>Are you sure you want to logout?</h2>
        <div className="logout-dialog-buttons">
          <button onClick={onConfirm} id='logout'>Logout</button>
          <button onClick={onCancel} id='cancel'>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmationDialog;
