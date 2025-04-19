'use client';

import { HTTP_METHODS } from '@/constants';
import { decodeURIComponentToString } from '@/utils/helpers';
import { Typography, Box } from '@mui/material';
import { useMemo } from 'react';

import { RestClient } from './rest-client';

export function RestClientContent({ opts, searchParams }: { opts?: string[]; searchParams?: URLSearchParams }) {
  const method = opts && HTTP_METHODS.includes(opts[0]) ? opts[0] : HTTP_METHODS[0];
  const url = opts && opts.length > 1 ? decodeURIComponentToString(opts[1]) : '';
  const body = opts && opts.length > 2 ? decodeURIComponentToString(opts[2]) : '';
  const headers = useMemo(() => {
    const headerParams = Object.fromEntries(searchParams?.entries() || []);
    const entries = Object.entries(headerParams);

    return entries.length === 0
      ? [{ name: '', value: '' }]
      : [...entries.map(([name, value]) => ({ name, value })), { name: '', value: '' }];
  }, [searchParams]);

  return (
    <Box sx={{ p: 3, display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        REST Client
      </Typography>
      <RestClient initValues={{ method, url, body, headers }} />
    </Box>
  );
}
