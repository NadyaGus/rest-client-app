import HistoryIcon from '@mui/icons-material/History';
import { Box, Typography, Stack } from '@mui/material';
import { useTranslations } from 'next-intl';

import { HistoryItem } from './history-item';

export const EmptyHistory = () => {
  const t = useTranslations('History');
  const sampleEndpoints = [
    {
      id: 1,
      title: t('dogsBreeds'),
      url: 'https://dogapi.dog/api/v2/breeds',
      method: 'GET',
      status: 200,
    },
    {
      id: 2,
      title: t('petAdopt'),
      url: 'https://api.petfinder.com/v2/animals',
      method: 'GET',
      status: 200,
    },
    {
      id: 3,
      title: t('catImage'),
      url: 'https://api.thecatapi.com/v1/images/search?limit=20&breed_ids=beng',
      method: 'GET',
      status: 200,
      headers: [
        {
          name: 'x-api-key',
          value: 'YOUR_API_KEY',
        },
      ],
    },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
        py: 4,
      }}
    >
      <HistoryIcon sx={{ fontSize: 60, color: 'text.secondary' }} />
      <Typography variant="h5" component="h2" color="text.primary">
        {t('empty')}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        {t('try')}
      </Typography>

      <Stack spacing={2} sx={{ width: '100%', maxWidth: 600 }}>
        {sampleEndpoints.map((endpoint) => (
          <HistoryItem
            key={endpoint.id}
            id={endpoint.id}
            title={endpoint.title}
            url={endpoint.url}
            method={endpoint.method}
            headers={endpoint.headers}
            status={endpoint.status}
          />
        ))}
      </Stack>
    </Box>
  );
};
