'use client';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from 'react';

export function ToggleLanguage() {
  const [alignment, setAlignment] = useState('english');

  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      // TODO: add changing language
    }
  };

  return (
    <ToggleButtonGroup
      size="small"
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Language"
    >
      <ToggleButton value="english">EN</ToggleButton>
      <ToggleButton value="russian">RU</ToggleButton>
    </ToggleButtonGroup>
  );
}
