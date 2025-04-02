import { ROUTES } from '@/constants';
import { Box, Button, Container, Typography } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  const isAuthenticatedUser = false; // TODO: check auth
  const userName = 'John Doe';

  const links = [
    { href: ROUTES.restClient.href, title: ROUTES.restClient.title },
    { href: ROUTES.variables.href, title: ROUTES.variables.title },
    { href: ROUTES.history.href, title: ROUTES.history.title },
  ];

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <Typography variant="h1" component="h1" sx={{ m: 2, fontSize: '3rem', textAlign: 'center' }}>
        {isAuthenticatedUser ? 'Welcome Back, ' + userName + '!' : 'Welcome to RESTful Client App.'}
      </Typography>
      <Typography component={'p'}>A lightweight client for RESTful APIs</Typography>

      {!isAuthenticatedUser && (
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Link href={ROUTES.signIn.href}>
            <Button variant="contained">Sign in</Button>
          </Link>

          <Link href={ROUTES.signUp.href}>
            <Button variant="outlined">Sign up</Button>
          </Link>
        </Box>
      )}

      {isAuthenticatedUser && (
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          {links.map(({ href, title }) => (
            <Box key={title} sx={{ m: 1, color: '#3f51b5' }}>
              <Link key={title} href={href}>
                {title}
              </Link>
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
}
