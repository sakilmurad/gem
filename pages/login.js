import React from 'react'
import { authorization, db } from '../firebase/config'
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import Router from 'next/router';
import { collection, addDoc } from "firebase/firestore";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import GoogleIcon from '@mui/icons-material/Google';
import Divider  from '@mui/material/Divider';

function login() {

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
    
      const googleSigninButton = () =>{
        return(
          <div style={{marginTop:15}}>
             <Button variant="outlined" startIcon={<GoogleIcon />} onClick={SignupwithGoogle}>
              Signin with Google
            </Button>
          </div>
        )
      }

      const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
          const email = data.get('email');
          const password = data.get('password');
          
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
      };
    

    return (
        <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Divider light/>
      <Box component="div" sx={{display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: "2ch",
        marginTop: "2ch",
        backgroundColor: "#F6F6F6",
        borderRadius: "2ch"}}>
      {googleSigninButton()}
      <p>OR</p>
      <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/signin" variant="body2">
              haven't an account? Signup
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
    </Box>
  </Container>
    )
}

export default login
