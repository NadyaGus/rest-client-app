import { Box } from '@mui/material';
import fs from 'fs';

export default function RestClient() {
  const files = fs.readdirSync(process.cwd());

  return <Box sx={{ fontFamily: 'monospace', whiteSpace: 'pre' }}>{files.map((file) => `${file}\n`)}</Box>;
}
