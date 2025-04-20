'use client';

import { sendRequest } from '@/utils/request-helper';
import { Button } from '@mui/material';

export const SendButton = ({
  url,
  method,
  body,
  headers,
  setStatus,
  setResponseBody,
}: {
  url: string;
  method: string;
  body?: string;
  headers?: Array<{ name: string; value: string }>;
  setStatus: (status: number) => void;
  setResponseBody: (body: string) => void;
}) => {
  const handleClick = async () => {
    try {
      if (!url.trim()) {
        throw new Error('URL is required');
      }

      // TODO: replace variables in url, headers, body

      const { status, body: responseBody } = await sendRequest({
        url,
        method,
        body,
        headers,
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
