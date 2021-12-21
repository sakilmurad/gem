import React, { useState } from 'react'
import { authorization, db } from '../firebase/config'
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import Router from 'next/router';


function Signin() {
  const [userData, SetuserData] = useState([]);

  onAuthStateChanged(authorization, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      Router.push("/")
      // ...
    }
  });

  const SignupwithGoogle = () => {
    const provider = new GoogleAuthProvider();
    // signinwithgoogle 
    signInWithPopup(authorization, provider)
      .then((res) => {
        SetuserData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }


  const login = () => {
    const email = "muradmr331@gmail.com";
    const password = "123456789";
    signInWithEmailAndPassword(authorization, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  return (
    <div>
      {
        userData.user ? userData.user.displayName : "Please signin first"
      }
      <br />
      <button onClick={SignupwithGoogle}>SignUp</button>
      <button onClick={login}>Login</button>
    </div>
  )
}

export default Signin
