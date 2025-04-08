'use client';

import { ROUTES } from '@/constants';
import { createClient } from '@/utils/supabase/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Box, Button, Container, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type SignInFormData = z.infer<typeof signInSchema>;

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
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
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          alignItems: 'stretch',
          mt: 4,
        }}
      >
        <Typography variant="h4" component="h1" align="center">
          {ROUTES.signIn.title}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          autoFocus
          disabled={loading}
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register('email')}
        />

        <TextField
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          disabled={loading}
          error={!!errors.password}
          helperText={errors.password?.message}
          {...register('password')}
        />

        <Button type="submit" variant="contained" size="large" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
      </Box>
    </Container>
  );
}
