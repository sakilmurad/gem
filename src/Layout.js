import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "./Sidebar";
import Link from "next/link";
import LinearProgress from "@mui/material/LinearProgress";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { authorization } from "../firebase/config";
import { onAuthStateChanged } from "@firebase/auth";
import Router from "next/router";
import { signOut } from "@firebase/auth";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import CloudOffIcon from "@mui/icons-material/CloudOff";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
const drawerWidth = 200;

const errorIcon = () => {
  return (
    <>
      <div className="error-div-sidebar">
        <CloudOffIcon sx={{ fontSize: 80 }} />
      </div>
      <p className="error-div-sidebar bottom-error">Please login first</p>
    </>
  );
};

export default function Layout({ data, isLoading, children }, props) {
  const [isSigned, setIsSigned] = React.useState(false);
  const [userData, setUserData] = React.useState([]);
  const [anchorElProfileMenu, setanchorElProfileMenu] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubscribeSubmit = () => {};
  const handleProfileMenu = (event) => {
    setanchorElProfileMenu(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setanchorElProfileMenu(null);
  };

  onAuthStateChanged(authorization, (user) => {
    if (user) {
      setUserData(user);
      setIsSigned(true);
      const uid = user.uid;
    }
  });

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const container =
    window !== undefined ? () => window().document.body : undefined;

  let theme = createTheme({
    typography: {
      h1: {
        fontSize: "3rem",
        fontWeight: 550,
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 1000,
        md: 1100,
        lg: 1300,
        xl: 1536,
      },
    },
  });
  theme = responsiveFontSizes(theme);

  const Signout = () => {
    signOut(authorization)
      .then(() => {
        setIsSigned(false);
        Router.push("/login");
        handleProfileMenuClose();
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        {isLoading && <LinearProgress />}
        <Toolbar>
          <Box display="flex" flexGrow={1}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Link href="/">
              <a className="header-logo">
                <Image
                  src="https://res.cloudinary.com/dl3tfsbn5/image/upload/v1643042307/new_logo_with_white_back_dw9i9l.svg"
                  alt="Logo"
                  width={45}
                  height={45}
                />
                <span className="logo-text">
                  <Typography
                    variant="h5"
                    gutterBottom
                    component="div"
                    sx={{
                      display: { xs: "none", sm: "block" },
                      marginTop: "8px",
                    }}
                  >
                    GeM Portal Course
                  </Typography>
                  <Typography
                    variant="h6"
                    gutterBottom
                    component="div"
                    sx={{
                      display: { xs: "block", sm: "none" },
                      marginTop: "8px",
                    }}
                  >
                    GeM Portal Course
                  </Typography>
                </span>
              </a>
            </Link>
          </Box>
          {isSigned ? (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleProfileMenu}
                color="inherit"
              >
                <Avatar
                  alt={userData.displayName}
                  src={userData.photoURL}
                  sx={{ width: 35, height: 35 }}
                />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElProfileMenu}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElProfileMenu)}
                onClose={handleProfileMenuClose}
              >
                {/* <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem> */}
                <MenuItem onClick={Signout}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <Link href="/login">
              <Button variant="contained">Login</Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>

      <Box sx={{ display: "flex" }}>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <Sidebar data={data} handleDrawerToggle={handleDrawerToggle} />
          </Box>
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <Sidebar data={data} />
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          {children}
          <hr className="footer-hr" />
          <Grid container className="footer-container">
            <Grid item xs={6} sm={4} md={4}>
              <strong className="footer-heading">Information</strong>
              <ul className="footer-ul">
                <li>
                  <Link href="/about-us">About us</Link>
                </li>
                <li>
                  <Link href="/terms-and-conditions">Terms and Conditions</Link>
                </li>
                <li>
                  <Link href="/privacy-policy">Privacy Policy</Link>
                </li>
              </ul>
            </Grid>
            <Grid item xs={6} sm={4} md={4}>
              <strong className="footer-heading">Tools</strong>
              <ul className="footer-ul">
                <li>
                  <Link href="/tools/make-in-india">
                    MII Certificate Generator
                  </Link>
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
              </ul>
            </Grid>
            <Grid item xs={6} sm={4} md={4}>
              <strong className="footer-heading">Support</strong>
              <ul className="footer-ul">
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
                <li>
                  <Button variant="contained" onClick={handleClickOpen}>
                    Subscribe
                  </Button>
                </li>
              </ul>
            </Grid>
            <div className="footer">
              &copy; {new Date().getFullYear()}, GeM Portal Course and the
              respective content owners.
            </div>
          </Grid>
        </Box>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your email address to get updates about GeM Portal
            Course.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubscribeSubmit}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
