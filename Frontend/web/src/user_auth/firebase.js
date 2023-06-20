import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const app = firebase.initializeApp({
    apiKey: "AIzaSyD_NvaU5wvR41xHaAeEk41vsBOgT0YLM0M",
    authDomain: "eduelimu.firebaseapp.com",
    projectId: "eduelimu",
    storageBucket: "eduelimu.appspot.com",
    messagingSenderId: "289499981898",
    appId: "1:289499981898:web:97681579c96a5c74b0deb3",
    measurementId: "G-T4Y25T09C7"
});

export const authFB = app.auth();
export default app;