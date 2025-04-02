'use client';
import { ROUTES } from '@/constants';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { HeaderDrawer } from './header-drawer';
import { ToggleLanguage } from './toggle-language';

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

      <HeaderDrawer
        handleDrawerToggle={handleDrawerToggle}
        mobileOpen={mobileOpen}
        navItems={navItems}
        getRouteURL={getRouteURL}
      />

      <Box sx={{ p: 0 }}>
        <Toolbar />
      </Box>
    </Box>
  );
};
