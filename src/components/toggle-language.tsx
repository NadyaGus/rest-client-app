import { Locale } from '@/i18n/config';
import { setUserLocale } from '@/i18n/locale';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useLocale } from 'next-intl';

export function ToggleLanguage() {
  const locale = useLocale();

  const handleChange = (_event: React.MouseEvent<HTMLElement>, value: Locale) => {
    setUserLocale(value);
  };

  return (
    <ToggleButtonGroup
      size="small"
      color="primary"
      value={locale}
      exclusive
      onChange={handleChange}
      aria-label="Language"
    >
      <ToggleButton value="en">EN</ToggleButton>
      <ToggleButton value="ru">RU</ToggleButton>
    </ToggleButtonGroup>
  );
}
