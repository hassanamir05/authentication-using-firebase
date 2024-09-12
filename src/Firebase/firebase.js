import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAom0LZXX8OKjxLZ9KMPbqqKKm48sDnb5U",
  authDomain: "chatting-application-126c8.firebaseapp.com",
  projectId: "chatting-application-126c8",
  storageBucket: "chatting-application-126c8.appspot.com",
  messagingSenderId: "579602789407",
  appId: "1:579602789407:web:808eadff437097e5c6912a",
  measurementId: "G-2JMPEDYKNL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

//Initialize Database
const db = getFirestore(app);

//google auth provider
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, googleProvider };
