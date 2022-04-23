import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import MapsHomeWorkRoundedIcon from "@mui/icons-material/MapsHomeWorkRounded";
import ConnectWithoutContactRoundedIcon from "@mui/icons-material/ConnectWithoutContactRounded";
import PriceCheckRoundedIcon from "@mui/icons-material/PriceCheckRounded";
import Button from "@mui/material/Button";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import Avatar from "@mui/material/Avatar";
import Head from "next/head";
import Link from "next/link";
function Ft() {
  return (
    <Container className="main-margin">
      <Head>
        <title>Free Tools for GeM Portal- Edafter</title>
        <meta
          name="description"
          content="All the Free Tools provided by Edafter."
        />
      </Head>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-3232980416145906"
        data-ad-slot="4254621341"
        data-ad-format="auto"
        data-full-width-responsive="true"
      >
        Ad
      </ins>
      <h1 className="heading center-text">Free tools for GeM</h1>

      <p className="intro-text">
        Try using these free tools available on Edafter. It will really increase
        your productivity.
      </p>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Box className="flex-center">
                <Avatar
                  sx={{
                    p: 3,
                    bgcolor: "primary.main",
                  }}
                >
                  <MapsHomeWorkRoundedIcon fontSize="large" />
                </Avatar>
              </Box>
              <h2 className="center-text">Make In India Certificate</h2>
              <p>
                Make in India Certificate required to participate in the bids as
                local supplier. It is mandatory to participate as local supplier
                in some bids. Therefore you have to make an{" "}
                <b>Make In India Certificate</b> to avail make in india
                preference in the bids.
              </p>
              <div className="flex-center">
                <Link
                  href="/tools/make-in-india"
                  title="Make in India certificate generator"
                  passHref
                >
                  <Button variant="contained">GENERATE NOW</Button>
                </Link>
              </div>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Box className="flex-center">
                <Avatar
                  sx={{
                    p: 3,
                    bgcolor: "primary.main",
                  }}
                >
                  <ConnectWithoutContactRoundedIcon fontSize="large" />
                </Avatar>
              </Box>
              <h2 className="center-text">Reseller Authority Letter</h2>
              <p>
                You authorized a reseller but how GeM will know that you
                actually authorized him?. Therefore OEM (Original Equipment
                Manufacturer) needs to write a letter to GeM mentioning the
                reseller name and address. You can also mention bid number.
              </p>
              <div className="flex-center">
                <Link
                  href="/tools/reseller-authority-letter"
                  title="Reseller authority letter generator"
                  passHref
                >
                  <Button variant="contained">GENERATE NOW</Button>
                </Link>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Box className="flex-center">
                <Avatar
                  sx={{
                    p: 3,
                    bgcolor: "primary.main",
                  }}
                >
                  <PriceCheckRoundedIcon fontSize="large" />
                </Avatar>
              </Box>
              <h2 className="center-text">Bidder Financial Standing</h2>
              <p>
                Sometimes buyer asks for your undertaking about you are not
                under liquidation or bankrupt. There is already format ready for
                you. Go and try it.
              </p>
              <div className="flex-center">
                <Link
                  href="/tools/bidder-financial-standing"
                  title="Bidder financial standing certificate generator"
                  passHref
                >
                  <Button variant="contained">GENERATE NOW</Button>
                </Link>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Box className="flex-center">
                <Avatar
                  sx={{
                    p: 3,
                    bgcolor: "primary.main",
                  }}
                >
                  <MoreTimeIcon fontSize="large" />
                </Avatar>
              </Box>
              <h2 className="center-text">More tools are coming...</h2>
              <p>
                We are continuously working to make it more better and launching
                new tools. We know how much time it takes to create the same
                documents for all bids. Invest your time in market research. You
                can also give us your valuable feedback for each tools by
                contacting us through mail.
              </p>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Ft;
