import { TextField } from '@mui/material';
import { useTranslations } from 'next-intl';

interface RequestBodyProps {
  body: string;
  onBodyChange: (newBody: string) => void;
}

export function RequestBody({ body, onBodyChange }: RequestBodyProps) {
  const t = useTranslations('Client');
  const handleChangeBody = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onBodyChange(event.target.value);
  };

  const handleBodyBlur = () => {
    if (!body.trim()) {
      return;
    }
    try {
      const parsed = JSON.parse(body);
      onBodyChange(JSON.stringify(parsed, null, 2));
    } catch {
      // It's not valid JSON or Text, leave as is
    }
  };

  return (
    <TextField
      multiline
      rows={4}
      value={body}
      onChange={handleChangeBody}
      onBlur={handleBodyBlur}
      placeholder={t('requestBody')}
      sx={{ fontFamily: 'monospace' }}
    />
  );
}
