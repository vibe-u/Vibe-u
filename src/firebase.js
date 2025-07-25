// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDgOue2MbY-2fuPpZNIdPDZs-8gKzfMVVU",
    authDomain: "vibe-u.firebaseapp.com",
    projectId: "vibe-u",
    storageBucket: "vibe-u.firebasestorage.app",
    messagingSenderId: "426670395880",
    appId: "1:426670395880:web:1e1d499f8101bf9c34145d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authFirebase = getAuth();
export const dbFirebase = getFirestore(app);

export default app;