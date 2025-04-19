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
