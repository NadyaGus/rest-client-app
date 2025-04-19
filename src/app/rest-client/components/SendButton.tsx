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
    const request: RequestInit = {
      method,
    };

    if (body) {
      request.body = body;
    }

    if (headers) {
      request.headers = headers.reduce(
        (acc, header) => {
          if (!header.name || !header.value) {
            return acc;
          }
          acc[header.name] = header.value;
          return acc;
        },
        {} as Record<string, string>
      );
    }

    console.log(request);

    const data = await fetch(url, request);
    if (!data.ok) {
      console.error('Request failed with status:', data.status);
    }
    console.log(data);
    setStatus(data.status);
    setResponseBody(await data.text());
  };

  return (
    <Button type="submit" variant="contained" color="primary" onClick={handleClick}>
      Submit
    </Button>
  );
};
