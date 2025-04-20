import { generateLanguageCode } from '@/utils/generate-code';
import { Box, Button, MenuItem, Select, TextField } from '@mui/material';
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

export const GenerateCodeSection = ({ endpoint, method, body }: { endpoint: string; method: string; body: string }) => {
  const [language, setLanguage] = useState(languages[0].name);
  const [variant, setVariant] = useState(languages[0].variant[0]);
  const [result, setResult] = useState('');

  useEffect(() => {
    setVariant(languages.find((l) => l.name === language)?.variant[0] ?? languages[0].variant[0]);
  }, [language]);

  const handleClick = async () => {
    const request = {
      language,
      variant,
      endpoint,
      method,
      body: body.trim() ? JSON.parse(body) : undefined,
    };
    const data = await generateLanguageCode(request);
    setResult(data);
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

        <Select value={variant} onChange={(e) => setVariant(e.target.value)} size="small" sx={{ minWidth: 200 }}>
          {languages
            .find((l) => l.name === language)
            ?.variant.map((v) => (
              <MenuItem key={v} value={v}>
                {v}
              </MenuItem>
            ))}
        </Select>

        <Button variant="outlined" onClick={handleClick}>
          Generate Code
        </Button>
      </Box>

      {result && <TextField multiline sx={{ fontFamily: 'monospace' }} value={result} fullWidth />}
    </Box>
  );
};
