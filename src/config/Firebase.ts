// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // *** استيراد Auth *** // *** هذا السطر تمت إضافته ***

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVQrkKVcT-rME8t-XQefo9urKnqN3htPM",
  authDomain: "styleloom-wadah.firebaseapp.com",
  projectId: "styleloom-wadah",
  storageBucket: "styleloom-wadah.firebasestorage.app",
  messagingSenderId: "735724978870",
  appId: "1:735724978870:web:701cf1aecfaafdf7f71c17",
  measurementId: "G-VC63T4SST6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); // هذا السطر كان موجوداً لديك

// *** تهيئة Cloud Firestore وتصديرها ***
const db = getFirestore(app);
const auth = getAuth(app); // *** تهيئة Authentication ***

export { db, auth };
