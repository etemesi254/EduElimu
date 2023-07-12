import { useEffect, useRef,useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import lottie from 'lottie-web';
import { toast } from 'react-toastify';

function DeleteConfirmation ({setShowDeleteVideo}){
    const container = useRef(null);
    
    async function onConfirm(){
        try {
            const url = `http://127.0.0.1:8000/api/videos/delete`;

            const response = await fetch(url, {
            // mode: 'no-cors',
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
              "id":localStorage.getItem("video_id"),
          })
            });
            setShowDeleteVideo(false);
            const result = await response.json();
            console.log(result);
            if(result.status === 200) {
                return toast.success('Video deleted successfully');
            }
            toast.error('Error deleting video');
        } catch (error) {
            return toast.error(error.message);
        }
    }

    function onCancel(){
        setShowDeleteVideo(false);
    }

    useEffect(()=>{
        const instance = lottie.loadAnimation({
            container:container.current,
            renderer:'svg',
            loop: true,
            autoplay:true,
            animationData: require('../delete.json'),
        });
        return () => instance.destroy();
    },[]);
    
  return (
    <div className="logout-dialog">
      <div className="logout-dialog-content">
      <div className="lottie_container" ref={container}></div>
        <h2>Are you sure you want to delete this video?</h2>
        <div className="logout-dialog-buttons">
          <button onClick={onConfirm} id='logout'>Delete</button>
          <button onClick={onCancel} id='cancel'>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
