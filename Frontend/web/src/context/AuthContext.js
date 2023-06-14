import React, { useContext, useEffect, useState } from 'react';
import { authFB } from '../user_auth/firebase';


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
        login
    }
  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}
