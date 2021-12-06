import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme  } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Sidebar from './Sidebar';
import Link from 'next/link'
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import Switch from './Switch';
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '60ch',
      },
    },
  }));

const drawerWidth = 240;

export default function Layout({data, isLoading, children}, props) {

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
 
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
      };
      const container = window !== undefined ? () => window().document.body : undefined;
      const [dark, setDark] = React.useState(false)

      const theme = createTheme({
          palette: {
              type: dark ? 'dark' : 'light',
              mode: dark ? 'dark' : 'light',
          },
      })

      const HandleThemeChange = () =>{
        setDark(!dark);
      }
  

  return (
    <ThemeProvider theme={theme}>
      <Paper>
    <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        {isLoading?<LinearProgress />:null}
        <Toolbar>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <Link href="/">
           Murad
           </Link>
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
         <Switch  handle={HandleThemeChange}/>
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
        {/* {console.log(data)} */}
        <Sidebar data={data} handleDrawerToggle/>
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
        <Sidebar data={data}/>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
       {children}
      </Box>
    </Box>
    </Paper>
    </ThemeProvider>
  );
}

