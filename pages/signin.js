import React from 'react'
import { authorization, db } from '../firebase/config'
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc  } from "firebase/firestore";
import Router from 'next/router';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import GoogleIcon from '@mui/icons-material/Google';
import LinearProgress from '@mui/material/LinearProgress';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Head from "next/head";

const insertData = async (displayName,email, uid)=>{
  const data = {
    displayName,
    email
};

  try {
    await setDoc(doc(db, "users", uid), data);
  } catch (e) {
    signOut(authorization)
  }
}

function Signin() {

  const [formLoading, setFormLoading] = React.useState(false);
  const [MessageStatus, setMessageStatus] = React.useState();
  const [open, setOpen] = React.useState(false);

  onAuthStateChanged(authorization, (user) => {
    if (user) {
      Router.push("/")
    }
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  setOpen(false);
  };


  const SignupwithGoogle = () => {
    setFormLoading(true);
    const provider = new GoogleAuthProvider();
    // signinwithgoogle 
    signInWithPopup(authorization, provider)
      .then((res) => {
        insertData(res.user.displayName, res.user.email, res.user.uid);
        setFormLoading(false);
      })
      .catch((err) => {
        if(err.code == "auth/popup-blocked"){
          setMessageStatus("Popup is blocked. Please enable to signin");
        }else if(err.code == "auth/popup-closed-by-user"){
          setMessageStatus("Popup is closed by you");
        }else{
          setMessageStatus("Unknown error, Please contact us");
        }
        setOpen(true);
        setFormLoading(false);
      });
  }

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );


  const googleSigninButton = () =>{
    return(
      <div style={{marginTop:15}}>
         <Button variant="outlined" startIcon={<GoogleIcon />} onClick={SignupwithGoogle}>
          Signup with Google
        </Button>
      </div>
    )
  }

  const handleSubmit = (event) => {
    setFormLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const Fname = data.get("firstName");
    const Lname = data.get("lastName");

    if(!Fname){
      setMessageStatus("Please enter Firts Name");
      setOpen(true);
      setFormLoading(false);
      return false;
    }
    if(!Lname){
      setMessageStatus("Please enter Last Name");
      setOpen(true);
      setFormLoading(false);
      return false;
    }
      const email = data.get('email');
      const password = data.get('password');
      
    createUserWithEmailAndPassword(authorization, email, password)
    .then((userCredential) => {
      const displayName = `${Fname} ${Lname}`;
      insertData(displayName, email, userCredential.user.uid);
      setFormLoading(false);
    })
    .catch((error) => {
      const errorCode = error.code;
      if(errorCode == "auth/invalid-email"){
        setMessageStatus("Please enter a valid email id");
      }else if(errorCode == "auth/weak-password"){
        setMessageStatus("Your password is very weak");
      }else if(errorCode == "auth/email-already-in-use"){
        setMessageStatus("Email id alredy exist");
      }else{
        setMessageStatus("Unknown error, Please contact us");
      }
      setOpen(true);
      setFormLoading(false);
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Head>
            <meta name="robots" content="noindex" />
            <title>Signin - GeM Portal Course</title>
            </Head>
      {formLoading && <LinearProgress/>}
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
        Sign up
      </Typography>
      <Box component="div" sx={{display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: "2ch",
        marginTop: "2ch",
        border: "1px solid #1976d2",
        // backgroundColor: "#F6F6F6",
        borderRadius: "2ch"}}>
      {googleSigninButton()}
      <p>OR</p>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
            />
          </Grid>
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
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
    </Box>
    <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        message={MessageStatus}
        action={action}
      />
  </Container>
  )
}

export default Signin
