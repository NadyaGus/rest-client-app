import type { ProxyResponse } from './responses';

import { handleFetchError } from './error-handling';

export async function forwardRequest(
  url: string,
  method: string,
  headers?: HeadersInit,
  body?: string | Record<string, unknown>
): Promise<ProxyResponse> {
  const requestInit: RequestInit = {
    method,
    headers: {
      ...headers,
    },
  };

  if (method !== 'GET' && method !== 'HEAD' && body) {
    requestInit.body = typeof body === 'string' ? body : JSON.stringify(body);
  }

  try {
    const response = await fetch(url, requestInit);
    const responseText = await response.text();

    return {
      status: response.status,
      body: responseText,
      error: !response.ok ? responseText : undefined,
    };
  } catch (fetchError: unknown) {
    const meaningfulErrorMessage = handleFetchError(fetchError, url);

    return {
      status: 0,
      body: '',
      error: meaningfulErrorMessage,
    };
  }
}
