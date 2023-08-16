// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMdRdy9ayO_0ek5kJ9Wvpol-vwnZ6GeOE",
  authDomain: "auth-4abbd.firebaseapp.com",
  projectId: "auth-4abbd",
  storageBucket: "auth-4abbd.appspot.com",
  messagingSenderId: "722293998126",
  appId: "1:722293998126:web:565c675c51d50235ecd5bf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoole = async () => await signInWithPopup(auth, provider);
