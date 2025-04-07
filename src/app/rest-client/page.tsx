import { Typography, Box } from '@mui/material';

import RestClient from './RestClient';

export default function RestClientPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        REST Client
      </Typography>
      <RestClient />
    </Box>
  );
}
