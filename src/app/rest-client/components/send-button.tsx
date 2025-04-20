import { isValidJson } from '@/utils/helpers';
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

      const request: RequestInit = {
        method,
      };

      const isBodySupported = method !== 'GET' && method !== 'HEAD';
      if (body && isBodySupported) {
        request.body = body;

        const contentType = isValidJson(body) ? 'application/json' : 'text/plain';
        const isCustomContentTypeSet = headers?.some((h) => h.name.toLowerCase() === 'content-type');
        if (!isCustomContentTypeSet) {
          request.headers = {
            ...request.headers,
            'Content-Type': contentType,
          };
        }
      }

      if (headers) {
        request.headers = {
          ...request.headers,
          ...headers.reduce(
            (acc, header) => {
              if (!header.name || !header.value) {
                return acc;
              }
              acc[header.name.trim()] = header.value.trim();
              return acc;
            },
            {} as Record<string, string>
          ),
        };
      }

      const response = await fetch(url, request);
      const responseText = await response.text();

      try {
        const jsonResponse = JSON.parse(responseText);
        setResponseBody(JSON.stringify(jsonResponse, null, 2));
      } catch {
        setResponseBody(responseText);
      }

      setStatus(response.status);
    } catch (error) {
      console.error('Request failed:', error);
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
