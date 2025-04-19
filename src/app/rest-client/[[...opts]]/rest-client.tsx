'use client';

import { HTTP_METHODS, ROUTES } from '@/constants';
import { encodeStringToBase64, serializeHeadersQueryString } from '@/utils/helpers';
import { Box, Input, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { RequestBody } from '../components/RequestBody';
import { RequestHeaders } from '../components/RequestHeaders';

export function RestClient({
  initValues,
}: {
  initValues: { method: string; url: string; body: string; headers: Array<{ name: string; value: string }> };
}) {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState(initValues.method || HTTP_METHODS[0]);
  const [url, setUrl] = useState(initValues.url || '');
  const [body, setBody] = useState(initValues.body || '');
  const [headers, setHeaders] = useState<Array<{ name: string; value: string }>>(
    initValues.headers || [{ name: '', value: '' }]
  );

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
    if (body.trim()) {
      updatedUrl += `/${encodeStringToBase64(body)}`;
    }
    const headersQueryString = serializeHeadersQueryString(headers);
    if (headersQueryString) {
      updatedUrl += headersQueryString;
    }
    window.history.replaceState({}, '', updatedUrl);
  }, [router, selectedMethod, url, body, headers]);

  return (
    <Box sx={{ fontFamily: 'monospace', whiteSpace: 'pre', display: 'flex', gap: 2, flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Select value={selectedMethod} onChange={handleChangeMethod}>
          {HTTP_METHODS.map((m) => (
            <MenuItem key={m} value={m}>
              {m}
            </MenuItem>
          ))}
        </Select>

        <Input sx={{ width: 800 }} value={url} onChange={handleChangeUrl} autoFocus placeholder="Enter URL" />
      </Box>

      <RequestHeaders headers={headers} onHeadersChange={setHeaders} />

      <RequestBody body={body} onBodyChange={setBody} />
    </Box>
  );
}
