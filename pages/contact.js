import React from 'react'
import { authorization, db } from '../firebase/config'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import Snackbar from '@mui/material/Snackbar';
import { collection, addDoc } from "firebase/firestore"; 
import Head from "next/head"
import ContactMailIcon from '@mui/icons-material/ContactMail';


const insertData = async (name,email, phone, message)=>{
    const data = {
      name,
      email,
      phone,
      message
  };
  
    try {
     await addDoc(collection(db, "contact"), data);
    } catch (e) {
      console.log(e);
    }
  }
  

function Contact() {
    const [formLoading, setFormLoading] = React.useState(false);
    const [MessageStatus, setMessageStatus] = React.useState();
    const [open, setOpen] = React.useState(false);
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };

    const SendMail = (body)=>{
      fetch("/api/contact",{
        method: "POST",
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: body
      })
      .then(res=>{
        console.log("mail sent successfully");
      })
      .catch(err=>{
        console.log(err);
      })
    }

    const handleSubmit = (event) =>{
        setFormLoading(true);
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const name = data.get('name');
        const email = data.get('email');
        const phone = data.get('number');
        const message = data.get('message');
        const jsonData = JSON.stringify({name,email,phone,message});
        if(!name || !email||!message ){
            setMessageStatus("Please fill out all field");
            setOpen(true);
            setFormLoading(false);
            return
        }
       if(insertData(name,email,phone,message)){
         SendMail(jsonData);
        setMessageStatus("Thanks for contact us");
        setOpen(true);
        setFormLoading(false);
        return
       }
       return

    }
    
    return (
        <Container component="main" maxWidth="xs">
        <Head>
              <meta name="robots" content="noindex" />
              <title>Contact us - GeM Portal Course</title>
              </Head>
        {formLoading && <LinearProgress />}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <ContactMailIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Contact Us
          </Typography>
          <Box component="div" sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: "2ch",
            marginTop: "2ch",
            border: "1px solid #1976d2",
            // backgroundColor: "#F6F6F6",
            borderRadius: "2ch"
          }}>
            <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
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
                    fullWidth
                    name="number"
                    label="Phone number"
                    type="number"
                    id="number"
                  />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    required
                    label="Message"
                    name="message"
                    />
                    </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
        <Snackbar
          open={open}
          autoHideDuration={4000}
          onClose={handleClose}
          message={MessageStatus}
        />
      </Container>
    )
}

export default Contact
