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
import Ads from "../../src/Ads";
function MII() {
  const [companyName, setCompanyName] = useState("ABC Pvt Ltd");
  const [percentage, setPercentage] = useState("80");
  const [bidNumber, setBidNumber] = useState("GEM/2022/B/XXXXXX");
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

  return (
    <div>
      <Head>
        <title>
          Make In India (MII) Certificate Generator for GeM - GeM Portal Course
        </title>
        <meta
          name="description"
          content="Make in India (MII) certificate generator for online bidding as local supplier on GeM Portal."
        />
      </Head>
      <h1 className="center">
        Make In India (MII) Certificate Generator for GeM
      </h1>
      <Ads />
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
          <Typography
            sx={{ textAlign: "center", pt: margingTop }}
            variant="h5"
            component="div"
          >
            <u>Self-Certification under preference to Make in India order</u>
          </Typography>
          <Typography sx={{ textAlign: "center" }}>
            (Refer Clause No. 2.8 &#38; 3.4.4 of ITT)
          </Typography>
          <Typography
            sx={{ textAlign: "center", m: 2 }}
            variant="h5"
            component="div"
          >
            CERTIFICATE
          </Typography>
          <Typography variant="body2" sx={{ fontSize: 18 }}>
            In line with Government Public Procurement Order No.
            P-45021/2/2017-PP (BE-II) dated 04.06.2020 and its amendments, we
            hereby certify that we <b>M/s {companyName}</b> are local supplier
            meeting the requirement of minimum local content i.e.,{" "}
            <b>{percentage}%</b> as defined in above orders for the material
            against IPR Enquiry/Tender No <b>{bidNumber}</b> dated{" "}
            <b>{bidDate}</b> Details of location at which local value addition
            will be made as follows:
            <br />
            <b>{address}</b>
            <br />
            <br />
            We also understand, false declarations will be in breach of the code
            of integrity under rule 175(1)(i)(h) of the General Financial Rules
            for which a bidder or its successors can be debarred for up to two
            years as per Rule 151(iii) of the General Financial Rules along with
            such other actions as may be permissible under law.
            <br />
            <br />
            For <b>{companyName}</b>.
          </Typography>
        </Box>
      </Box>
      <Ads />
    </div>
  );
}

export default MII;
