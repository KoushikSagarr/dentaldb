// src/firebase.js

// Import the core functions from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // <-- This is for Firestore (the database)
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // <-- This is for Authentication

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3GfQ8K_hlNSpF0aCNCtCzkC7xocQa1p0",
  authDomain: "dentaldashboard-b7244.firebaseapp.com",
  projectId: "dentaldashboard-b7244",
  storageBucket: "dentaldashboard-b7244.firebasestorage.app",
  messagingSenderId: "956356553912",
  appId: "1:956356553912:web:018564f0830df62616584d",
  measurementId: "G-K1GMXED31S"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase services and export them for use in your components
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();