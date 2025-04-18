'use client';

import { HTTP_METHODS, ROUTES } from '@/constants';
import { encodeStringToBase64 } from '@/utils/helpers';
import { Box, Input, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function RestClient({ initMethod, initUrl }: { initMethod?: string; initUrl?: string }) {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState(initMethod || HTTP_METHODS[0]);
  const [url, setUrl] = useState(initUrl || '');

  const handleChangeMethod = (event: SelectChangeEvent) => {
    setSelectedMethod(event.target.value);
  };

  const handleChangeUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  useEffect(() => {
    let updatedUrl = `${ROUTES.restClient.href}/${selectedMethod}`;
    if (url) {
      updatedUrl += `/${encodeStringToBase64(url)}`;
    }
    router.push(updatedUrl);
  }, [router, selectedMethod, url]);

  return (
    <Box sx={{ fontFamily: 'monospace', whiteSpace: 'pre', display: 'flex', gap: 2 }}>
      <Select value={selectedMethod} onChange={handleChangeMethod}>
        {HTTP_METHODS.map((m) => (
          <MenuItem key={m} value={m}>
            {m}
          </MenuItem>
        ))}
      </Select>

      <Input sx={{ width: 800 }} value={url} onChange={handleChangeUrl} autoFocus />
    </Box>
  );
}
