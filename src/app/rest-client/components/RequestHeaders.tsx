import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton, Input } from '@mui/material';

interface Header {
  name: string;
  value: string;
}

interface RequestHeadersProps {
  headers: Header[];
  onHeaderChange: (index: number, field: 'name' | 'value', value: string) => void;
  onDeleteHeader: (index: number) => void;
}

export function RequestHeaders({ headers, onHeaderChange, onDeleteHeader }: RequestHeadersProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {headers.map((row, index) => (
        <Box key={index} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Input
            placeholder="Header name"
            value={row.name}
            onChange={(e) => onHeaderChange(index, 'name', e.target.value)}
            sx={{ width: 200 }}
          />
          <Input
            placeholder="Header value"
            value={row.value}
            onChange={(e) => onHeaderChange(index, 'value', e.target.value)}
            sx={{ flexGrow: 1 }}
          />
          <IconButton onClick={() => onDeleteHeader(index)} disabled={headers.length === 1 && !row.name && !row.value}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
    </Box>
  );
}
