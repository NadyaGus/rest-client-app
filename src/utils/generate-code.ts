interface GenerateCodeProps {
  language: string;
  variant: string;
  endpoint: string;
  method: string;
  headers?: Record<string, string>;
  body?: Record<string, string>;
  options?: Record<string, string>;
}

import codegen from 'postman-code-generators';
import sdk from 'postman-collection';

export const generateLanguageCode = ({
  language,
  variant,
  endpoint,
  method,
  headers = {},
  body,
  // options = {},
}: GenerateCodeProps) => {
  // console.log({ language, variant, endpoint, method, headers, body, options });
  // console.log(endpoint);
  const request = new sdk.Request({
    url: endpoint,
    method,
    header: Object.entries(headers).map(([key, value]) => ({
      key,
      value,
    })),
    ...(body &&
      method !== 'GET' && {
        body: {
          mode: 'raw',
          raw: JSON.stringify(body),
          options: {
            raw: {
              language: 'json',
            },
          },
        },
      }),
  });

  let result = '';
  codegen.convert(language, variant, request, {}, (error: Error | null, snippet: string) => {
    if (error) {
      console.error(error);
      return;
    }
    result = snippet;
  });
  return result;
};
