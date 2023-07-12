import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "my-store-engine.firebaseapp.com",
  projectId: "my-store-engine",
  storageBucket: "my-store-engine.appspot.com",
  messagingSenderId: "574312611096",
  appId: "1:574312611096:web:025e3953481d22e2beb26d"
};

const firestoreApp = initializeApp(firebaseConfig);

export default firestoreApp;
