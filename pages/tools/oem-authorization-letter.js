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
import Share from "../../src/Share";
function OEM() {
  const [CompanyName, setCompanyName] = useState("XYZ Pvt Ltd");
  const [BrandName, setBrandName] = useState("Edafter");
  const [BidNumber, setBidNumber] = useState();
  const [margingTop, setMarginTop] = useState(0);

  const handleChange = (e) => {
    const Id = e.target.id;
    const value = e.target.value;
    switch (Id) {
      case "companyname":
        setCompanyName(value);
        return;
      case "brandname":
        setBrandName(value);
        return;
      case "BidNumber":
        setBidNumber(value);
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
          OEM Authorization Letter Generator for GeM - GeM Portal Course
        </title>
        <meta
          name="description"
          content="OEM authorization letter creator for a bidding on GeM Portal. Authority letter generator for OEM on GeM Portal."
        />
      </Head>
      <h1 className="center">OEM Authorization Letter Generator for GeM</h1>
      <Share
        title="OEM Authorization Letter Generator for GeM"
        text="All the Free Tools provided by Edafter"
        url="tools/oem-authorization-letter"
      />
      {/* <!-- horizontal ad for gpc --> */}
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-3232980416145906"
        data-ad-slot="4254621341"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            required
            id="companyname"
            label="Your Company Name"
            name="companyname"
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            required
            name="brandname"
            label="Brand Name"
            id="brandname"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            required
            id="BidNumber"
            label="GeM Bid/RA Number"
            name="BidNumber"
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
          <Typography sx={{ pt: margingTop }}>
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
          </Typography>
          <Typography sx={{ textAlign: "center" }} variant="h6" component="div">
            <u>Sub: Manufacturer&apos;s Authority Letter</u>
            <br />
            {BidNumber ? <u>GeM Bid/RA No: {BidNumber}</u> : null}
            <br />
          </Typography>
          <p>Dear Sir / Madam,</p>
          <Typography variant="body1" sx={{ textIndent: "70px" }}>
            We, <strong>{CompanyName}</strong>, are the established and reputed
            Manufacturers of <strong>{BrandName}</strong> products to bid,
            negotiate and conclude the contract with you for the above-mentioned
            goods manufactured by us.
          </Typography>
          <Typography sx={{ textIndent: "70px" }}>
            No company or firm or individual other than{" "}
            <strong>{CompanyName}</strong> are authorized to bid, negotiate and
            conclude the contract in regard to this business for your
            institution.
          </Typography>
          <br />
          For <b>{CompanyName}</b>.
        </Box>
      </Box>
      {/* <!-- horizontal ad for gpc --> */}
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-3232980416145906"
        data-ad-slot="4254621341"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}

export default OEM;
