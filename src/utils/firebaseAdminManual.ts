import { initializeApp, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBVQrkKVcT-rME8t-XQefo9urKnqN3htPM",
  authDomain: "styleloom-wadah.firebaseapp.com",
  projectId: "styleloom-wadah",
  storageBucket: "styleloom-wadah.firebasestorage.app",
  messagingSenderId: "735724978870",
  appId: "1:735724978870:web:701cf1aecfaafdf7f71c17",
  measurementId: "G-VC63T4SST6"
};

/**
 * INITIALIZES A SECONDARY FIREBASE APP INSTANCE
 * THIS ALLOWS THE ADMIN TO CREATE NEW USERS WITHOUT BEING LOGGED OUT OF THE MAIN APP
 */
export const getSecondaryAuth = (): Auth => {
  let secondaryApp: FirebaseApp;
  try {
    secondaryApp = getApp("SecondaryAdminApp");
  } catch (e) {
    secondaryApp = initializeApp(firebaseConfig, "SecondaryAdminApp");
  }
  return getAuth(secondaryApp);
};
