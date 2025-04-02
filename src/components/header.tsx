'use client';
import { ROUTES } from '@/constants';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { ToggleLanguage } from './toggle-language';

const drawerWidth = 240;
const logOut = 'Logout';

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isAuthenticatedUser = false; // TODO: check auth

  const navItems = isAuthenticatedUser ? [logOut] : [ROUTES.signIn.title, ROUTES.signUp.title];
  const getRouteURL = (route: string) => {
    if (route === logOut) {
      return ROUTES.home.href;
    } else if (route === ROUTES.signUp.title) {
      return ROUTES.signUp.href;
    }
    return ROUTES.signIn.href;
  };

  const handleScroll = () => {
    setScrolled(window.scrollY > 10);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box component={'nav'} onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography component="h1" variant="h6" sx={{ my: 2 }}>
        RESTful Client
      </Typography>

      <Divider />

      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <Link href={getRouteURL(item)}>
                <ListItemText primary={item} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box component={'header'} sx={{ display: 'flex', zIndex: 1 }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{ backgroundColor: scrolled ? '#101010' : '#202020', transition: 'background-color 0.3s ease' }}
      >
        <Toolbar>
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
            <Link href={ROUTES.home.href}>RESTful Client</Link>
          </Typography>

          <Box sx={{ mr: 3 }}>
            <ToggleLanguage />
          </Box>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff' }}>
                <Link href={getRouteURL(item)}>{item}</Link>
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>

      <Box sx={{ p: 0 }}>
        <Toolbar />
      </Box>
    </Box>
  );
};
