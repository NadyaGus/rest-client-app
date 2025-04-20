interface ErrorPattern {
  pattern: string;
  message: (url: string) => string;
}

export const ERROR_PATTERNS: ErrorPattern[] = [
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

export const handleFetchError = (fetchError: unknown, url: string): string => {
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
