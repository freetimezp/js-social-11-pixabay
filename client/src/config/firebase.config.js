import { initializeApp, getApps, getApp } from "firebase/app";
//import { getAuth } from "firebase/auth";
import { getAuth } from "firebase/auth";

//console.log("Firebase config getAuth:", getAuth);

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APPID
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
//console.log("Firebase config app:", app);
const firebaseAuth = getAuth(app);
console.log("Firebase config firebaseAuth:", firebaseAuth);

export { app, firebaseAuth };