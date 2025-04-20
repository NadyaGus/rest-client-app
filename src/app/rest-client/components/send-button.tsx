'use client';

import { useVariables } from '@/hooks/useVariables';
import { sendRequest } from '@/utils/request-helper';
import { Button } from '@mui/material';

export const SendButton = ({
  url,
  method,
  body,
  headers,
  setStatus,
  setResponseBody,
  setUrl,
  setBody,
  setHeaders,
}: {
  url: string;
  method: string;
  body: string;
  headers: Array<{ name: string; value: string }>;
  setStatus: (status: number) => void;
  setResponseBody: (body: string) => void;
  setUrl: (url: string) => void;
  setBody: (body: string) => void;
  setHeaders: (headers: Array<{ name: string; value: string }>) => void;
}) => {
  const { replaceVariables } = useVariables();

  const handleClick = async () => {
    try {
      if (!url.trim()) {
        throw new Error('URL is required');
      }

      const urlWithVariables = replaceVariables(url);
      const headersWithVariables = headers?.map((header) => ({
        name: replaceVariables(header.name),
        value: replaceVariables(header.value),
      }));
      const bodyWithVariables = replaceVariables(body);

      setHeaders(headersWithVariables);
      setUrl(urlWithVariables);
      setBody(bodyWithVariables);

      const { status, body: responseBody } = await sendRequest({
        url: urlWithVariables,
        method,
        body: bodyWithVariables,
        headers: headersWithVariables,
      });

      // TODO: save request to history

      setStatus(status);
      setResponseBody(responseBody);
    } catch (error) {
      setStatus(0);
      setResponseBody(error instanceof Error ? error.message : 'Request failed');
    }
  };

  return (
    <Button type="submit" variant="contained" color="primary" onClick={handleClick}>
      Send
    </Button>
  );
};
