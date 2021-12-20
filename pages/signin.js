import React, { useState } from 'react'
import { authorization, db } from '../firebase/config'
import { GoogleAuthProvider,onAuthStateChanged, signInWithPopup, signOut, createUserWithEmailAndPassword , signInWithEmailAndPassword  } from "firebase/auth";
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
        } else {
          // User is signed out
          // ...
        }
      });

    const SignupwithGoogle =  () => {
        const provider = new GoogleAuthProvider();
        // signinwithgoogle 
        // signInWithPopup(authorization, provider)
        //     .then((res) => {
        //         SetuserData(res);
        //         console.log(res);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });


        // add user data in the database

        // try {
        //     const docRef = await addDoc(collection(db, "users"), {
        //       name: "Ada",
        //       sub: false,
        //     });
        //     console.log("Document written with ID: ", docRef.id);
        //   } catch (e) {
        //     console.error("Error adding document: ", e);
        //   }

        // /signinwith email and password
        const email = "muradmr331@gmail.com";
        const password = "123456789";

        createUserWithEmailAndPassword(authorization, email, password)
  .then((userCredential) => {
    // Signed in 
    const accessToken = userCredential.user.accessToken;
    const uid = userCredential.user.uid;
    console.log(userCredential.user);
    // ...

      // add user data in the database

        try {
            const docRef =  addDoc(collection(db, "users"), {
              uid,
              accessToken,
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    // ..
  });
    }

    const Signout = () => {
        signOut(authorization).then(() => {
        }).catch((error) => {
            // An error happened.
        });
    }

    const login = () =>{
        const email = "muradmr331@gmail.com";
        const password = "123456789";
        signInWithEmailAndPassword(authorization, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
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
               userData.user?userData.user.displayName:"Please signin first"
           }
           <br/>
            <button onClick={SignupwithGoogle}>SignUp</button>
            <button onClick={login}>Login</button>
            <button onClick={Signout} >Logout</button>
        </div>
    )
}

export default Signin
