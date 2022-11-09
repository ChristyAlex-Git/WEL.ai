// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmOVXpiIehMBXoMhezTB0CaBm75nxbSoQ",
  authDomain: "welai-35421.firebaseapp.com",
  projectId: "welai-35421",
  storageBucket: "welai-35421.appspot.com",
  messagingSenderId: "890528804454",
  appId: "1:890528804454:web:33bf8911c3a0d364b1c7a7",
  measurementId: "G-ZG4KDP1RM1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore()