// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "laterlist-77332.firebaseapp.com",
  projectId: "laterlist-77332",
  storageBucket: "laterlist-77332.firebasestorage.app",
  messagingSenderId: "642483924569",
  appId: "1:642483924569:web:696f09deae7b28930fcb48",
};

export const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
