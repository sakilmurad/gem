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

var utc = new Date().toJSON().slice(0, 10).replace(/-/g, "/");

function Bfs() {
  const [companyName, setCompanyName] = useState("ABC Pvt Ltd");
  const [refNumber, setRefNumber] = useState(`GPC/${utc}`);
  const [margingTop, setMarginTop] = useState(0);

  const handleChange = (e) => {
    const Id = e.target.id;
    const value = e.target.value;
    switch (Id) {
      case "CompanyName":
        setCompanyName(value);
        return;
      case "refNumber":
        setRefNumber(value);
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
          Bidder Financial Standing Letter Generator for GeM - GeM Portal Course
        </title>
        <meta
          name="description"
          content="Bidder financial letter creator for a bidding on GeM Portal. Bankruptancy undertaking generator for reseller on GeM Portal."
        />
      </Head>
      {/* <!-- horizontal ad for gpc --> */}
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-3232980416145906"
        data-ad-slot="4254621341"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>

      <h1 className="center mt2">
        Bidder Financial Standing Letter Generator for GeM
      </h1>
      <Share
        title="Bidder Financial Standing Letter Generator for GeM"
        text="All the Free Tools provided by Edafter"
        url="tools/bidder-financial-standing"
      />

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
            id="refNumber"
            label="Reference Number"
            name="refNumber"
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
          <Typography sx={{ textAlign: "left", pt: margingTop }}>
            Ref No: {refNumber}
            <span style={{ float: "right" }}>{today}</span>
          </Typography>
          <Typography sx={{ textAlign: "center" }} variant="h6" component="div">
            <u>TO WHOM SOEVER IT MAY CONCERN</u>
          </Typography>
          <br />
          <Typography variant="body1">
            We would like to inform you that, we are not under liquidation,
            court receivership or similar proceedings. We also confirm that we
            are not bankrupt.
          </Typography>
          <p>Thanking you & assuring you of our best services always.</p>
          For <b>{companyName}</b>.
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

export default Bfs;
