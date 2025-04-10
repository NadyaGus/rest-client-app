import { HTTP_METHODS } from '@/constants';
import { decodeURIComponentToString } from '@/utils/helpers';
import { Typography, Box } from '@mui/material';

import RestClient from './RestClient';

export default async function RestClientPage({ params }: { params: Promise<{ opts?: string[] }> }) {
  const { opts } = await params;
  const method = opts && HTTP_METHODS.includes(opts[0]) ? opts[0] : HTTP_METHODS[0];
  const url = opts && opts.length > 1 ? decodeURIComponentToString(opts[1]) : '';

  return (
    <Box sx={{ p: 3, display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        REST Client
      </Typography>
      <RestClient initMethod={method} initUrl={url} />
    </Box>
  );
}
