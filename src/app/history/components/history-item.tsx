import { ROUTES } from '@/constants';
import { generateRestClientPageUrl } from '@/utils/helpers';
import { Box, Typography, Link, Paper } from '@mui/material';

interface HistoryItemProps {
  id: number;
  title: string;
  url: string;
  method: string;
  headers?: Array<{ name: string; value: string }>;
}

export const HistoryItem = ({ id, title, url, method, headers }: HistoryItemProps) => {
  return (
    <Paper key={id} elevation={1} sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography
          variant="caption"
          sx={{
            bgcolor: 'success.main',
            color: 'white',
            px: 1,
            py: 0.5,
            borderRadius: 1,
            fontWeight: 'bold',
          }}
        >
          {method}
        </Typography>
        <Link
          href={generateRestClientPageUrl({
            baseUrl: ROUTES.restClient.href,
            method,
            url,
            body: '',
            headers: headers || [],
          })}
          sx={{
            color: 'primary.main',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          {title}
        </Link>
      </Box>
    </Paper>
  );
};
