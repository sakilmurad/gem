import React from "react";
import { authorization, db } from "../firebase/config";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Router from "next/router";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import GoogleIcon from "@mui/icons-material/Google";
import LinearProgress from "@mui/material/LinearProgress";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { doc, setDoc } from "firebase/firestore";
import Head from "next/head";

const insertData = async (displayName, email, uid) => {
  const data = {
    displayName,
    email,
  };

  try {
    await setDoc(doc(db, "users", uid), data);
  } catch (e) {
    signOut(authorization);
  }
};

function Login() {
  const [formLoading, setFormLoading] = React.useState(false);
  const [MessageStatus, setMessageStatus] = React.useState();
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  onAuthStateChanged(authorization, (user) => {
    if (user) {
      Router.push("/");
    }
  });

  const SignupwithGoogle = async () => {
    setFormLoading(true);
    const provider = new GoogleAuthProvider();
    // signinwithgoogle
    signInWithPopup(authorization, provider)
      .then((res) => {
        insertData(res.user.displayName, res.user.email, res.user.uid);
        setFormLoading(false);
      })
      .catch((err) => {
        if (err.code == "auth/popup-blocked") {
          setMessageStatus("Popup is blocked. Please enable to signin");
        } else if (err.code == "auth/popup-closed-by-user") {
          setMessageStatus("Popup is closed by you");
        } else {
          setMessageStatus("Unknown error, Please contact us");
        }
        setOpen(true);
        setFormLoading(false);
      });
  };

  const googleSigninButton = () => {
    return (
      <div style={{ marginTop: 15 }}>
        <Button
          variant="outlined"
          startIcon={<GoogleIcon />}
          onClick={SignupwithGoogle}
        >
          Signin with Google
        </Button>
      </div>
    );
  };

  const handleSubmit = (event) => {
    setFormLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    signInWithEmailAndPassword(authorization, email, password)
      .then((userCredential) => {
        setFormLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode == "auth/user-not-found") {
          setMessageStatus("No account found");
        } else if (errorCode == "auth/wrong-password") {
          setMessageStatus("Please enter right password");
        } else {
          setMessageStatus("Unknown error, Please contact us");
        }
        setOpen(true);
        setFormLoading(false);
      });
  };

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

  return (
    <Container component="main" maxWidth="xs">
      <Head>
        <title>Login - GeM Portal Course</title>
        <meta
          name="description"
          content="Login to use advance services on GeM Portal Course"
        />
      </Head>
      {formLoading && <LinearProgress />}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "2ch",
            marginTop: "2ch",
            border: "1px solid #1976d2",
            // backgroundColor: "#F6F6F6",
            borderRadius: "2ch",
          }}
        >
          {googleSigninButton()}
          <p>OR</p>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
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
              <Grid item xs={12}>
                By clicking Sign In, you are agreed to{" "}
                <Link href="/terms-and-conditions">Terms and Conditions</Link>
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
                <Link href="/forget" variant="body2">
                  Forget Password?
                </Link>
              </Grid>
            </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  haven&apos;t an account? Signup
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
  );
}

export default Login;
