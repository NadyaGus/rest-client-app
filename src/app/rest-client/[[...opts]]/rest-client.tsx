'use client';

import { HTTP_METHODS, ROUTES } from '@/constants';
import { generateRestClientPageUrl } from '@/utils/helpers';
import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { RequestBody } from '../components/RequestBody';
import { RequestHeaders } from '../components/RequestHeaders';
import { RequestMethod } from '../components/RequestMethod';
import { RequestUrl } from '../components/RequestUrl';

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

  useEffect(() => {
    const updatedUrl = generateRestClientPageUrl({
      baseUrl: ROUTES.restClient.href,
      method: selectedMethod,
      url,
      body,
      headers,
    });
    window.history.replaceState({}, '', updatedUrl);
  }, [router, selectedMethod, url, body, headers]);

  return (
    <Box sx={{ fontFamily: 'monospace', whiteSpace: 'pre', display: 'flex', gap: 2, flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <RequestMethod method={selectedMethod} onMethodChange={setSelectedMethod} />
        <RequestUrl url={url} onUrlChange={setUrl} />
      </Box>
      <RequestHeaders headers={headers} onHeadersChange={setHeaders} />
      <RequestBody body={body} onBodyChange={setBody} />
    </Box>
  );
}
