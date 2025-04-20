export const decodeURIComponentToString = (uri: string) => {
  const base64 = decodeURIComponent(uri)
    .replace(/-/g, '+')
    .replace(/_/g, '/')
    .padEnd(Math.ceil(uri.length / 4) * 4, '=');
  return Buffer.from(base64, 'base64').toString('utf-8');
};

export const encodeStringToBase64 = (str: string) => {
  return Buffer.from(str, 'utf-8').toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
};

export const isValidJson = (str: string): boolean => {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
};

export const serializeHeadersQueryString = (headers: Array<{ name: string; value: string }>) => {
  const validHeaders = headers
    .filter((row) => row.name && row.value)
    .reduce(
      (acc, { name, value }) => {
        acc[name] = value;
        return acc;
      },
      {} as Record<string, string>
    );

  if (Object.keys(validHeaders).length === 0) {
    return '';
  }

  const params = new URLSearchParams();
  Object.entries(validHeaders).forEach(([name, value]) => {
    params.append(name, value);
  });
  return `?${params.toString()}`;
};

interface GenerateRestClientPageUrlParams {
  baseUrl: string;
  method: string;
  url: string;
  body: string;
  headers: Array<{ name: string; value: string }>;
}

export const generateRestClientPageUrl = ({ baseUrl, method, url, body, headers }: GenerateRestClientPageUrlParams) => {
  let updatedUrl = `${baseUrl}/${method}`;
  if (url) {
    updatedUrl += `/${encodeStringToBase64(url)}`;
  }
  if (body.trim()) {
    updatedUrl += `/${encodeStringToBase64(body)}`;
  }
  const headersQueryString = serializeHeadersQueryString(headers);
  if (headersQueryString) {
    updatedUrl += headersQueryString;
  }
  return updatedUrl;
};

export const isHttpCodeSuccess = (code: number) => {
  return code < 400;
};
