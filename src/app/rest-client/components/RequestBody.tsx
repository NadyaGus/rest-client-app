import { TextField } from '@mui/material';

interface RequestBodyProps {
  body: string;
  onBodyChange: (newBody: string) => void;
}

export function RequestBody({ body, onBodyChange }: RequestBodyProps) {
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
      placeholder="Request body (Text/JSON)"
      sx={{ fontFamily: 'monospace' }}
    />
  );
}
