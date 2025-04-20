import { generateLanguageCode } from '@/utils/generate-code';
import { Alert, Box, Button, MenuItem, Select, TextField } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

const languages = [
  { name: 'curl', variant: ['cURL'] },
  { name: 'Java', variant: ['Unirest', 'OkHttp'] },
  { name: 'JavaScript', variant: ['Fetch', 'XHR'] },
  { name: 'NodeJs', variant: ['Native', 'Request', 'Unirest'] },
  { name: 'Python', variant: ['http.client', 'Requests'] },
  { name: 'csharp', variant: ['HttpClient', 'RestSharp'] },
  { name: 'Go', variant: ['Native'] },
];

export const GenerateCodeSection = ({
  endpoint,
  method,
  body,
  headers,
}: {
  endpoint: string;
  method: string;
  body: string;
  headers: { name: string; value: string }[];
}) => {
  const t = useTranslations('Client');
  const [language, setLanguage] = useState(languages[0].name);
  const [variant, setVariant] = useState('---');
  const [variants, setVariants] = useState(languages[0].variant);
  const [result, setResult] = useState('');
  const [isError, setIsError] = useState<false | string>(false);

  useEffect(() => {
    setVariant('---');
    setResult('');
    setVariants(languages.find((l) => l.name === language)?.variant || []);
  }, [language]);

  const handleClick = () => {
    const headersObj = headers.reduce((acc, header) => {
      if (!header.name || !header.value) {
        return acc;
      }
      return { ...acc, [header.name]: header.value };
    }, {});

    const request = {
      language,
      variant,
      endpoint,
      method,
      headers: headersObj,
      body,
    };

    try {
      const data = generateLanguageCode(request);
      setResult(data);
      setIsError(false);
    } catch (error) {
      setIsError(error instanceof Error ? error.message : t('Failed to generate code'));
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Select value={language} onChange={(e) => setLanguage(e.target.value)} size="small" sx={{ minWidth: 200 }}>
          {languages.map((l) => (
            <MenuItem key={l.name} value={l.name}>
              {l.name === 'csharp' ? 'C#' : l.name}
            </MenuItem>
          ))}
        </Select>

        <Select
          value={variant}
          defaultValue=""
          onChange={(e) => {
            setVariant(e.target.value);
          }}
          size="small"
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="---">---</MenuItem>
          {variants.map((v) => (
            <MenuItem key={v} value={v}>
              {v}
            </MenuItem>
          ))}
        </Select>

        <Button variant="outlined" onClick={handleClick} disabled={variant === '---'}>
          {t('generateCode')}
        </Button>
      </Box>

      {isError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {isError}
        </Alert>
      )}

      {result && <TextField multiline sx={{ fontFamily: 'monospace' }} value={result} fullWidth />}
    </Box>
  );
};
