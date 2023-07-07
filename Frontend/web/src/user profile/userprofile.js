// import "./user_settings.css"
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import {FiUploadCloud} from "react-icons/fi";
import {GrFormNext} from "react-icons/gr";
import {MdOutlineSwitchAccount,MdOutlineCreate} from "react-icons/md";
import { toast } from 'react-toastify';
import LogoutConfirmationDialog from "../user_auth/logoutConfirmation";
function UserProfile({showLogout,setShowLogout}){
    const {currentUser} = useAuth();


    const [user, setUser] = useState(null);

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

    return <>
    {showLogout &&  <LogoutConfirmationDialog
                setShowLogout={setShowLogout}
              />}
    <div className="settings">
        <div className="img-divv">
            <img src="https://res.cloudinary.com/diqqf3eq2/image/upload/v1595959131/person-2_ipcjws.jpg"/>
        </div>
        <div className="user_info">
            <h3>Venessa Chebukwa</h3>
            <p>vanessachebukwa@gmail.com</p>
        </div>
    </div>
    <div className="user_settings_form">
        <div className="Account">
            <div>
                <MdOutlineSwitchAccount className="prof-icons"/>
                <span>Account Details</span>
            </div>
            <GrFormNext className="prof-icons"/>
        </div>
        <div className="chanel">
            <div>
                <MdOutlineCreate className="prof-icons"/>
                <span>Create Chanel</span>
            </div>
            <GrFormNext className="prof-icons"/>
        </div>
        <div className="videos">
            <div>
                <FiUploadCloud className="prof-icons"/>
                <span>Upload Videos</span>
            </div>
            <GrFormNext className="prof-icons"/>
        </div>
    </div>
    </>

}
export default UserProfile;