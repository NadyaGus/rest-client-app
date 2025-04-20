interface RequestConfig {
  url: string;
  method: string;
  body?: string;
  headers?: Array<{ name: string; value: string }>;
}

interface RequestResponse {
  status: number;
  body: string;
}

export async function sendRequest(config: RequestConfig): Promise<RequestResponse> {
  const requestBody = JSON.stringify({
    url: config.url,
    method: config.method,
    body: config.body,
    headers: config.headers?.reduce(
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

  return {
    status: responseData.status,
    body: responseData.body,
  };
}
