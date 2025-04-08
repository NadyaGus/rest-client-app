export const decodeURIComponentToString = (uri: string) => {
  return Buffer.from(decodeURIComponent(uri), 'base64url').toString('utf-8');
};

export const encodeStringToBase64 = (str: string) => {
  return Buffer.from(str, 'utf-8').toString('base64');
};
