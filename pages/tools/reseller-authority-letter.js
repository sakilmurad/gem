import React, { useState, useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Head from "next/head";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import ReactToPrint from "react-to-print";
import PrintIcon from "@mui/icons-material/Print";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";

function reseller() {
  const [companyName, setCompanyName] = useState("ABC Pvt Ltd");
  const [percentage, setPercentage] = useState("80");
  const [bidNumber, setBidNumber] = useState();
  const [bidDate, setBidDate] = useState("31-12-2021");
  const [address, setAddress] = useState("XYZ, New Delhi - 110041");
  const [margingTop, setMarginTop] = useState(0);

  const handleChange = (e) => {
    const Id = e.target.id;
    const value = e.target.value;
    switch (Id) {
      case "CompanyName":
        setCompanyName(value);
        return;
      case "Percentage":
        setPercentage(value);
        return;
      case "BidNumber":
        setBidNumber(value);
        return;
      case "BidDate":
        setBidDate(value);
        return;
      case "Address":
        setAddress(value);
        return;
    }
  };

  const handleChanegMargin = (e) => {
    const value = e.target.value;
    setMarginTop(value);
  };

  const componentRef = useRef();

  const today = new Date().toString().split(" ").splice(1, 3).join(" ");

  return (
    <div>
      <Head>
        <title>
          Reseller Authorization Letter Generator for GeM - GeM Portal Course
        </title>
        <meta
          name="description"
          content="Reseller authorization letter creator for a bidding on GeM Portal. Authority letter generator for reseller on GeM Portal."
        />
      </Head>
      <h1 className="center">
        Reseller Authorization Letter Generator for GeM
      </h1>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            required
            id="CompanyName"
            label="Company Name"
            name="companyname"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            required
            id="BidNumber"
            label="GeM Bid/RA Number"
            name="bidNumber"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            fullWidth
            name="percentage"
            label="Percentage"
            type="number"
            id="Percentage"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="date"
            label="Bid Start Date"
            id="BidDate"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            required
            label="Address"
            name="address"
            id="Address"
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Box width={200} sx={{ m: 2 }}>
        Margin from top
        <Slider
          defaultValue={0}
          aria-label="Default"
          onChange={handleChanegMargin}
          valueLabelDisplay="auto"
          max={30}
        />
      </Box>
      <ReactToPrint
        trigger={() => (
          <Button variant="contained" sx={{ m: 2 }} startIcon={<PrintIcon />}>
            Print
          </Button>
        )}
        content={() => componentRef.current}
      />
      <Box
        ref={componentRef}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 2,
            p: 3,
            maxwidth: "500px",
            maxheight: "1122px",
          },
        }}
        id="generated-content"
      >
        <Box>
          <p style={{ textAlign: "left" }}>
            Ref No:
            <span style={{ float: "right" }}>{today}</span>
          </p>
          <p>
            To,
            <br /> The CEO,
            <br /> <b>Gem-Government E Marketplace</b>,
            <br /> Delhi.
          </p>
          <Typography
            sx={{ textAlign: "center", pt: margingTop }}
            variant="h6"
            component="div"
          >
            <u>Sub: Manufacturer's Authority Letter</u>
            <br />
            {bidNumber ? <u>GeM Bid/RA No: {bidNumber}</u> : null}
            <br />
          </Typography>
          <p>Dear Sir / Madam,</p>
          <Typography variant="body1" sx={{ textIndent: "70px" }}>
            We would like to inform you that {companyName} is our authorized
            distributor for our {companyName} range of single use products for
            the above mentioned tender.
          </Typography>
          <Typography sx={{ textIndent: "70px" }}>
            They are authorized to quote rates, collect supply orders, make
            supplies, raise their own invoices and collect payments on our
            behalf.
          </Typography>
          <p>
            <b>The Authorization is Valid till Validity of the above Bid.</b>
          </p>
          For <b>{companyName}</b>.
        </Box>
      </Box>
    </div>
  );
}

export default reseller;
