import codegen from 'postman-code-generators';
import sdk from 'postman-collection';

interface GenerateCodeProps {
  language: string;
  variant: string;
  endpoint: string;
  method: string;
  headers?: Record<string, string>;
  body?: string;
}

export const generateLanguageCode = ({
  language,
  variant,
  endpoint,
  method,
  headers = {},
  body,
}: GenerateCodeProps) => {
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
          raw: body
            .split('\n')
            .map((line) => line.trim())
            .join('')
            .replace(',}', '}'),
          options: {
            raw: {
              language: 'json',
            },
          },
        },
      }),
  });

  let result = '';

  codegen.convert(language, variant, request, headers, (error: Error | null, snippet: string) => {
    if (error) {
      return;
    }
    result = snippet;
  });
  return result;
};
