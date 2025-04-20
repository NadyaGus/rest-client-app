'use client';

import { GenerateCodeSection } from '@/components/generate-code-section';
import { HTTP_METHODS, ROUTES } from '@/constants';
import { generateRestClientPageUrl } from '@/utils/helpers';
import ErrorOutline from '@mui/icons-material/ErrorOutline';
import { Alert, AlertTitle, Box } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { RequestBody } from '../components/request-body';
import { RequestHeaders } from '../components/request-headers';
import { RequestMethod } from '../components/request-method';
import { RequestUrl } from '../components/request-url';
import { ResponseSection } from '../components/response-section';
import { SendButton } from '../components/send-button';

export function RestClient({
  initValues,
}: {
  initValues: { method: string; url: string; body: string; headers: Array<{ name: string; value: string }> };
}) {
  const t = useTranslations('Client');
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState(initValues.method || HTTP_METHODS[0]);
  const [url, setUrl] = useState(initValues.url || '');
  const [body, setBody] = useState(initValues.body || '');
  const [headers, setHeaders] = useState<Array<{ name: string; value: string }>>(
    initValues.headers || [{ name: '', value: '' }]
  );
  const [status, setStatus] = useState(0);
  const [responseBody, setResponseBody] = useState('');
  const [responseError, setResponseError] = useState<string | undefined>(undefined);

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
    <Box
      sx={{
        fontFamily: 'monospace',
        whiteSpace: 'pre',
        display: 'flex',
        gap: 2,
        flexDirection: 'column',
        width: '100%',
        maxWidth: '1000px',
      }}
    >
      <Box sx={{ display: 'flex', gap: 2 }}>
        <RequestMethod method={selectedMethod} onMethodChange={setSelectedMethod} />
        <RequestUrl url={url} onUrlChange={setUrl} />
        <SendButton
          url={url}
          method={selectedMethod}
          body={body}
          headers={headers}
          setStatus={setStatus}
          setResponseBody={setResponseBody}
          setResponseError={setResponseError}
          setUrl={setUrl}
          setBody={setBody}
          setHeaders={setHeaders}
        />
      </Box>
      <RequestHeaders headers={headers} onHeadersChange={setHeaders} />
      <RequestBody body={body} onBodyChange={setBody} />
      {status !== 0 && <ResponseSection status={status} body={responseBody} />}
      {responseError && (
        <Alert variant="filled" icon={<ErrorOutline />} severity="error">
          <AlertTitle>{t('Could not send request')}</AlertTitle>
          {responseError}
        </Alert>
      )}
      <GenerateCodeSection method={selectedMethod} endpoint={url} body={body} headers={headers} />
    </Box>
  );
}
