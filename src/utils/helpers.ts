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
