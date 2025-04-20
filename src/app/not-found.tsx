'use client';

import { Button, Container, Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const t = useTranslations('NotFound');
  const router = useRouter();

  return (
    <Container maxWidth="lg" sx={{ py: 10 }}>
      <Stack spacing={4} alignItems="center" textAlign="center">
        <Typography variant="h1" color="text.secondary" sx={{ fontSize: '6rem' }}>
          404
        </Typography>
        <Typography variant="h3" color="text.secondary">
          {t('title')}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {t('description')}
        </Typography>
        <Button variant="contained" size="large" onClick={() => router.push('/')} sx={{ mt: 2 }}>
          {t('returnHome')}
        </Button>
      </Stack>
    </Container>
  );
}
