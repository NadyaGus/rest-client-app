'use client';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from 'react';

export function ToggleLanguage() {
  const [language, setLanguage] = useState('en');

  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    if (newAlignment !== null) {
      setLanguage(newAlignment);
      // TODO: add changing language
    }
  };

  return (
    <ToggleButtonGroup
      size="small"
      color="primary"
      value={language}
      exclusive
      onChange={handleChange}
      aria-label="Language"
    >
      <ToggleButton value="en">EN</ToggleButton>
      <ToggleButton value="ru">RU</ToggleButton>
    </ToggleButtonGroup>
  );
}
