'use client';

import { ROUTES } from '@/constants';
import { createClient } from '@/utils/supabase/client';
import { Alert, Box, Button, Container, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function SignUpPage() {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push('/');
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          alignItems: 'stretch',
          mt: 4,
        }}
      >
        <Typography variant="h4" component="h1" align="center">
          {ROUTES.signUp.title}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          id="email"
          name="email"
          label="Email"
          type="email"
          required
          autoComplete="email"
          autoFocus
          disabled={loading}
        />

        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          required
          autoComplete="new-password"
          disabled={loading}
          slotProps={{
            htmlInput: {
              'data-testid': 'password',
            },
          }}
        />

        <TextField
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          required
          autoComplete="new-password"
          disabled={loading}
          slotProps={{
            htmlInput: {
              'data-testid': 'confirmPassword',
            },
          }}
        />

        <Button type="submit" variant="contained" size="large" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </Button>
      </Box>
    </Container>
  );
}
