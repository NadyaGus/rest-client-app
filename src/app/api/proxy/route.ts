import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { url, method, body, headers } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }
    try {
      new URL(url);
    } catch {
      return NextResponse.json({
        status: 0,
        body: '',
        error: `Invalid URL format: "${url}". Please make sure the URL is correct and includes the protocol (e.g., http:// or https://).`,
      });
    }

    const requestInit: RequestInit = {
      method,
      headers: {
        ...headers,
      },
    };

    if (method !== 'GET' && method !== 'HEAD' && body) {
      requestInit.body = body;
    }

    try {
      const response = await fetch(url, requestInit);
      const responseText = await response.text();

      return NextResponse.json({
        status: response.status,
        body: responseText,
        error: !response.ok ? responseText : undefined,
      });
    } catch (fetchError: unknown) {
      const meaningfulErrorMessage = handleFetchError(fetchError, url);
      return NextResponse.json({
        status: 0,
        body: '',
        error: meaningfulErrorMessage,
      });
    }
  } catch (error) {
    return NextResponse.json({
      status: 0,
      body: '',
      error:
        error instanceof Error
          ? `Invalid request format: ${error.message}`
          : 'Invalid request format. Please check your request data.',
    });
  }
}

interface ErrorPattern {
  pattern: string;
  message: (url: string) => string;
}

const ERROR_PATTERNS: ErrorPattern[] = [
  {
    pattern: 'unknown scheme',
    message: () => 'Invalid URL protocol.',
  },
  {
    pattern: 'other side closed|nodename nor servname provided',
    message: (url) => `Could not connect to "${url}". The domain does not exist or is not accessible.`,
  },
  {
    pattern: 'connection refused',
    message: (url) => `Could not connect to "${url}". The server is not responding or may be down.`,
  },
  {
    pattern: 'certificate',
    message: (url) =>
      `Security certificate error for "${url}". The site's SSL/TLS certificate is invalid or not trusted.`,
  },
  {
    pattern: 'timeout',
    message: (url) => `The request to "${url}" timed out. The server took too long to respond.`,
  },
];

const handleFetchError = (fetchError: unknown, url: string): string => {
  const defaultError = `Could not connect to "${url}". Please check if the URL is correct and the server is accessible.`;

  if (!(fetchError instanceof TypeError) || !('cause' in fetchError)) {
    return defaultError;
  }

  const cause = String(fetchError.cause || '').toLowerCase();
  if (!cause) {
    return defaultError;
  }

  const matchedPattern = ERROR_PATTERNS.find(({ pattern }) => new RegExp(pattern).test(cause));

  return matchedPattern ? matchedPattern.message(url) : defaultError;
};
