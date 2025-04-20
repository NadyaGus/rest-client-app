export interface ProxyRequest {
  url: string;
  method: string;
  headers?: HeadersInit;
  body?: string | Record<string, unknown>;
}

export function validateProxyRequest(request: ProxyRequest): string | null {
  if (!request.url) {
    return 'URL is required';
  }

  try {
    new URL(request.url);
  } catch {
    return `Invalid URL format: "${request.url}". Please make sure the URL is correct and includes the protocol (e.g., http:// or https://).`;
  }

  return null;
}
