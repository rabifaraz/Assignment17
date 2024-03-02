// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfFeQhNzMl72AnwgYyswYYXU2g-CHIpQ8",
  authDomain: "emailauthfirebase-rabi.firebaseapp.com",
  databaseURL: "https://emailauthfirebase-rabi-default-rtdb.firebaseio.com",
  projectId: "emailauthfirebase-rabi",
  storageBucket: "emailauthfirebase-rabi.appspot.com",
  messagingSenderId: "956059753096",
  appId: "1:956059753096:web:ec7d47fa6810adf392dd3d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
