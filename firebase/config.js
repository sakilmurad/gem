import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyARavXNhB6xvtZZo2BNXZ8grvXxZFTwSNQ",
  authDomain: "gem-portal-course.firebaseapp.com",
  projectId: "gem-portal-course",
  storageBucket: "gem-portal-course.appspot.com",
  messagingSenderId: "1015373003715",
  appId: "1:1015373003715:web:b59414a9b1946c24869b76",
  measurementId: "G-Z14R5R1K9P"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const authorization = getAuth(app)
export {db, authorization} ;