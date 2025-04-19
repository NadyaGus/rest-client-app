import { Input } from '@mui/material';

interface RequestUrlProps {
  url: string;
  onUrlChange: (url: string) => void;
}

export function RequestUrl({ url, onUrlChange }: RequestUrlProps) {
  const handleChangeUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    onUrlChange(event.target.value);
  };

  return <Input sx={{ width: 800 }} value={url} onChange={handleChangeUrl} autoFocus placeholder="Enter URL" />;
}
