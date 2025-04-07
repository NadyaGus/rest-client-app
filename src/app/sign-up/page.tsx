'use client';

import { ROUTES } from '@/constants';
import { createClient } from '@/utils/supabase/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Box, Button, Container, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const signUpSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[\p{L}]/u, 'Password must contain at least one letter')
      .regex(/[\p{N}]/u, 'Password must contain at least one digit')
      .regex(/[\p{P}]/u, 'Password must contain at least one special character'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
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
          {ROUTES.signUp.title}
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
          autoComplete="new-password"
          disabled={loading}
          error={!!errors.password}
          helperText={errors.password?.message}
          {...register('password')}
          slotProps={{
            htmlInput: {
              'data-testid': 'password',
            },
          }}
        />

        <TextField
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          autoComplete="new-password"
          disabled={loading}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          {...register('confirmPassword')}
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
