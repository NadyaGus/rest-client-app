'use client';
import { ROUTES } from '@/constants';
import { useAuth } from '@/hooks/use-auth';
import { Box, Button, Container, Skeleton, Typography } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  const { user, loading } = useAuth();
  const userName = user?.email?.split('@')[0] || 'User';

  const links = [ROUTES.restClient, ROUTES.variables, ROUTES.history];

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <Typography variant="h1" component="h1" sx={{ m: 2, fontSize: '3rem', textAlign: 'center' }}>
        {loading && <Skeleton variant="text" sx={{ fontSize: '3rem', width: '400px' }} />}
        {!loading && (user ? 'Welcome Back, ' + userName + '!' : 'Welcome to RESTful Client App.')}
      </Typography>
      <Typography component={'p'}>A lightweight client for RESTful APIs</Typography>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 1, gap: 2 }}>
          <Skeleton variant="text" sx={{ fontSize: '1rem', width: '300px' }} />
        </Box>
      )}

      {!user && !loading && (
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Link href={ROUTES.signIn.href}>
            <Button variant="contained">Sign in</Button>
          </Link>

          <Link href={ROUTES.signUp.href}>
            <Button variant="outlined">Sign up</Button>
          </Link>
        </Box>
      )}

      {user && (
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          {links.map(({ href, title }) => (
            <Box key={title} sx={{ m: 1, color: '#3f51b5' }}>
              <Link href={href}>{title}</Link>
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
}
