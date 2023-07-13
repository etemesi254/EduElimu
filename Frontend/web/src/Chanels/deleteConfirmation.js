import { useContext, useEffect, useRef,useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import lottie from 'lottie-web';
import { toast } from 'react-toastify';
import { useUserContext } from '../context/UserContext';

function DeleteConfirmation ({setShowDelete}){
    const container = useRef(null);
    const {getCurrentUser} = useUserContext();
    
    async function onConfirm(){
        try {
            const url = `http://127.0.0.1:8000/api/channels/delete`;

            const response = await fetch(url, {
            // mode: 'no-cors',
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
              "id":localStorage.getItem("channel_id"),
          })
            });
            setShowDelete(false);
            const result = await response.json();
            console.log(result.message);
            if(result.status === 200) {
              getCurrentUser();
                return toast.success('Channel deleted successfully');
            }
            toast.error('Error deleting channel');
        } catch (error) {
            return toast.error(error.message);
        }
    }

    function onCancel(){
        setShowDelete(false);
    }

    useEffect(()=>{
        const instance = lottie.loadAnimation({
            container:container.current,
            renderer:'svg',
            loop: true,
            autoplay:true,
            animationData: require('./delete.json'),
        });
        return () => instance.destroy();
    },[]);
    
  return (
    <div className="logout-dialog">
      <div className="logout-dialog-content">
      <div className="lottie_container" ref={container}></div>
        <h2>Delete Channel?</h2>
        <p>This action will also delete all videos in this channel</p>
        <div className="logout-dialog-buttons">
          <button onClick={onConfirm} id='logout'>Delete</button>
          <button onClick={onCancel} id='cancel'>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
