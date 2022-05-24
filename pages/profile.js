import React, { useState } from "react";
import { authorization, db } from "../firebase/config";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Router from "next/router";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import JoinFullIcon from "@mui/icons-material/JoinFull";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BuildIcon from "@mui/icons-material/Build";
import Link from "next/link";

const auth = getAuth();
const user = auth.currentUser;

const Tools = () => {
  return (
    <>
      <h3 className="center-text">
        These are the tools which can be very helpful for you and save your time
        by creating your documents
      </h3>

      <ul>
        <li>
          <Link href="/tools/make-in-india">Make In India Certificate</Link>
        </li>
        <li>
          <Link href="/tools/reseller-authority-letter">
            Reseller Authority Letter
          </Link>
        </li>
        <li>
          <Link href="/tools/bidder-financial-standing">
            Bidder Financial Standing
          </Link>
        </li>
        <li>
          <Link href="/tools/oem-authorization-letter">
            OEM Authorization Letter
          </Link>
        </li>
      </ul>
      <Link href="/tools">See All Tools</Link>
    </>
  );
};

const SavedContent = () => {
  if (localStorage.getItem("SavedPage")) {
    const SavedPages = JSON.parse(localStorage.getItem("SavedPage"));
  }
  return (
    <>
      <h3 className="center-text">All your saved page</h3>
      <ul>
        {SavedPages.length > 0 ? (
          SavedPages.map((data) => {
            return (
              <li key={data.url}>
                <Link href={data.url}>{data.title}</Link>
              </li>
            );
          })
        ) : (
          <li>You haven't saved any page yet...</li>
        )}
      </ul>
    </>
  );
};

const DownloadSection = () => {
  return (
    <>
      <h3 className="center-text">All files to download</h3>
      <p>Nothing here</p>
    </>
  );
};

function Profile() {
  const [displayName, setDisplayName] = useState("User");
  const [picUrl, setDisplayUrl] = useState("");
  const [content, setContent] = useState(<Tools />);

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  onAuthStateChanged(authorization, (user) => {
    if (!user) {
      Router.push("/login");
    } else {
      setDisplayName(user.displayName);
      setDisplayUrl(user.photoURL);
    }
  });

  const Alltools = (event) => {
    handleListItemClick(event, 0);
    setContent(<Tools />);
  };
  const Allsaved = (event) => {
    handleListItemClick(event, 1);
    setContent(<SavedContent />);
  };

  const Download = (event) => {
    handleListItemClick(event, 2);
    setContent(<DownloadSection />);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Paper elevation={3}>
        <h1 className="center mt2">Welcome {displayName}</h1>
        <Grid container spacing={2} sx={{ padding: 2 }}>
          <Grid item xs={12} sm={4}>
            <Paper elevation={1} sx={{ padding: 2 }}>
              <Avatar
                alt={displayName}
                src={picUrl}
                sx={{
                  width: 56,
                  height: 56,
                  display: "flex",
                  margin: "0 auto",
                }}
              />
              <Stack
                direction="row"
                spacing={2}
                sx={{ margin: 2 }}
                className="flex-center"
              >
                <Button
                  variant="contained"
                  size="small"
                  endIcon={<JoinFullIcon />}
                >
                  Remove Ads
                </Button>
              </Stack>
              <Divider />

              <List component="nav" aria-label="main mailbox folders">
                <ListItemButton
                  selected={selectedIndex === 0}
                  onClick={(event) => Alltools(event)}
                >
                  <ListItemIcon>
                    <BuildIcon />
                  </ListItemIcon>
                  <ListItemText primary="Tools" />
                </ListItemButton>
                <ListItemButton
                  selected={selectedIndex === 1}
                  onClick={(event) => Allsaved(event)}
                >
                  <ListItemIcon>
                    <FavoriteIcon />
                  </ListItemIcon>
                  <ListItemText primary="Saved" />
                </ListItemButton>
                <ListItemButton
                  selected={selectedIndex === 2}
                  onClick={(event) => Download(event)}
                >
                  <ListItemIcon>
                    <FavoriteIcon />
                  </ListItemIcon>
                  <ListItemText primary="Download Section" />
                </ListItemButton>
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Paper elevation={1} sx={{ minHeight: "350px", padding: 1 }}>
              {content}
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default Profile;
