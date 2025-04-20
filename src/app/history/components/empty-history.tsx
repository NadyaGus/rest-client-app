import HistoryIcon from '@mui/icons-material/History';
import { Box, Typography, Stack } from '@mui/material';

import { HistoryItem } from './history-item';

export const EmptyHistory = () => {
  const sampleEndpoints = [
    {
      id: 1,
      title: 'Find out more about dogs breeds',
      url: 'https://dogapi.dog/api/v2/breeds',
      method: 'GET',
    },
    {
      id: 2,
      title: 'Find a pet to adopt',
      url: 'https://api.petfinder.com/v2/animals',
      method: 'GET',
    },
    {
      id: 3,
      title: 'Get a random cat image',
      url: 'https://api.thecatapi.com/v1/images/search?limit=20&breed_ids=beng',
      method: 'GET',
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
        No Request History Yet
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        Try out these sample API endpoints to get started:
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
          />
        ))}
      </Stack>
    </Box>
  );
};
