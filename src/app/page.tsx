import { ROUTES } from '@/constants';
import { Box, Button, Container, Typography } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <Typography variant="h1" component="h1" sx={{ m: 2, fontSize: '3rem', textAlign: 'center' }}>
        Welcome To The RESTful Client App!
      </Typography>
      <Typography component={'p'}>A lightweight client for RESTful APIs</Typography>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Link href={ROUTES.signIn.href}>
          <Button variant="contained">Sign in</Button>
        </Link>

        <Link href={ROUTES.signUp.href}>
          <Button variant="outlined">Sign up</Button>
        </Link>
      </Box>
    </Container>
  );
}
