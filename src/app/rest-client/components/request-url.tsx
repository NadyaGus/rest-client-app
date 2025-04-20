import { Input } from '@mui/material';
import { useTranslations } from 'next-intl';

interface RequestUrlProps {
  url: string;
  onUrlChange: (url: string) => void;
}

export function RequestUrl({ url, onUrlChange }: RequestUrlProps) {
  const t = useTranslations('Client');
  const handleChangeUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    onUrlChange(event.target.value);
  };

  return <Input fullWidth value={url} onChange={handleChangeUrl} autoFocus placeholder={t('enterUrl')} />;
}
