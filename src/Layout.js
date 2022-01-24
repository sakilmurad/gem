import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Sidebar';
import Link from 'next/link'
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import Switch from './Switch';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { authorization } from '../firebase/config'
import { onAuthStateChanged } from '@firebase/auth'
import Router from 'next/router';
import { signOut } from '@firebase/auth';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import Image from "next/image"
import Typography from '@mui/material/Typography';

const drawerWidth = 200;

const errorIcon = () => {
  return (
    <>
      <div className="error-div-sidebar">
        <CloudOffIcon sx={{ fontSize: 80 }} />
      </div>
      <p className="error-div-sidebar bottom-error">Please login first</p>
    </>
  )
}

export default function Layout({ data, isLoading, children }, props) {
  const [isSigned, setIsSigned] = React.useState(false);
  const [userData, setUserData] = React.useState([]);
  const [anchorElProfileMenu, setanchorElProfileMenu] = React.useState(null);

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
  const container = window !== undefined ? () => window().document.body : undefined;

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
    signOut(authorization).then(() => {
      setIsSigned(false);
      Router.push("/login")
      handleProfileMenuClose();
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        {isLoading && <LinearProgress />}
        <Toolbar>
          <Box display='flex' flexGrow={1}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Link href="/" >
              <a className="header-logo" >
                <Image
                  src="https://res.cloudinary.com/dl3tfsbn5/image/upload/v1643042307/new_logo_with_white_back_dw9i9l.svg"
                  alt="Logo"
                  width={45}
                  height={45}
                />
                <span className="logo-text">
                  <Typography variant="h5" gutterBottom component="div" sx={{ display: { xs: 'none', sm: 'block' }, marginTop: "8px" }}>GeM Portal Course</Typography>
                  <Typography variant="h6" gutterBottom component="div" sx={{ display: { xs: 'block', sm: 'none' }, marginTop: "8px" }}>GeM Portal Course</Typography>
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
                <Avatar alt={userData.displayName} src={userData.photoURL} sx={{ width: 35, height: 35 }} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElProfileMenu}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElProfileMenu)}
                onClose={handleProfileMenuClose}
              >
                {/* <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem> */}
                <MenuItem onClick={Signout}>Logout</MenuItem>
              </Menu>
            </div>
          ) : <Link href="/login"><Button variant="contained">Login</Button></Link>}
        </Toolbar>
      </AppBar>

      <Box sx={{ display: 'flex' }}>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <Sidebar data={data} handleDrawerToggle={handleDrawerToggle} />

          </Box>
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <Sidebar data={data} />
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          {children}
          <div className='copyright-notice'>
        Copyright notice: We use other creator's content for fair and teaching purpose only.
        </div>
        <div className='footer-links'>
          <Link href="/make-in-india">MII Certificate Generator</Link>
          <Link href="/about-us">About us</Link>
          <Link href="/contact">Contact</Link>
        </div>
      <div className='footer'>&copy; {new Date().getFullYear()}, GeM Portal Course and the respective content owners.</div>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

