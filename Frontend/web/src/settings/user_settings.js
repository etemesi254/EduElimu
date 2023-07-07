import "./user_settings.css"
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import {AiFillPlusCircle} from 'react-icons/ai';
import LogoutConfirmationDialog from "../user_auth/logoutConfirmation";
function UserSettings({showLogout,setShowLogout}){
    const {currentUser} = useAuth();
    const [name,setName] = useState('');
    const [phone_number,setPhone] = useState('');
    const [profile_image,setProfileImage] = useState('');
    const [DOB,setDOB] = useState('');
    const [email,setEmail] = useState('');
    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false);
    const [message,setMessage] = useState('');


    const [user, setUser] = useState(null);

    const handlePhoneInput = (e)=> setPhone(e.target.value);
    const handleNameInput = (e)=> setName(e.target.value);
    const handleProfileInput = (e)=> setProfileImage(e.target.value);
    const handleDOBInput = (e)=> setDOB(e.target.value);
    const handleEmailInput = (e)=> setEmail(e.target.value);

  useEffect(() => {
    async function getCurrentUser() {
      try {
        const email = encodeURIComponent(currentUser.email);
        const phoneNumber = currentUser.phoneNumber;

        const url = `http://127.0.0.1:8000/api/getCurrentUser?email=${email}&phone_number=${phoneNumber}`;

        const response = await fetch(url, {
          // mode: 'no-cors',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 201) {
            const user = await response.json();
            setUser(user); // Update the user state
          } else {
            throw new Error('Failed to fetch current user');
          }
        } catch (error) {
          console.error('Error:', error.message);
        }
      }
  
      getCurrentUser(); 
    }, []); 

    const displayName = user && user.data.name ? user.data.name : 'Default Name';
    const displayEmail = user && user.data.email ? user.data.email :'Default Email';
    const displayPhone = user && user.data.phoneNumber ? user.data.phoneNumber :'123456789';
    const displayDOB = user && user.data.DOB ? user.data.DOB :'Default DOB';

    console.log(user);

    async function handleSubmit(e){
        e.preventDefault();
        try{
            setLoading(true);
            const response = await fetch('http://127.0.0.1:8000/api/updateUserWithEmail/'+ currentUser.email, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({name,phone_number,profile_image,DOB}),
            });

            console.log(response);
            console.log(currentUser);

            if(response.status === 201){
                return toast.success('Profile updated successfully!');
            }
        }catch(error){
            const errorMessage = error.message.startsWith("Firebase: ")
            ? error.message.substring("Firebase: ".length) // Remove the "Firebase: " prefix
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
            <img src="https://res.cloudinary.com/diqqf3eq2/image/upload/v1595959131/person-2_ipcjws.jpg"/>
            <AiFillPlusCircle id="change-pic"/>
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