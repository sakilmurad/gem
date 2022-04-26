import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import Avatar from "@mui/material/Avatar";
import Head from "next/head";
import Link from "next/link";
import Ads from "../../src/Ads";
import tools from "../../src/tools";
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
      <Ads />
      <h1 className="heading center-text">Free tools for GeM</h1>

      <p className="intro-text">
        Try using these free tools available on Edafter. It will really increase
        your productivity.
      </p>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {tools.map((e) => (
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Box className="flex-center">
                  <Avatar
                    sx={{
                      p: 3,
                      bgcolor: "primary.main",
                    }}
                  >
                    {e.icon}
                  </Avatar>
                </Box>
                <h2 className="center-text">{e.title}</h2>
                <p>{e.description}</p>
                <div className="flex-center">
                  <Link href={e.link} title={e.title} passHref>
                    <Button variant="contained">GENERATE NOW</Button>
                  </Link>
                </div>
              </Paper>
            </Grid>
          ))}

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
        <Ads />
      </Box>
    </Container>
  );
}

export default Ft;
