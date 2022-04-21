import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import LinearProgress from "@mui/material/LinearProgress";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Head from "next/head";

export default function Service() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [service, setService] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleChange = (event) => {
    setService(event.target.value);
  };
  const handleChangeInput = (e) => {
    setEmail(e.target.value);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setLoading(true);
    setActiveStep(0);
    setLoading(false);
  };

  const steps = [
    {
      label: "Select Service",
      description: `To get started with Edafter, Please select services you want.`,
      form: (
        <Box sx={{ minWidth: 40, p: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Service</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={service}
              label="Service"
              onChange={handleChange}
            >
              <MenuItem value="Web Development">Web Development</MenuItem>
              <MenuItem value="App Development">App Development</MenuItem>
              <MenuItem value="SEO">SEO</MenuItem>
              <MenuItem value="Marketing">Marketing</MenuItem>
              <MenuItem value="GeM Portal Services">
                GeM Portal Services
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      ),
    },
    {
      label: "Enter your email",
      description: "Please enter your email id for further steps.",
      form: (
        <TextField
          id="outlined-basic"
          label="Your Email"
          variant="outlined"
          onChange={handleChangeInput}
          value={email}
        />
      ),
    },
    {
      label: "Finish",
      description: `Please check your email id and submit the form.`,
      form: null,
    },
  ];

  const handleSubmit = () => {
    setLoading(true);
    setMessage("Sending Request...");
    setOpen(true);
    fetch("/api/start", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ service: service, email: email }),
    })
      .then((res) => {
        if (res.status) {
          setMessage("Submitted. We will contact you soon");
          setOpen(true);
          setLoading(false);
          handleReset();
        } else {
          setMessage("Something is not right");
          setOpen(true);
          setLoading(false);
        }
      })
      .catch((err) => {
        setMessage("Sending Request...");
        setOpen(true);
        setLoading(false);
      });
  };

  return (
    <Container className="main-margin">
      <Head>
        <title>Getting started - Edafter</title>
        <meta
          name="description"
          content="Select and Get Started with Edafter."
        />
      </Head>
      <h1 className="heading center-text">Get Started with Edafter</h1>
      <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
        {isLoading ? <LinearProgress /> : null}
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                  index === 2 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
              <StepContent>
                <Typography>{step.description}</Typography>
                <Box sx={{ p: 2 }}>{step.form}</Box>
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>
              All steps completed - Please click on submit button
            </Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{ mt: 1, mr: 1 }}
            >
              Submit
            </Button>
          </Paper>
        )}
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
      />
    </Container>
  );
}
