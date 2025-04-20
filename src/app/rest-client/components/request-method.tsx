import { HTTP_METHODS } from '@/constants';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface RequestMethodProps {
  method: string;
  onMethodChange: (method: string) => void;
}

export function RequestMethod({ method, onMethodChange }: RequestMethodProps) {
  const handleChangeMethod = (event: SelectChangeEvent) => {
    onMethodChange(event.target.value);
  };

  return (
    <Select value={method} onChange={handleChangeMethod}>
      {HTTP_METHODS.map((m) => (
        <MenuItem key={m} value={m}>
          {m}
        </MenuItem>
      ))}
    </Select>
  );
}
