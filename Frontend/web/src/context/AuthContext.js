import React, { useContext, useEffect, useState } from 'react';
import { authFB } from '../user_auth/firebase';
import { RecaptchaVerifier } from 'firebase/auth';


const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState();
    const [loading,setLoading] = useState(true);


    function signup(email, password) {
        return authFB.createUserWithEmailAndPassword(email, password);
    }

    function login(email, password) {
        return authFB.signInWithEmailAndPassword(email, password);
    }

    function logout(){
        return authFB.signOut();
    }

    function resetPassword(email){
        return authFB.sendPasswordResetEmail(email);
    }

    function setUpRecaptcha(number){
        const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, authFB);

        recaptchaVerifier.render();
        return authFB.signInWithPhoneNumber(number,recaptchaVerifier);
    }

    useEffect(()=>{
        const unsubscribe = authFB.onAuthStateChanged(user=>{
            setCurrentUser(user);
            setLoading(false);
        })

        return unsubscribe;
    },[])
    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        setUpRecaptcha
    }
  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}
