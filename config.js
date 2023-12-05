import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, createUserWithEmailAndPassword } from "firebase/auth"; // Add this line


// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA5KLzhhPC0tvw1LZ0Nqh1_6eaioP1gIhs",
  authDomain: "bsim-2138e.firebaseapp.com",
  databaseURL: "https://bsim-2138e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "bsim-2138e",
  storageBucket: "bsim-2138e.appspot.com",
  messagingSenderId: "388608036022",
  appId: "1:388608036022:web:8a69ff92a278c7719f6a17",
  measurementId: "G-ZLKYGQ9L0J",
};

const app = initializeApp(firebaseConfig);

// Initialize other Firebase services
const db = getDatabase();
const storage = getStorage();
const auth = getAuth();


export { db, storage, auth, signInWithEmailAndPassword, sendPasswordResetEmail, createUserWithEmailAndPassword };

