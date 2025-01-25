// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc  } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, ref, uploadBytesResumable, getDownloadURL } from "firebase/auth";
import { getStorage } from 'firebase/storage';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDADDo7Q2TMxP3QdNRDrL1oTa6sG8hq0Jg",
  authDomain: "wastex-da8fa.firebaseapp.com",
  projectId: "wastex-da8fa",
  storageBucket: "wastex-da8fa.firebasestorage.app",
  messagingSenderId: "102261141547",
  appId: "1:102261141547:web:31c1df510e95753ff77a6e",
  measurementId: "G-9H852RZ8KZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);

export { db,storage,auth, provider, signInWithPopup, collection, addDoc  };