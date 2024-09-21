import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBfEcTFkCD-cPGOM_DgvfikLSNDVFBZXRQ",
  authDomain: "chat-af4ca.firebaseapp.com",
  projectId: "chat-af4ca",
  storageBucket: "chat-af4ca.appspot.com",
  messagingSenderId: "556666572493",
  appId: "1:556666572493:web:f33a7360f8551c235fe384"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();