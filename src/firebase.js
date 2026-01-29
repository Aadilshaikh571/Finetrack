import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyA5sgN9zpdUn1CoIhJusdmN9wuCJqs_4NI",
  authDomain: "personal-finance-tra.firebaseapp.com",
  projectId: "personal-finance-tra",
  storageBucket: "personal-finance-tra.firebasestorage.app",
  messagingSenderId: "101947789959",
  appId: "1:101947789959:web:2734dc2997599160289e22",
  measurementId: "G-EJ5BR7QV30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };