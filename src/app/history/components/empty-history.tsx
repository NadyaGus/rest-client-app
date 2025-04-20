import { ROUTES } from '@/constants';
import { generateRestClientPageUrl } from '@/utils/helpers';
import HistoryIcon from '@mui/icons-material/History';
import { Box, Typography, Link, Paper, Stack } from '@mui/material';

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
          <Paper key={endpoint.id} elevation={1} sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography
                variant="caption"
                sx={{
                  bgcolor: 'success.main',
                  color: 'white',
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  fontWeight: 'bold',
                }}
              >
                {endpoint.method}
              </Typography>
              <Link
                href={generateRestClientPageUrl({
                  baseUrl: ROUTES.restClient.href,
                  method: endpoint.method,
                  url: endpoint.url,
                  body: '',
                  headers: endpoint.headers || [],
                })}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'primary.main',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                {endpoint.title}
              </Link>
            </Box>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
};
