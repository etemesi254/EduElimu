import "./user_settings.css"
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { useRef } from 'react';
import {AiFillPlusCircle} from 'react-icons/ai';
import LogoutConfirmationDialog from "../user_auth/logoutConfirmation";
import { useUserContext } from "../context/UserContext";
function UserSettings({showLogout,setShowLogout}){
    const [name,setName] = useState('');
    const [phone_number,setPhone] = useState('');
    const [profile_image,setProfileImage] = useState('');
    const [DOB,setDOB] = useState('');
    const [email,setEmail] = useState('');
    const [imageSRC,setImageSRC] = useState('');
    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false);
    const [message,setMessage] = useState('');


    const {user} = useUserContext();

    const handlePhoneInput = (e)=> setPhone(e.target.value);
    const handleNameInput = (e)=> setName(e.target.value);
    const handleDOBInput = (e)=> setDOB(e.target.value);
    const handleEmailInput = (e)=> setEmail(e.target.value);

    const fileInputRef = useRef(null);

    const handleIconClick = () => {
      fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
      const selectedFile = event.target.files[0];
      setProfileImage(selectedFile);
      console.log(profile_image);
      console.log(selectedFile);
    };


    const displayName = user && user.name ? user.name : (user && user.email ? user.email.split('@')[0] : 'Default Name');
    const displaypic = user && user.profile_image ? `http://127.0.0.1:8000/storage/${user.profile_image}`:`${process.env.PUBLIC_URL}/assets/eduelimu.png`;
    const displayEmail = user && user.email ? user.email :'Default Email';
    const displayPhone = user && user.phoneNumber ? user.phoneNumber :'123456789';
    const displayDOB = user && user.DOB ? user.DOB :'Default DOB';


    async function handleSubmit(e) {
      e.preventDefault();
      const formData = new FormData();
    
      try {
        setLoading(true);
    
        formData.append('name', name);
        formData.append('profile_image', profile_image);
        formData.append('phone_number', phone_number);
        formData.append('DOB', DOB);
    
        const response = await fetch('http://127.0.0.1:8000/api/updateUserWithEmail/' + user.email, {
          method: 'POST',
          body: formData,
          // headers: {
          //   // Set appropriate headers for multipart/form-data
          //   'Content-Type': 'multipart/form-data',
          // },
        });
    
        console.log(response);
        const result = await response.json();
        console.log(result);
    
        if (response.status === 201) {
          return toast.success('Profile updated successfully!');
        }
      } catch (error) {
        const errorMessage = error.message.startsWith('Firebase: ')
          ? error.message.substring('Firebase: '.length) // Remove the "Firebase: " prefix
          : error.message;
    
        setError(errorMessage);
      }
    
      setLoading(false);
      setTimeout(() => {
        setError('');
        setMessage('');
      }, 3000);
    }
    
      
    return <div className="home-image">
    {showLogout &&  <LogoutConfirmationDialog
                setShowLogout={setShowLogout}
              />}
    <div className="settings">
        <div className="img-divv">
            <img src={displaypic}/>
            <AiFillPlusCircle id="change-pic" onClick={handleIconClick}/>
            <input
              type="file"
              id="file-upload"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
        </div>
        <div className="user_info">
            <h3>{displayName}</h3>
            <p>{displayEmail}</p>
        </div>
    </div>
    <div className="user_settings_form">
        <form onSubmit={handleSubmit}>
            <div className="">
                <div className="form-group">
                    <div className="settings_input">
                        <label>Name</label>
                        <input type="text" name="name" value={name} placeholder={displayName} onChange={handleNameInput}/>
                    </div>
                    <div className="settings_input">
                        <label>Email</label>
                        <input type="email" name="email" value={email} placeholder={displayEmail} onChange={handleEmailInput}/>
                    </div>
                    <div className="settings_input">
                        <label>Phone Number</label>
                        <input type="number" name="phone_number" value={phone_number} placeholder={displayPhone} onChange={handlePhoneInput}/>
                    </div>
                    <div className="settings_input">
                        <label>Date of Birth</label>
                        <input type="date" name="DOB" value={DOB} placeholder={displayDOB} onChange={handleDOBInput}/>
                    </div>
                </div>
                <br/>
                <div className="button-div">
                    <button type="submit">Save Changes</button>
                </div>
            </div>
        </form>
    </div>
    </div>

}
export default UserSettings;