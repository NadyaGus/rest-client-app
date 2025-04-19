import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton, Input } from '@mui/material';

interface Header {
  name: string;
  value: string;
}

interface RequestHeadersProps {
  headers: Header[];
  onHeadersChange: (headers: Header[]) => void;
}

export function RequestHeaders({ headers, onHeadersChange }: RequestHeadersProps) {
  const handleHeaderChange = (index: number, field: 'name' | 'value', value: string) => {
    const newRows = [...headers];
    newRows[index][field] = value;

    const lastRow = newRows[newRows.length - 1];
    const needNewRow = lastRow.name && lastRow.value;
    if (needNewRow) {
      newRows.push({ name: '', value: '' });
    }

    onHeadersChange(newRows);
  };

  const handleDeleteHeader = (index: number) => {
    const newRows = headers.filter((_, i) => i !== index);
    if (newRows.length === 0) {
      newRows.push({ name: '', value: '' });
    }
    onHeadersChange(newRows);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {headers.map((row, index) => (
        <Box key={index} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Input
            placeholder="Header name"
            value={row.name}
            onChange={(e) => handleHeaderChange(index, 'name', e.target.value)}
            sx={{ width: 200 }}
          />
          <Input
            placeholder="Header value"
            value={row.value}
            onChange={(e) => handleHeaderChange(index, 'value', e.target.value)}
            sx={{ flexGrow: 1 }}
          />
          <IconButton
            onClick={() => handleDeleteHeader(index)}
            disabled={headers.length === 1 && !row.name && !row.value}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
    </Box>
  );
}
