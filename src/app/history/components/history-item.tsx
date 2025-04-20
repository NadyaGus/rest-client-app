import { ROUTES } from '@/constants';
import { generateRestClientPageUrl, isHttpCodeSuccess } from '@/utils/helpers';
import { Box, Typography, Link, Paper } from '@mui/material';

interface HistoryItemProps {
  id: number;
  title: string;
  url: string;
  method: string;
  status: number;
  headers?: Array<{ name: string; value: string }>;
}

export const HistoryItem = ({ id, title, url, method, status, headers }: HistoryItemProps) => {
  return (
    <Paper key={id} elevation={1} sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography
          variant="caption"
          sx={{
            bgcolor: isHttpCodeSuccess(status) ? 'success.main' : 'error.main',
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
