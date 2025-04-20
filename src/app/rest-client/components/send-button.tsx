'use client';

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

      const requestBody = JSON.stringify({
        url,
        method,
        body,
        headers: headers?.reduce(
          (acc, header) => {
            if (!header.name || !header.value) {
              return acc;
            }
            acc[header.name.trim()] = header.value.trim();
            return acc;
          },
          {} as Record<string, string>
        ),
      });

      const response = await fetch('/api/proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBody,
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || 'Request failed');
      }

      setStatus(responseData.status);
      setResponseBody(responseData.body);
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
